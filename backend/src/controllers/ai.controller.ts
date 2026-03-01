import { VideoGenerateSchema, VideoGetJobStatusSchema } from "@/models/ai.model";
import { aiService } from "@/services/ai.service";
import { serviceResponse } from "@/utils/serviceResponse";
import { Request, RequestHandler, Response } from "express";

class AIController {
  public generateVideo: RequestHandler = async (
    req: Request,
    res: Response
  ) => {
    const validatedRequest = VideoGenerateSchema.safeParse(req.body);

    if (!validatedRequest.success) {
      const result = serviceResponse.failure(
        validatedRequest.error.message,
        null
      );
      return res.status(result.statusCode).send(result);
    }

    const response = await aiService.videoGenerate(validatedRequest.data);

    res.status(res.statusCode).send(response);
  };

  public getVideoJobStatus: RequestHandler = async (req: Request, res: Response) => {
    const validatedRequest = VideoGetJobStatusSchema.safeParse(req.params);

    if (!validatedRequest.success) {
      const result = serviceResponse.failure(
        validatedRequest.error.message,
        null
      );
      return res.status(result.statusCode).send(result);
    }

    const response = await aiService.getVideoJobStatus(validatedRequest.data);

    res.status(res.statusCode).send(response);
  };
}

export const aiController = new AIController();
