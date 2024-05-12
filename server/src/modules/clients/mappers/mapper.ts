import { Client } from "../domain/client";
import { ClientDTO } from "../dtos";

interface Mapper<T>{}

export class ClientMap implements Mapper<Client> {
  public static ToDTO(client: Client): ClientDTO {
    return {
      id: client.props.id,
      name: client.props.name,
      email: client.props.email,
      contact: client.props.contact,
      address: client.props.address,
      status: client.props.status,
      agent: client.props.agent
    }
  }

  public static toDomain(raw: any): Client | undefined {
    const client = Client.create({
      id: raw.id,
      name: raw.name,
      email: raw.email,
      contact: raw.contact,
      address: raw.address,
      status: raw.status,
      agent: raw.agent
    });

    return client.getValue();
  }
}