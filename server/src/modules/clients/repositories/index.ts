import { UniqueEntityID } from "../../../shared/domain/UniqueEntityID";
import { ClientModel } from "../../../shared/infra/database/mongo";
import { Client } from "../domain/client";
import { ClientDTO } from "../dtos";
import { ClientMap } from "../mappers/mapper";

export interface IClientRepository {
  getAll(): Promise<Array<Client>>
  create(dto: ClientDTO): Promise<void>
  delete(id: string): Promise<any>
  findById(id: string): Promise<Client | undefined>
  update(id: string, dto: ClientDTO): Promise<any>
}

export class ClientRepository implements IClientRepository {
  async getAll(): Promise<Array<Client>> {
    const clients = await ClientModel.find({});     
    const data = new Array<Client>;

    for (const iterator of clients) {
      const client = ClientMap.toDomain({
        id: iterator.id,
        name: iterator.name,
        email: iterator.email,
        contact: iterator.contact,
        address: iterator.address,
        status: iterator.status,
        agent: iterator.agent
      });

      client && data.push(client);
    }

    return data;
  }

  async create(dto: ClientDTO): Promise<void> {
    try {
      const uuid = new UniqueEntityID();
      const client = new ClientModel({ ...dto, _id: uuid.toString() });
      await client.save();
      
      return;
    } catch (error) {
      throw error;
    }
  }

  delete(id: string): Promise<any> {
    return ClientModel.findByIdAndDelete(id);
  }

  async findById(id: string): Promise<Client | undefined> {
    try {
      const data = await ClientModel.findById(id);
      if (!data || !data._id)
        return;

      return ClientMap.toDomain({
        id: data.id,
        name: data.name,
        email: data.email,
        contact: data.contact,
        address: data.address,
        status: data.status,
        agent: data.agent
      });
    } catch (error) {
      return undefined
    }
  }

  async update(id: string, dto: ClientDTO): Promise<any> {
    return ClientModel.findByIdAndUpdate(id, { ...dto});
  }
}