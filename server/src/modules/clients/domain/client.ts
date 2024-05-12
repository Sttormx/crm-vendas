import { Result } from "../../../shared/core/Result";
import { AggregateRoot } from "../../../shared/domain/AggregateRoot";
import { UniqueEntityID } from "../../../shared/domain/UniqueEntityID";

interface ClientProps {
  id: string;
  name: string;
  email: string;
  contact: string;
  address: string;
  status: number;
  agent: string;
}

export class Client extends AggregateRoot<ClientProps> {
  private constructor (props: ClientProps, id?: UniqueEntityID) {
    super(props, id)
  }

  public static create (props: ClientProps, id?: UniqueEntityID): Result<Client> {
    const user = new Client({
      ...props,
    }, id);

    return Result.ok<Client>(user);
  }
}