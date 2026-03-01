import {
  VideoGenerateType,
  VideoGetJobStatusType,
  VideoStatusType,
  VideoType,
} from "@/models/ai.model";
import { serviceResponse } from "@/utils/serviceResponse";
import { Queue } from "bullmq";

export const videoQueue = new Queue("video-generation", {
  connection: {
    host: "localhost",
    port: 6379,
  },
});

class AIService {
  async videoGenerate(
    data: VideoGenerateType
  ): Promise<serviceResponse<VideoType | null>> {
    try {
      const job = await videoQueue.add("generating", {
        prompt: data.prompt,
      });

      return serviceResponse.success("video generated", {
        prompt: data.prompt,
        jobId: job.id,
        status: "queued",
      } as VideoType);
    } catch (error) {
      console.log(error);
      return serviceResponse.failure(
        "Error happened " + JSON.stringify(error),
        null
      );
    }
  }

  async getVideoJobStatus(
    data: VideoGetJobStatusType
  ): Promise<serviceResponse<any | null>> {
    try {
      const job = await videoQueue.getJob(data.jobId);

      if (!job) {
        return serviceResponse.failure("Job not found", null);
      }

      if (await job.isCompleted()) {
        return serviceResponse.success("Video generated", {
          jobId: job.id || data.jobId,
          status: "completed",
        });
      }

      if (await job.isFailed()) {
        return serviceResponse.failure("Video generating failed", {
          jobId: job.id || data.jobId,
          status: "failed",
        });
      }

      return serviceResponse.success("video processing", {
        jobId: job.id || data.jobId,
        status: "processing",
      });
    } catch (error) {
      console.log(error);
      return serviceResponse.failure(
        "Error happened " + JSON.stringify(error),
        null
      );
    }
  }
}

export const aiService = new AIService();
