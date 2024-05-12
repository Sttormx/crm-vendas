import { BaseValidator } from "../../../shared/domain/BaseValidator";
import { CreateDTO } from "../dtos";

export class ValidateCreate extends BaseValidator {
  private dto: CreateDTO;
  
  constructor(dto: CreateDTO) {
    super();
    this.dto = dto;
  }

  public static isValidDto(dto: CreateDTO): boolean {
    const v = new ValidateCreate(dto);
    return v.StringNotEmpty(dto.email) && v.StringNotEmpty(dto.name);
  }
}