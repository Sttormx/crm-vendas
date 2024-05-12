import { BaseValidator } from "../../../shared/domain/BaseValidator";
import { UpdateDTO } from "../dtos";

export class ValidateUpdate extends BaseValidator {
  private dto: UpdateDTO;
  
  constructor(dto: UpdateDTO) {
    super();
    this.dto = dto;
  }

  public static isValidDto(dto: UpdateDTO): boolean {
    const v = new ValidateUpdate(dto);
    return v.StringNotEmpty(dto.email) && v.StringNotEmpty(dto.name) && v.StringNotEmpty(dto.contact) && v.StringNotEmpty(dto.address) && v.StringNotEmpty(dto.agent);
  }
}