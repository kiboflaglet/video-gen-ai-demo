import { providers } from "./config/worker";

export interface VideoProvider {
  generateVideo(prompt: string): Promise<{ url?: string, success: boolean }>;
}

export interface JobDataInterface {
  prompt: string;
  provider: keyof typeof providers
}