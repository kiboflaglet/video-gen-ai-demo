import {
  AIVideoGetRequestType,
  AIVideoGetResponseType,
  AIVideoType,
  CreateAIVideoRequestType,
} from "@/models/ai.model";
import { UserBaseType } from "@/models/user.model";
import { v4 as uuidv4 } from "uuid";

const users: UserBaseType[] = [{ id: "1", fullName: "Khalaf Nasirov" }];

const user_ai_video_requests: AIVideoType[] = [
  {
    id: "1",
    prompt: "testing prompt",
    status: "queued",
    userId: "1",
    duration: 5,
    provider: "pika",
    videoURL: null,
  },
  {
    id: "2",
    prompt: "testing prompt",
    status: "queued",
    userId: "1",
    duration: 5,
    provider: "pika",
    videoURL:
      "https://www.youtube.com/watch?v=s1ymcdl_oO8&list=RDs1ymcdl_oO8&start_radio=1",
  },
];

export class AIRepo {
  async getAIVideoRequest(
    data: AIVideoGetRequestType
  ): Promise<AIVideoGetResponseType> {
    const result = user_ai_video_requests.find((item) => item.id === data.id);

    if (!result) {
      throw new Error("Video request not found");
    }

    return result;
  }
  async createAIVideoRequest(
    data: CreateAIVideoRequestType
  ): Promise<AIVideoGetResponseType> {
    const newVideoRequestIndex = user_ai_video_requests.push({
      id: uuidv4(),
      prompt: data.prompt,
      status: "queued",
      userId: data.userId,
      duration: data.duration,
      provider: data.provider,
      videoURL: null,
    });

    const result = user_ai_video_requests[newVideoRequestIndex - 1];

    return result;
  }

  async updateAIVideoRequest(
    id: string,
    data: Partial<AIVideoType>
  ): Promise<AIVideoGetResponseType> {
    const index = user_ai_video_requests.findIndex((item) => item.id === id);

    if (index === -1) {
      throw new Error("Video request not found");
    }

    user_ai_video_requests[index] = {
      ...user_ai_video_requests[index],
      ...data,
    };

    return user_ai_video_requests[index];
  }
}
