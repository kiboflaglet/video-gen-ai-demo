import { AIVideoProvider } from "@/interfaces";
import {
  AIVideoGenerationResultResponseType,
  AIVideoType,
} from "@/models/ai.model";
import { env } from "@/utils/env";
import { handleError } from "@/utils/handleError";
import { fal } from "@fal-ai/client";
import fs from "fs";
import { writeFile } from "fs/promises";

fal.config({ credentials: env.FAL_API_KEY });

export class PikaProvider implements AIVideoProvider {
  async generateTextToVideo(
    data: AIVideoType
  ): Promise<AIVideoGenerationResultResponseType> {
    try {
      const duration = data.duration <= 5 ? "5" : "10";
      const result = await fal.subscribe("fal-ai/pika/v2.2/text-to-video", {
        input: {
          prompt: data.prompt,
          duration,
        },
      });

      const video = result?.data?.video;

      if (!video) {
        handleError("PikaProvider/generateTextToVideo/video: " + "No video data returned");
        return { videoURL: null };
      }

      const outputsFolder = "./src/outputs";
      if (!fs.existsSync(outputsFolder)) {
        fs.mkdirSync(outputsFolder, { recursive: true });
      }

      const response = await fetch(video.url);
      const buffer = await response.arrayBuffer();

      const fileName = `pika-${Date.now()}-${video.file_name}`;
      const outputPath = `${outputsFolder}/${fileName}`;

      await writeFile(outputPath, Buffer.from(buffer));

      return { videoURL: outputPath };
    } catch (error) {
      handleError("PikaProvider/generateTextToVideo/catch: " + String(error));
      return { videoURL: null };
    }
  }
}
