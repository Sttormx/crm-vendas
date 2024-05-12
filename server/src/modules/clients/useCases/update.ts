import { AppError } from "../../../shared/core/AppError";
import { Either, Result, left, right } from "../../../shared/core/Result";
import { UseCase } from "../../../shared/core/UseCase";
import { IAgentRepository } from "../../agents/repositories";
import { ValidateUpdate } from "../domain/update";
import { UpdateDTO } from "../dtos";
import { AgentNotFound, ClientNotFound, InvalidDTOError } from "../errors/default";
import { IClientRepository } from "../repositories";

type Response = Either<
  AgentNotFound |
  ClientNotFound |
  InvalidDTOError |
  AppError.Unexpected,
  Result<void>
>

export class UpdateUseCase implements UseCase<{id: string, dto: UpdateDTO}, Response> {
  private repo: IClientRepository;
  private agRepo: IAgentRepository;

  constructor(repo: IClientRepository, agRepo: IAgentRepository) {
    this.repo = repo;
    this.agRepo = agRepo;
  }

  async execute(req: {id: string, dto: UpdateDTO}): Promise<Response> {
    try {
      if (!ValidateUpdate.isValidDto(req.dto))
        return left(new InvalidDTOError());

      if (!(await this.repo.findById(req.id)))
        return left(new ClientNotFound());

      if (!(await this.agRepo.findById(req.dto.agent)))
        return left(new AgentNotFound());
      
      await this.repo.update(req.id, {
        id: req.id,
        name: req.dto.name,
        email: req.dto.email,
        contact: req.dto.contact,
        address: req.dto.address,
        status: req.dto.status,
        agent: req.dto.agent
      });

      return right(Result.ok());
    } catch (error) {
      return left(new AppError.Unexpected(error))
    }
  }
}