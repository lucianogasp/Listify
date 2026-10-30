import { TokenErrorHandler } from "@/errorHandlers/TokenErrorHandler";
import { ResponseErrorHandler } from "@/errorHandlers/ResponseErrorHandler";
import { ApiService } from "./ApiService";

import type { MethodApi } from "@/pages/Dashboard/Dashboard.data";

export class ApiHandler {

  static createInstance(endpoint: string, token?: string | undefined): ApiService {
    if(token) {
      TokenErrorHandler.verifyToken(token);
    }
    return new ApiService(endpoint, token);
  }

  static async request<TData>(
    apiService: ApiService, 
    method: MethodApi, 
    bodyObject?: unknown
  ): Promise<TData> {
    const response = await apiService.fetchApi(method, bodyObject);
    const data: unknown = await response.json();

    ResponseErrorHandler.verifyHTTPResponse(response, data);

    return data as TData;
  }
}