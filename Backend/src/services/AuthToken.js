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
    const secret = this.secret;
    return jwt.sign(
      {userId}, // payload
      secret, // Secret
      {expiresIn: this.objectConfig.expiresInTime} // config Token
    );
  }

  verifyJWT = (token) => {
    const secret = this.secret;
    return jwt.verify(
      token, // token
      secret, // Secret
    );
  }

  getTokenFromHeader = (header) => {
    const token = header?.split(' ')[1];
    return token;
  }
}
