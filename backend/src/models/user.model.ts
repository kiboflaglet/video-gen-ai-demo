import z from "zod";

export const UserBaseSchema = z.object({
  id: z.uuid(),
  fullName: z.string(),
});

export type UserBaseType = z.infer<typeof UserBaseSchema>;
