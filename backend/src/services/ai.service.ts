import {
  AIVideoGetRequestType,
  AIVideoGetResponseType,
  AIVideoType,
  CreateAIVideoRequestType,
} from "@/models/ai.model";
import { AIRepo } from "@/repos/ai.repo";
import { serviceResponse } from "@/utils/serviceResponse";
import { Queue } from "bullmq";
import { StatusCodes } from "http-status-codes";

export const videoQueue = new Queue("video-generation", {
  connection: {
    host: "localhost",
    port: 6379,
  },
});

class AIService {
  private aiRepo: AIRepo;

  constructor(aiRepo: AIRepo = new AIRepo()) {
    this.aiRepo = aiRepo;
  }
  async createAIVideo(
    data: CreateAIVideoRequestType
  ): Promise<serviceResponse<AIVideoGetResponseType | null>> {
    try {
      // create new request in database (prisma + postgresql)
      const newRequest = await this.aiRepo.createAIVideoRequest(data);

      const jobRequestData: AIVideoType = {
        ...newRequest,
      };

      await videoQueue.add("generating video", jobRequestData);

      const responseData: AIVideoGetResponseType = {
        ...newRequest,
      };

      return serviceResponse.success(
        "AI video generation started",
        responseData
      );
    } catch (error) {
      return serviceResponse.failure(
        "Internal error",
        null,
        String(error),
        StatusCodes.INTERNAL_SERVER_ERROR
      );
    }
  }

  async getAIVideoStatus(
    data: AIVideoGetRequestType
  ): Promise<serviceResponse<AIVideoGetResponseType | null>> {
    try {
      const existingVideoRequest = await this.aiRepo.getAIVideoRequest(data);

      if (!existingVideoRequest) {
        return serviceResponse.failure(
          "Video request has not found",
          null,
          "video request has not found in database"
        );
      }

      return serviceResponse.success("AI Video result", existingVideoRequest);
    } catch (error) {
      return serviceResponse.failure("Internal error", null, String(error));
    }
  }

  async updateAIVideoStatus(
    id: string,
    data: Partial<AIVideoType>
  ): Promise<serviceResponse<AIVideoGetResponseType | null>> {
    try {
      const existingVideoRequest = await this.aiRepo.updateAIVideoRequest(id, data);
      return serviceResponse.success("Video updated", existingVideoRequest);
    } catch (error) {
      return serviceResponse.failure("Internal error", null, String(error));
    }
  }
}

export const aiService = new AIService();
