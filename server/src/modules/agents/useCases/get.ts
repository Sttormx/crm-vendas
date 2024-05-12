import { AppError } from "../../../shared/core/AppError";
import { Either, Result, left, right } from "../../../shared/core/Result";
import { UseCase } from "../../../shared/core/UseCase";
import { ClientDTO } from "../../clients/dtos";
import { AgentNotFound } from "../../clients/errors/default";
import { IClientRepository } from "../../clients/repositories";
import { GetAllUseCase } from "../../clients/useCases/all";
import { AgentDTO, GetAgentDTO, GetAllDTO } from "../dtos";
import { AgentMap } from "../mappers/mapper";
import { IAgentRepository } from "../repositories";

type Response = Either<
  AppError.Unexpected,
  Result<GetAgentDTO>
>

export class GetUseCase implements UseCase<GetAllDTO, Response> {
  private repo: IAgentRepository;
  private cRepo: IClientRepository;

  constructor(repo: IAgentRepository, cRepo: IClientRepository) {
    this.repo = repo;
    this.cRepo = cRepo;
  }

  async execute(id: string): Promise<Response> {
    try {
      const agent = await this.repo.findById(id);
      if (!agent) {
        return left(new AgentNotFound());
      }

      const clientsAllUseCase = new GetAllUseCase(this.cRepo);
      const getAllResult = await clientsAllUseCase.execute()
      if (getAllResult.isLeft()) {
        throw new Error(getAllResult.value.getErrorValue().message);
      }

      const all = getAllResult.value.getValue();
      const filtered = all?.filter((a) => a.agent == id);
      return right(Result.ok<GetAgentDTO>({ ...agent.props, clients: filtered || new Array<ClientDTO> }));
    } catch (error) {
      return left(new AppError.Unexpected(error))
    }
  }
}