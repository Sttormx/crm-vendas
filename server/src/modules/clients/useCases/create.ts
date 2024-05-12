import { AppError } from "../../../shared/core/AppError";
import { Either, Result, left, right } from "../../../shared/core/Result";
import { UseCase } from "../../../shared/core/UseCase";
import { STATUS_AGENT, STATUS_CLIENT } from "../../../shared/enums/status";
import { AgentMap } from "../../agents/mappers/mapper";
import { IAgentRepository } from "../../agents/repositories";
import { GetAllUseCase } from "../../agents/useCases/all";
import { ValidateCreate } from "../domain/create";
import { CreateDTO } from "../dtos";
import { InvalidDTOError, NoAgentsAvailable } from "../errors/default";
import { IClientRepository } from "../repositories";

type Response = Either<
  NoAgentsAvailable |
  InvalidDTOError |
  AppError.Unexpected,
  Result<void>
>

export class CreateUseCase implements UseCase<CreateDTO, Response> {
  private repo: IClientRepository;
  private agRepo: IAgentRepository;

  constructor(repo: IClientRepository, agRepo: IAgentRepository) {
    this.repo = repo;
    this.agRepo = agRepo;
  }

  async execute(dto: CreateDTO): Promise<Response> {
    try {
      if (!ValidateCreate.isValidDto(dto))
        return left(new InvalidDTOError()) as Response;

      const agGetAllUseCase = new GetAllUseCase(this.agRepo);
      const all = await agGetAllUseCase.execute();
      if (all.isLeft())
        throw new Error(all.value.getErrorValue().message);

      const allAgents = all.value.getValue();
      if (!allAgents)
        return left(new NoAgentsAvailable());

      const filteredAgents = allAgents.filter((a) => a.status == STATUS_AGENT.ACTIVE);
      if (filteredAgents.length == 0)
        return left(new NoAgentsAvailable());

      const sortedAgents = AgentMap.sortByAlpha(filteredAgents);
      await this.repo.create({
        id: "",
        name: dto.name,
        email: dto.email,
        contact: dto.contact,
        address: dto.address,
        status: STATUS_CLIENT.AWAITING,
        agent: sortedAgents[0].id
      });   

      return right(Result.ok());
    } catch (error) {
      return left(new AppError.Unexpected(error))
    }
  }
}