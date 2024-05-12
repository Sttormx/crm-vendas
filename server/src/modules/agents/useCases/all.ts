import { AppError } from "../../../shared/core/AppError";
import { Either, Result, left, right } from "../../../shared/core/Result";
import { UseCase } from "../../../shared/core/UseCase";
import { AgentDTO, GetAllDTO } from "../dtos";
import { AgentMap } from "../mappers/mapper";
import { IAgentRepository } from "../repositories";

type Response = Either<
  AppError.Unexpected,
  Result<Array<AgentDTO>>
>

export class GetAllUseCase implements UseCase<GetAllDTO, Response> {
  private repo: IAgentRepository;

  constructor(repo: IAgentRepository) {
    this.repo = repo;
  }

  async execute(): Promise<Response> {
    try {
      const domainData = await this.repo.getAll();
      const data = new Array<AgentDTO>;

      for (const i of domainData)
        data.push(AgentMap.ToDTO(i));

      return right(Result.ok<Array<AgentDTO>>(data));
    } catch (error) {
      return left(new AppError.Unexpected(error))
    }
  }
}