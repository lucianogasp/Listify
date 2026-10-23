export class ApiError extends Error {

  type: string;
  ok: boolean;
  status: number;
  body: unknown;

  constructor(message: string, response: Response, body: unknown) {
    super(message);
    this.type = 'ApiError';
    this.status = response.status;
    this.ok = response.ok;
    this.body = body;
  } 
}