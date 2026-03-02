import { StatusCodes } from "http-status-codes";
import z from "zod";
import { handleError } from "./handleError";

export class serviceResponse<T = null> {
  readonly success: boolean;
  readonly data: T;
  readonly statusCode: number;
  readonly message: string;

  private constructor(
    success: boolean,
    data: T,
    statusCode: number,
    message: string
  ) {
    this.success = success;
    this.data = data;
    this.statusCode = statusCode;
    this.message = message;
  }

  static success<T>(
    message: string,
    data: T,
    statusCode: number = StatusCodes.OK
  ) {
    return new serviceResponse(true, data, statusCode, message);
  }

  static failure<T>(
    message: string,
    data: T,
    errorMessage?: string,
    statusCode: number = StatusCodes.BAD_REQUEST
  ) {
    if (errorMessage) {
      handleError("ServiceResponse/failure/errorMessage" + errorMessage);
    }
    return new serviceResponse(false, data, statusCode, message);
  }
}

export const ServiceResponseSchema = <T extends z.ZodTypeAny>(dataSchema: T) =>
  z.object({
    success: z.boolean(),
    message: z.string(),
    data: dataSchema.optional(),
    statusCode: z.number(),
  });
