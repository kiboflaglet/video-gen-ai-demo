import { VideoProvider } from "@/interfaces";
import fs from "fs";

export class FakeProvider implements VideoProvider {
  async generateVideo(
    prompt: string
  ): Promise<{ url?: string; success: boolean }> {
    const mockVideo = "./src/mock/generated.mp4";
    const outputsFolder = "./src/outputs";

    if (!fs.existsSync(outputsFolder)) {
      fs.mkdirSync(outputsFolder, { recursive: true });
    }

    const fileName = `gen-${Date.now()}.mp4`;
    const outputPath = `${outputsFolder}/${fileName}`;

    fs.copyFileSync(mockVideo, outputPath);

    return { url: `./src/outputs/${fileName}`, success: false };
  }
}
