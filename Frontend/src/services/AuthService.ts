export class AuthService<TBody> {

  // private registerUrl: string = 'http://localhost:3000/register';
  // private loginUrl: string = 'http://localhost:3000/login';
  public url: string;
  public bodyObject: TBody;

  constructor(url: string, bodyObject: TBody) {
    this.url = url;
    this.bodyObject = bodyObject;
  }

  async fetchApi(): Promise<Response> {
    const response: Response = await fetch(
      this.url,
      {
        method: 'POST',
        headers: {
          'content-Type': 'application/json'
        },
        body: JSON.stringify(this.bodyObject)
      }
    );
    return response;
  }
}