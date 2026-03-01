import { Worker } from "bullmq";
import fs from "fs";

new Worker(
  "video-generation",
  async (job) => {
    console.log("Processing job:", job.id);

    // fake long processing
    await new Promise((r) => setTimeout(r, 100));

    const fileName = `gen-${job.id}.mp4`;


    // Copy the file
  fs.copyFileSync("./src/mock/generated.mp4", `./src/outputs/${fileName}`);
    return {
      videoUrl: `./src/outputs/${fileName}`,
    };
  },
  { connection: { host: "localhost", port: 6379 } }
);
