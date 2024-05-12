import { AppError } from "../../../shared/core/AppError";
import { Either, Result, left, right } from "../../../shared/core/Result";
import { UseCase } from "../../../shared/core/UseCase";
import { ClientDTO, GetAllDTO } from "../dtos";
import { ClientMap } from "../mappers/mapper";
import { IClientRepository } from "../repositories";

type Response = Either<
  AppError.Unexpected,
  Result<Array<ClientDTO>>
>

export class GetAllUseCase implements UseCase<GetAllDTO, Response> {
  private repo: IClientRepository;

  constructor(repo: IClientRepository) {
    this.repo = repo;
  }

  async execute(): Promise<Response> {
    try {
      const domainData = await this.repo.getAll();
      const data = new Array<ClientDTO>;

      for (const i of domainData)
        data.push(ClientMap.ToDTO(i));

      return right(Result.ok<Array<ClientDTO>>(data));
    } catch (error) {
      return left(new AppError.Unexpected(error))
    }
  }
}