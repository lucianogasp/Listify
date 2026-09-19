import { AppError } from "#errors/app.error.js";
import { AuthToken } from "#services/AuthToken.js";

const authToken = new AuthToken();

export const authMiddleware = (req, res, next) => {
  try {
    const token = authToken.getTokenFromHeader(req.headers.authorization);
    if(!token) throw new AppError(401, 'Malformed token');
    
    const decoded = authToken.verifyJWT(token);
    if(!decoded || !decoded.userId) throw new AppError(401, 'Invalid token');

    req.userId = decoded.userId;
    next();
  } catch(err) {
    if (err instanceof AppError) {
      return next(err);
    }
    next(err);
  }
}