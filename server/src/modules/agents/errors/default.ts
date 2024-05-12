import { Result } from "../../../shared/core/Result";
import { UseCaseError } from "../../../shared/core/UseCaseError";

export class InvalidDTOError extends Result<UseCaseError> {
  constructor () {
    super(false, {
      message: `Invalid request body.`
    } as UseCaseError)
  }
}