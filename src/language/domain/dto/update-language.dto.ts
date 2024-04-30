import { IsNotEmpty, IsString, MaxLength } from "class-validator";
import { Types } from "mongoose";
import { IsObjectId } from "../../../common/validator/isObjectId";

export class UpdateLanguageDto {
  @IsObjectId()
  id: Types.ObjectId;

  @IsString()
  @IsNotEmpty()
  @MaxLength(12)
  code: string;

  @IsString()
  @MaxLength(320)
  iconSrc: string;
}
