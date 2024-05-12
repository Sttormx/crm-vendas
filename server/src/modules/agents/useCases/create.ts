import { AppError } from "../../../shared/core/AppError";
import { Either, Result, left, right } from "../../../shared/core/Result";
import { UseCase } from "../../../shared/core/UseCase";
import { STATUS_AGENT } from "../../../shared/enums/status";
import { ValidateCreate } from "../domain/create";
import { CreateDTO } from "../dtos";
import { InvalidDTOError } from "../errors/default";
import { IAgentRepository } from "../repositories";

type Response = Either<
  InvalidDTOError |
  AppError.Unexpected,
  Result<void>
>

export class CreateUseCase implements UseCase<CreateDTO, Response> {
  private repo: IAgentRepository;

  constructor(repo: IAgentRepository) {
    this.repo = repo;
  }

  async execute(dto: CreateDTO): Promise<Response> {
    try {
      if (!ValidateCreate.isValidDto(dto))
        return left(new InvalidDTOError()) as Response;

      await this.repo.create({ id: "", name: dto.name, email: dto.email, status: STATUS_AGENT.ACTIVE });
      return right(Result.ok());
    } catch (error) {
      return left(new AppError.Unexpected(error))
    }
  }
}