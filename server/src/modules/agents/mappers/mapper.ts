import { Agent } from "../domain/agent";
import { AgentDTO } from "../dtos";

interface Mapper<T>{}

export class AgentMap implements Mapper<Agent> {
  public static ToDTO(agent: Agent): AgentDTO {
    return {
      id: agent.props.id,
      name: agent.props.name,
      email: agent.props.email,
      status: agent.props.status
    }
  }

  public static toDomain(raw: any): Agent | undefined {
    const agent = Agent.create({
      id: raw.id,
      name: raw.name,
      email: raw.email,
      status: raw.status
    });

    return agent.getValue();
  }

  public static sortByAlpha(arr: Array<AgentDTO>): Array<AgentDTO> {
    return arr.sort((a, b) => {
      const nameA = a.name.toLowerCase();
      const nameB = b.name.toLowerCase();
      if (nameA < nameB) {
        return -1;
      }
      if (nameA > nameB) {
        return 1;
      }
      return 0;
    });
  }
}