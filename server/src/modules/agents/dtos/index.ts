import { ClientDTO } from "../../clients/dtos";

export interface AgentDTO {
  id: string;
  name: string;
  email: string;
  status: number;
}

export interface CreateDTO {
  name: string;
  email: string;
}

export interface GetAgentDTO extends AgentDTO {
  clients: Array<ClientDTO>;
}

export interface GetAllDTO {}