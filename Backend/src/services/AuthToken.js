import jwt from 'jsonwebtoken';
import 'dotenv/config';

export class AuthToken {

  constructor(objectConfig = {
    expiresInTime: 86400,
    algorithm: 'HS256'
  }) {
    this.objectConfig = objectConfig;
    this.secret = process.env.SECRET_JWT;
  }

  generateJWT = (userId) => {
    return jwt.sign(
      { userId }, // payload
      this.secret, // Secret
      { expiresIn: this.objectConfig.expiresInTime } // config Token
    );
  }

  getTokenFromHeader = (header) => {
    const token = header?.split(' ')[1];
    return token;
  }

  verifyJWT = (token) => {
    return jwt.verify(
      token, // token
      this.secret, // Secret
    );
  }
}
