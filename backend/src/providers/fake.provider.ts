import { AIVideoProvider } from "@/interfaces";
import {
  AIVideoGenerationResultResponseType,
  AIVideoType,
} from "@/models/ai.model";
import { handleError } from "@/utils/handleError";
import fs from "fs";

export class FakeProvider implements AIVideoProvider {
  async generateTextToVideo(
    data: AIVideoType
  ): Promise<AIVideoGenerationResultResponseType> {
    try {
      const mockVideo = "./src/mock/generated.mp4";
      const outputsFolder = "./src/outputs";

      if (!fs.existsSync(outputsFolder)) {
        fs.mkdirSync(outputsFolder, { recursive: true });
      }

      const fileName = `gen-${Date.now()}.mp4`;
      const outputPath = `${outputsFolder}/${fileName}`;

      await new Promise((resolve) => setTimeout(resolve, 10000)); // 10 seconds

      fs.copyFileSync(mockVideo, outputPath);

      return { videoURL: outputPath };
    } catch (error) {
      handleError("FakeProvider/generateTextToVideo/catch: " + String(error));
      return { videoURL: null };
    }
  }
}
