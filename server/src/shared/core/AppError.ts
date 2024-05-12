import { Result } from "./Result";
import { UseCaseError } from "./UseCaseError";

export namespace AppError {
  export class Unexpected extends Result<UseCaseError> {
    public constructor (err: any) {
      super(false, {
        message: `An unexpected error occurred.`,
        error: err
      } as UseCaseError)
      console.log(`[AppError]: An unexpected error occurred`);
      console.error(err);
    }

    public static create (err: any): Unexpected {
      return new Unexpected(err);
    }
  }
}