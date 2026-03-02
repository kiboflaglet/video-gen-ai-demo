import { VideoProvider } from "@/interfaces";
import { env } from "@/utils/env";
import { fal } from "@fal-ai/client";
import fs from "fs";
import { writeFile } from "fs/promises";

fal.config({ credentials: env.FAL_API_KEY });

export class PikaProvider implements VideoProvider {
  async generateVideo(
    prompt: string
  ): Promise<{ url?: string; success: boolean }> {
    try {
      const result = await fal.subscribe("fal-ai/pika/v2.2/text-to-video", {
        input: {
          prompt,
          duration: "5",
        },
      });

      const video = result?.data?.video;
      
      if (!video) {
        console.error("No video data returned");
        return { success: false };
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

      return { url: outputPath, success: true };
    } catch (error) {
      console.log(error);
      return { success: false };
    }
  }
}
