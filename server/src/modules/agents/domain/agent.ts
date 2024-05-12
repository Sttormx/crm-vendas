import { Result } from "../../../shared/core/Result";
import { AggregateRoot } from "../../../shared/domain/AggregateRoot";
import { UniqueEntityID } from "../../../shared/domain/UniqueEntityID";

interface AgentProps {
  id: string;
  name: string;
  email: string;
  status: number;
}

export class Agent extends AggregateRoot<AgentProps> {
  private constructor (props: AgentProps, id?: UniqueEntityID) {
    super(props, id)
  }

  public static create (props: AgentProps, id?: UniqueEntityID): Result<Agent> {
    const user = new Agent({
      ...props,
    }, id);

    return Result.ok<Agent>(user);
  }
}