import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { MongooseModuleAsyncOptions } from "@nestjs/mongoose/dist/interfaces/mongoose-options.interface";
import { AuthModule } from "./auth/auth.module";
import { ArticleModule } from "./article/article.module";
import { LanguageModule } from "./language/language.module";
import { ControllerModule } from "./api/controller.module";

@Module({
  imports: [
    ControllerModule,
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: [`env/.${process.env.NODE_ENV}.env`]
    }),
    MongooseModule.forRootAsync({
      useFactory: async (configService: ConfigService) => ({
        uri: configService.get("DATABASE_URL")
      }),
      inject: [ConfigService]
    } as MongooseModuleAsyncOptions),
    AuthModule,
    ArticleModule,
    LanguageModule
  ]
})
export class AppModule {
}
