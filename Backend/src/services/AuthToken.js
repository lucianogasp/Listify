import jwt from 'jsonwebtoken';
import 'dotenv/config';

export class AuthToken {

  constructor(objectConfig = {
    expiresInTime: 86400,
    algorithm: 'HS256'
  }) {
    this.objectConfig = objectConfig;
  }

  generateJWT = (userId) => {
    return jwt.sign(
      {userId}, // payload
      process.env.SECRET_JWT, // Secret
      {expiresIn: this.objectConfig.expiresInTime} // config Token
    );
  }

  verifyJWT = (token) => {
    return jwt.verify(
      token, // token
      process.env.SECRET_JWT, // Secret
      { 
        algorithms: [this.objectConfig.algorithm] // ObjectConfig
      }
    );
  }
}
