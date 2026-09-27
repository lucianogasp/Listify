export class TokenErrorHandler {

  static verifyToken(token: string | null): void {
    if(!token) throw new Error('Token was not provided...');
  }
}