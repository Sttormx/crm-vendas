import { BaseController } from "../../../shared/infra/http/base_controller";
import * as express from 'express'
import { GetAllUseCase } from "../useCases/all";
import { AgentRepository } from "../repositories";
import { CreateUseCase } from "../useCases/create";
import { CreateDTO } from "../dtos";
import { InvalidDTOError } from "../errors/default";
import { AgentNotFound } from "../../clients/errors/default";
import { ClientRepository } from "../../clients/repositories";
import { GetUseCase } from "../useCases/get";

export class Controller extends BaseController {
  constructor() {
    super();
  }

  async getAll(req: express.Request, res: express.Response): Promise<any> {
    try {
      const useCase = new GetAllUseCase(new AgentRepository())
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
      const useCase = new CreateUseCase(new AgentRepository());
      const result = await useCase.execute(req.body as CreateDTO)
      if (result.isRight())
        return this.ok(res, {});

      if (result.isLeft()) {
        const error = result.value;
        switch (error.constructor) {
          case InvalidDTOError:
            return this.UE(res, error.getErrorValue().message);
        }
      }

      return this.fail(res, result.value.getErrorValue().message)
    } catch (error: any) {
      this.fail(res, error)
    }
  }

  async get(req: express.Request, res: express.Response): Promise<any> {
    try {
      const useCase = new GetUseCase(new AgentRepository(), new ClientRepository());
      const result = await useCase.execute(req.params.id);
      if (result.isRight())
        return this.ok(res, result.value.getValue());

      if (result.isLeft()) {
        const error = result.value;
        switch (error.constructor) {
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