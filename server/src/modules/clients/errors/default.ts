import { Result } from "../../../shared/core/Result";
import { UseCaseError } from "../../../shared/core/UseCaseError";

export class InvalidDTOError extends Result<UseCaseError> {
  constructor () {
    super(false, {
      message: `Invalid request body.`
    } as UseCaseError)
  }
}

export class NoAgentsAvailable extends Result<UseCaseError> {
  constructor () {
    super(false, {
      message: `No agents available.`
    } as UseCaseError)
  }
}

export class ClientNotFound extends Result<UseCaseError> {
  constructor () {
    super(false, {
      message: `Client not found.`
    } as UseCaseError)
  }
}

export class AgentNotFound extends Result<UseCaseError> {
  constructor () {
    super(false, {
      message: `Agent not found.`
    } as UseCaseError)
  }
}