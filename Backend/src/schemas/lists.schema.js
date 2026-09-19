import { z } from 'zod';

const ListPostSchema = z.object({
  name: z.string().min(1).max(50),
  description: z.string().max(500).optional()
});

const ListPatchSchema = z.object({
  name: z.string().min(1).max(50).optional(),
  description: z.string().max(500).optional()
});

export default {
  ListPostSchema,
  ListPatchSchema
};