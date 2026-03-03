import { AIVideoType } from "@/models/ai.model";
import { FakeProvider } from "@/providers/fake.provider";
import { PikaProvider } from "@/providers/pika.provider";
import { aiService } from "@/services/ai.service";
import { handleError } from "@/utils/handleError";
import { Worker } from "bullmq";
import { emitAIVideoUpdate, getIO } from "./socket";

process.on("unhandledRejection", (err) => {
  handleError("UNHANDLED REJECTION:" + err);
});

process.on("uncaughtException", (err) => {
  handleError("UNCAUGHT EXCEPTION:" + err);
});

export const providers = {
  test: new FakeProvider(),
  pika: new PikaProvider(),
};

new Worker(
  "video-generation",
  async ({ data }: { data: AIVideoType }) => {
    try {
      const provider = providers[data.provider];

      if (!provider) {
        await aiService.updateAIVideoStatus(data.id, {
          ...data,
          status: "failed",
        });
        emitAIVideoUpdate(getIO(), { ...data, status: "failed" });
        handleError(
          "Worker/video-generation/provider:" + "Provider has not found"
        );
      }

      await aiService.updateAIVideoStatus(data.id, {
        ...data,
        status: "processing",
      });
      emitAIVideoUpdate(getIO(), { ...data, status: "processing" });

      const { videoURL } = await provider.generateTextToVideo(data);
      await aiService.updateAIVideoStatus(data.id, {
        ...data,
        videoURL: videoURL ?? null,
        status: videoURL ? "completed" : "failed",
      });
      emitAIVideoUpdate(getIO(), {
        ...data,
        videoURL: videoURL ?? null,
        status: videoURL ? "completed" : "failed",
      });
    } catch (error) {
      handleError("Worker/video-generation/catch" + String(error));
      await aiService.updateAIVideoStatus(data.id, {
        ...data,
        status: "failed",
      });
      emitAIVideoUpdate(getIO(), { ...data, status: "failed" });
    }
  },
  { connection: { host: "localhost", port: 6379 } }
);
