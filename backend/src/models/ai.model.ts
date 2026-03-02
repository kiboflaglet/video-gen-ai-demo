import z from "zod";

const VideoSchema = z.object({
  prompt: z.string().min(1).max(100),
  jobId: z.string(),
  status: z.enum(['queued', 'failed', 'completed', 'processing']),
  provider: z.string().min(1)
});

export const VideoGenerateSchema = VideoSchema.pick({
  prompt: true,
  provider: true
});
export const VideoStatusSchema = VideoSchema.pick({
  jobId: true,
  status: true,
});

export const VideoGetJobStatusSchema = VideoSchema.pick({
  jobId: true,
});

export type VideoType = z.infer<typeof VideoSchema>;
export type VideoGetJobStatusType = z.infer<typeof VideoGetJobStatusSchema>;
export type VideoGenerateType = z.infer<typeof VideoGenerateSchema>;
export type VideoStatusType = z.infer<typeof VideoStatusSchema>;
