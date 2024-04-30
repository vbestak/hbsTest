import { IsNotEmpty, IsString, MaxLength } from "class-validator";

export class CreateLanguageDto {
  @IsString()
  @IsNotEmpty()
  @MaxLength(12)
  code: string;

  @IsString()
  @MaxLength(320)
  iconSrc: string;
}
