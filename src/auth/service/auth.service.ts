import { HttpStatus, Injectable, UnauthorizedException } from "@nestjs/common";
import * as bcrypt from "bcrypt";
import { CredentialsDto } from "../domain/dto/credentials.dto";
import { User } from "../domain/entity/user.entity";
import { UserService } from "./user.service";
import { Request } from "express";
import { ConfigService } from "@nestjs/config";

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private configService: ConfigService
  ) {
  }

  async authorize({ email, password }: CredentialsDto): Promise<User> {
    const user = await this.userService.findByEmail(email);

    if (!user) {
      throw new UnauthorizedException("Invalid credentials");
    }

    const isCorrectPassword = await this.doPasswordMatch(password, user?.password);

    if (!isCorrectPassword) {
      throw new UnauthorizedException("Invalid credentials");
    }

    return user;
  }

  async login() {
    return {
      message: "Login successful",
      statusCode: HttpStatus.OK
    };
  }

  logout(request: Request) {
    request.session.destroy(() => {
      return {
        message: "Logout successful",
        statusCode: HttpStatus.OK
      };
    });
  }

  async hashPassword(password: string) {
    const SALT_ROUNDS = this.configService.get<number>("SALT_ROUNDS", 10);
    return await bcrypt.hash(password, Number(SALT_ROUNDS));
  }


  private async doPasswordMatch(password: string, hash: string): Promise<boolean> {
    return await bcrypt.compare(password, hash);
  }
}
