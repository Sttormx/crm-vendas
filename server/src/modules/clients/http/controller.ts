import { BaseController } from "../../../shared/infra/http/base_controller";
import * as express from 'express'
import { GetAllUseCase } from "../useCases/all";
import { ClientRepository } from "../repositories";
import { CreateUseCase } from "../useCases/create";
import { CreateDTO } from "../dtos";
import { AgentNotFound, ClientNotFound, InvalidDTOError, NoAgentsAvailable } from "../errors/default";
import { AgentRepository } from "../../agents/repositories";
import { DeleteUseCase } from "../useCases/delete";
import { UpdateUseCase } from "../useCases/update";

export class Controller extends BaseController {
  constructor() {
    super();
  }

  async getAll(req: express.Request, res: express.Response): Promise<any> {
    try {
      const useCase = new GetAllUseCase(new ClientRepository())
      const result = await useCase.execute()
      if (result.isRight())
        return this.ok(res, result.value.getValue())

      return this.fail(res, result.value.getErrorValue().message)
    } catch (error: any) {
      return this.fail(res, error)
    }
  }

  async create(req: express.Request, res: express.Response): Promise<any> {
    try {
      const useCase = new CreateUseCase(new ClientRepository(), new AgentRepository());
      const result = await useCase.execute(req.body as CreateDTO)
      if (result.isRight())
        return this.ok(res, {})

      if (result.isLeft()) {
        const error = result.value;
        switch (error.constructor) {
          case InvalidDTOError:
            return this.UE(res, error.getErrorValue().message);
          case NoAgentsAvailable:
            return this.Unavailable(res, error.getErrorValue().message)
        }
      }

      return this.fail(res, result.value.getErrorValue().message);
    } catch (error: any) {
      this.fail(res, error)
    }
  }

  async delete(req: express.Request, res: express.Response): Promise<any> {
    try {
      const useCase = new DeleteUseCase(new ClientRepository());
      const result = await useCase.execute(req.params.id);
      if (result.isRight())
        return this.ok(res, {});

      if (result.isLeft()) {
        const error = result.value;
        switch (error.constructor) {
          case ClientNotFound:
            return this.notFound(res, error.getErrorValue().message);
        }
      }

      return this.fail(res, result.value.getErrorValue().message);
    } catch (error: any) {
      this.fail(res, error)
    }
  }

  async update(req: express.Request, res: express.Response): Promise<any> {
    try {
      const useCase = new UpdateUseCase(new ClientRepository(), new AgentRepository());
      const result = await useCase.execute({id: req.params.id, dto: req.body})
      if (result.isRight())
        return this.ok(res, {})

      if (result.isLeft()) {
        const error = result.value;
        switch (error.constructor) {
          case InvalidDTOError:
            return this.UE(res, error.getErrorValue().message);
          case ClientNotFound:
            return this.notFound(res, error.getErrorValue().message)
          case AgentNotFound:
            return this.notFound(res, error.getErrorValue().message)
        }
      }

      return this.fail(res, result.value.getErrorValue().message);
    } catch (error: any) {
      this.fail(res, error)
    }
  }
}