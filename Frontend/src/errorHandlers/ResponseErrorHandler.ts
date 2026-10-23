import { ApiError } from "@/errors/ApiError";

export class ResponseErrorHandler {
  
  static verifyHTTPResponse(response: Response, data: unknown): void {
    if(!response.ok) throw new ApiError('Response API is not OK', response, data);
  }
}