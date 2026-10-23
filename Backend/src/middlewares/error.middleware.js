import { z } from 'zod';
import { AppError } from '#errors/app.error.js';

export const errorMiddleware = (err, req, res, next) => {

  if(err instanceof z.ZodError) {
    return res
      .status(400)
      .json({
        message: 'Invalid request data',
        error : err.issues
      });
  }

  if(err instanceof AppError) {
    return res
      .status(err.status)
      .json({ 
        error: err.message 
      });
  }

  return res
    .status(err.status || 500)
    .json({ 
      error: err.message
    });
}