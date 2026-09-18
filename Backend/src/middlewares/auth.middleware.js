import { AuthToken } from "#services/AuthToken.js";

const authToken = new AuthToken();

export const authMiddleware = (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(' ')[1];
    if(!token) res.status(401).json({message: 'Token was not provided correctly'});

    const decoded = authToken.verifyJWT(token);
    req.userId = decoded.userId;
    next();
  } catch(err) {
    next(err);
  }
}