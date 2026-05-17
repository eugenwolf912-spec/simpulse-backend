import { z } from 'zod'

export const eventQuerySchema = z.object({
  region: z.string().optional(),
  limit: z.coerce.number().int().min(1).max(500).optional(),
})

export const eventParamsSchema = z.object({
  id: z.string().min(1),
})

export const createEventSchema = z.object({
  title: z.string().min(1),
  description: z.string().optional().default(''),
  region: z.string().min(1),
  slurl: z.string().min(1),
  startTime: z.coerce.date(),
  endTime: z.coerce.date(),
  tags: z.string().optional().default(''),
})

export const updateEventSchema = createEventSchema.partial()

export const postQuerySchema = z.object({
  limit: z.coerce.number().int().min(1).max(200).optional(),
})

export const createPostSchema = z.object({
  userId: z.string().min(1),
  content: z.string().min(1),
})

export const lslQuerySchema = z.object({
  region: z.string().min(1),
  limit: z.coerce.number().int().min(1).max(200).optional(),
})
