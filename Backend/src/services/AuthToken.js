import jwt from 'jsonwebtoken';
import 'dotenv/config';
import { AppError } from '#errors/app.error.js';

export class AuthToken {

  constructor(objectConfig = {
    expiresInTime: 86400,
    algorithm: 'HS256'
  }) {
    this.objectConfig = objectConfig;
    this.secret = process.env.SECRET_JWT;
  }

  generateJWT = (userId) => {
    const secret = this.secret;
    return jwt.sign(
      {userId}, // payload
      secret, // Secret
      {expiresIn: this.objectConfig.expiresInTime} // config Token
    );
  }

  getTokenFromHeader = (header) => {
    const token = header?.split(' ')[1];
    return token;
  }

  verifyJWT = (token) => {
    try {
      return jwt.verify(
        token, // token
        this.secret, // Secret
      );
    } catch {
      throw null;
    }
  }
}
