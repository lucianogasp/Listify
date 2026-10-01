import { z } from 'zod';

export const errorMiddleware = (err, req, res, next) => {

  if(err instanceof z.ZodError) {
    return res
      .status(400)
      .json({
        message: 'Invalid request data',
        error : err.issues
      });
  }

  return res
    .status(err.status || 500)
    .json({ error: err.message });
}