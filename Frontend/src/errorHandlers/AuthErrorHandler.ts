export class AuthErrorHandler {

  static validateFormDataValueType(value: FormDataEntryValue | null, type: string): void {
    if(typeof value !== type) throw new Error('Incorrect type of entries body...');
  }
  
  static authResponseIsOk(response: Response): void {
    if(!response.ok) throw new Error(`Response is not ok >> Status Code: ${response.status}`);
  }
}