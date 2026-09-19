import { AuthToken } from "#services/AuthToken.js";

const authToken = new AuthToken();

export const authMiddleware = (req, res, next) => {
  try {
    const token = authToken.getTokenFromHeader(req.headers.authorization);
    if(!token) throw new Error('malformed token');
    
    const decoded = authToken.verifyJWT(token);    
    req.userId = decoded.userId;
    next();
  } catch(err) {
    next(err);
  }
}