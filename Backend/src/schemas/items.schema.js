import { z } from 'zod';

const ItemPostSchema = z.object({
  title: z.string().min(1).max(50),
  is_prioritized: z.boolean(),
  status: z.enum([
    'PENDING',
    'IN_PROGRESS',
    'COMPLETED', 
    'CANCELLED'
  ])
});

const ItemPachtSchema = z.object({
  title: z.string().min(1).max(50).optional(),
  is_prioritized: z.boolean().optional(),
  status: z.enum([
    'PENDING',
    'IN_PROGRESS',
    'COMPLETED',
    'CANCELLED'
  ]).optional()
});

export default {
  ItemPostSchema,
  ItemPachtSchema
};