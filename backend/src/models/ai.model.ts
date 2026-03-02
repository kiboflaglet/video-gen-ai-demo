import z from "zod";

export const AIVideoSchema = z.object({
  id: z.string(),
  prompt: z.string(),
  status: z.enum(["queued", "processing", "completed", "failed"]),
  userId: z.string(),
  provider: z.enum(["test", "pika"]),
  duration: z.number().min(1).max(100),
  videoURL: z.url().nullable(),
});

export const CreateAIVideoRequestSchema = AIVideoSchema.pick({
  prompt: true,
  provider: true,
  duration: true,
  userId: true,
});

export const AIVideoGetRequestSchema = AIVideoSchema.pick({
  id: true,
});

export const AIVideoGetResponseSchema = AIVideoSchema.pick({
  id: true,
  prompt: true,
  status: true,
  userId: true,
  provider: true,
  duration: true,
  videoURL: true,
});

export const AIVideoGenerationResultResponseSchema = AIVideoSchema.pick({
  videoURL: true,
});

export type AIVideoType = z.infer<typeof AIVideoSchema>;
export type CreateAIVideoRequestType = z.infer<
  typeof CreateAIVideoRequestSchema
>;
export type AIVideoGetRequestType = z.infer<typeof AIVideoGetRequestSchema>;
export type AIVideoGetResponseType = z.infer<typeof AIVideoGetResponseSchema>;
export type AIVideoGenerationResultResponseType = z.infer<typeof AIVideoGenerationResultResponseSchema>;
