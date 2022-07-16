import { ApiProperty } from "@nestjs/swagger";
import { IsNumber, IsString } from "class-validator";

export class CreateTypeDto {
  @ApiProperty({ example: "Fruits", description: "Name of the type" })
  @IsString({ message: "Must be a string" })
  readonly name: string;

  @ApiProperty({ example: "1", description: "Parent type (if not = null)" })
  @IsNumber({}, { message: "Must be a number" })
  readonly parentId: number;
}
