import { JobDataInterface } from "@/interfaces";
import { FakeProvider } from "@/providers/fake.provider";
import { PikaProvider } from "@/providers/pika.provider";
import { Worker } from "bullmq";

process.on("unhandledRejection", (err) => {
  console.error("UNHANDLED REJECTION:", err);
});

process.on("uncaughtException", (err) => {
  console.error("UNCAUGHT EXCEPTION:", err);
});

export const providers = {
  test: new FakeProvider(),
  pika: new PikaProvider(),
};

new Worker(
  "video-generation",
  async ({ data }: { data: JobDataInterface }) => {
    try {
      const provider = providers[data.provider];

      if (!provider) return { success: false };

      const result = await provider.generateVideo(data.prompt);
      return result;
    } catch (error) {
       console.error("Worker error:", error);
      return { success: false };
    }
  },
  { connection: { host: "localhost", port: 6379 } }
);
