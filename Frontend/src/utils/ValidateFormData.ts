export class ValidateFormData {

  static validateType(value: FormDataEntryValue | null, type: string): void {
    if(typeof value !== type) throw new Error('Incorrect type derived from FormDataValues...');
  }
}