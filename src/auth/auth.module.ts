import * as path from "path";
import { Module, OnApplicationBootstrap } from "@nestjs/common";
import { InjectModel, MongooseModule } from "@nestjs/mongoose";
import { User, UserDocument, UserSchema } from "./domain/entity/user.entity";
import { AuthService } from "./service/auth.service";
import { LocalStrategy } from "./strategy/local.strategy";
import { PassportModule } from "@nestjs/passport";
import { UserService } from "./service/user.service";
import { IsEmailInUseConstraint } from "./util/validators/isEmailInUse";
import { IsUsernameInUseConstraint } from "./util/validators/isUsernameInUse";
import { AuthController } from "./auth.controller";
import { SessionSerializerService } from "./service/sessionSerializer.service";
import { IImportDefaultDataProps, importDefaultData } from "../util/defaultData/importDefault";
import { Model } from "mongoose";

@Module({
  imports: [
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
    PassportModule.register({ session: true })
  ],
  providers: [AuthService, UserService, LocalStrategy, IsEmailInUseConstraint, IsUsernameInUseConstraint, SessionSerializerService],
  exports: [AuthService, UserService],
  controllers: [AuthController]
})
export class AuthModule implements OnApplicationBootstrap {
  constructor(@InjectModel(User.name) private readonly userModel: Model<UserDocument>, private authService: AuthService) {
  }

  async onApplicationBootstrap() {
    await importDefaultData<User>({
      filePath: path.join(__dirname, '../util/defaultData/users.json'),
      keyField: "email",
      model: this.userModel,
      modelName: User.name,
      dataModifier: async (user: User) => {
        const hashedPassword = await this.authService.hashPassword(user.password);
        return { ...user, password: hashedPassword };
      }
    } as IImportDefaultDataProps<any>);
  }
}
