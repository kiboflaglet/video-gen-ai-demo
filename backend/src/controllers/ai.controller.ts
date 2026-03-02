import {
  AIVideoGetRequestSchema,
  CreateAIVideoRequestSchema,
} from "@/models/ai.model";
import { aiService } from "@/services/ai.service";
import { serviceResponse } from "@/utils/serviceResponse";
import { Request, RequestHandler, Response } from "express";
import { StatusCodes } from "http-status-codes";

class AIController {
  public generateVideo: RequestHandler = async (
    req: Request,
    res: Response
  ) => {
    try {
      const validatedRequest = CreateAIVideoRequestSchema.safeParse(req.body);

      if (!validatedRequest.success) {
        return res
          .status(StatusCodes.BAD_REQUEST)
          .send(
            serviceResponse.failure(
              "Request failed",
              null,
              validatedRequest.error.message
            )
          );
      }

      const response = await aiService.createAIVideo(validatedRequest.data);

      res.status(response.statusCode).send(response);
    } catch (error) {
      return res
        .status(StatusCodes.INTERNAL_SERVER_ERROR)
        .send(serviceResponse.failure("Internal error", null, String(error)));
    }
  };

  public getVideo: RequestHandler = async (
    req: Request,
    res: Response
  ) => {
    try {
      const validatedRequest = AIVideoGetRequestSchema.safeParse(req.params);

      if (!validatedRequest.success) {
        return res
          .status(StatusCodes.BAD_REQUEST)
          .send(
            serviceResponse.failure(
              "Request failed",
              null,
              validatedRequest.error.message
            )
          );
      }

      const response = await aiService.getAIVideoStatus(validatedRequest.data);

      res.status(res.statusCode).send(response);
    } catch (error) {
      return res
        .status(StatusCodes.INTERNAL_SERVER_ERROR)
        .send(serviceResponse.failure("Internal error", null, String(error)));
    }
  };
}

export const aiController = new AIController();
