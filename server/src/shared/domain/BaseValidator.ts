export class BaseValidator {
  protected StringNotEmpty(str?: string): boolean {
    return (str != undefined && str != "");
  }
}