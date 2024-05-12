export interface ClientDTO {
  id: string;
  name: string;
  email: string;
  contact: string;
  address: string;
  status: number;
  agent: string;
}

export interface CreateDTO {
  name: string;
  email: string;
  contact: string;
  address: string;
}

export interface GetAllDTO {}

export interface UpdateDTO {
  name: string;
  email: string;
  contact: string;
  address: string;
  status: number;
  agent: string;
}