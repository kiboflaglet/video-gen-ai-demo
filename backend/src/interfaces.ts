import { providers } from "./config/worker";
import { AIVideoGenerationResultResponseType, AIVideoType } from "./models/ai.model";

export interface AIProvider {

}

export interface AIVideoProvider extends AIProvider {
  generateTextToVideo(data: AIVideoType): Promise<AIVideoGenerationResultResponseType>
}

export interface JobDataInterface {
  prompt: string;
  provider: keyof typeof providers;
  requestId: string
}

export interface IUser {
  id: string;
  fullName: string;
}

export interface IUserAIRequests {
  id: string;
  prompt: string;
}