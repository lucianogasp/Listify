export class ResponseErrorHandler {
  
  static responseIsOk(response: Response): void {
    if(!response.ok) throw new Error(`Response is not ok >> Status Code: ${response.status}`);
  }
}