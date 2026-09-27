export class ApiService {

  private endpoint: string;
  private token?: string;

  constructor(endpoint: string, token?: string) {
    this.endpoint = endpoint;
    this.token = token;
  }

  async fetchApi<TBody>(
    method: 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE',
    bodyObject?: TBody
  ): Promise<Response> {
    return await fetch(
      this.endpoint,
      {
        method,
        headers: {
          'content-Type': 'application/json',
          ...(this.token && {
            Authorization: `Bearer ${this.token}`
          })
        },
        body: bodyObject ? JSON.stringify(bodyObject) : undefined
      }
    );
  }
}