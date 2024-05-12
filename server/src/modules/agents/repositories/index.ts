import { UniqueEntityID } from "../../../shared/domain/UniqueEntityID";
import { AgentModel } from "../../../shared/infra/database/mongo";
import { Agent } from "../domain/agent";
import { AgentDTO } from "../dtos";
import { AgentMap } from "../mappers/mapper";

export interface IAgentRepository {
  getAll(): Promise<Array<Agent>>
  create(dto: AgentDTO): Promise<void>
  findById(id: string): Promise<Agent | undefined>
}

export class AgentRepository implements IAgentRepository {
  async getAll(): Promise<Array<Agent>> {
    const agents = await AgentModel.find({});     
    const data = new Array<Agent>;

    for (const iterator of agents) {
      const agent = AgentMap.toDomain({
        id: iterator.id,
        name: iterator.name,
        email: iterator.email,
        status: iterator.status
      });

      agent && data.push(agent);
    }

    return data;
  }

  async create(dto: AgentDTO): Promise<void> {
    try {
      const uuid = new UniqueEntityID();
      const agent = new AgentModel({ ...dto, _id: uuid.toString() });
      await agent.save();
      
      return;
    } catch (error) {
      throw error;
    }
  }

  async findById(id: string): Promise<Agent | undefined> {
    try {
      const data = await AgentModel.findById(id);
      if (!data || !data._id)
        return;
  
      return AgentMap.toDomain({
        id: data.id,
        name: data.name,
        email: data.email,
        status: data.status,
      }); 
    } catch (error) {
      return undefined;
    }
  }
}