import { AppError } from "../../../shared/core/AppError";
import { Either, Result, left, right } from "../../../shared/core/Result";
import { UseCase } from "../../../shared/core/UseCase";
import { ClientNotFound } from "../errors/default";
import { IClientRepository } from "../repositories";

type Response = Either<
  ClientNotFound |
  AppError.Unexpected,
  Result<void>
>

export class DeleteUseCase implements UseCase<string, Response> {
  private repo: IClientRepository;
  
  constructor(repo: IClientRepository) {
    this.repo = repo    
  }

  async execute(id: string): Promise<Response> {
    try {
      if (!(await this.repo.findById(id)))
        return left(new ClientNotFound());

      await this.repo.delete(id);
      return right(Result.ok());
    } catch (error) {
      return left(new AppError.Unexpected(error));
    }
  }
}