import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsString, MaxLength, MinLength } from "class-validator";
import { Match } from "../../../common/validator/match";
import { IsEmailInUse } from "../../util/validators/isEmailInUse";
import { IsUsernameInUse } from "../../util/validators/isUsernameInUse";

export class CreateUserDto {
  @IsString()
  @IsUsernameInUse()
  @MinLength(6, {})
  @MaxLength(14)
  username: string;

  @IsEmail()
  @IsEmailInUse()
  email: string;

  @IsString()
  @MinLength(8)
  password: string;

  @ApiProperty({ description: "Copy of password. This field is used to make sure user entered correct password." })
  @IsString()
  @MinLength(8)
  @Match("password", { message: "Passwords do not match!" })
  passwordRepeat: string;
}