import { NestFactory, Reflector } from "@nestjs/core";
import { AppModule } from "./app.module";
import { join } from "path";
import { NestExpressApplication } from "@nestjs/platform-express";
import { useRequestLogging } from "./util/logging/logger";
import { useSwagger } from "./util/swagger/swagger";
import { ClassSerializerInterceptor, Logger } from "@nestjs/common";
import { useContainer } from "class-validator";
import * as mongoose from "mongoose";
import { ConfigService } from "@nestjs/config";
import * as session from "express-session";
import * as passport from "passport";
import * as hbs from "express-handlebars";
import { engine } from "express-handlebars";
import * as MongoDBStore from "connect-mongodb-session";
import { UnauthorizedFilter } from "./common/filters/unauthorizedFilter";
import { getFieldErrorsHelper } from "./util/handlebars/getFieldErrors.helper";
import { setErrorClassHelper } from "./util/handlebars/setErrorClass.helper";
import { TransformPipe } from "./common/pipes/transform.pipe";
import { AuthInfoInterceptor } from "./common/interceptors/authInfoInterceptor";
import { ifEqHelper } from "./util/handlebars/ifEq.helper";


async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(
    AppModule
  );

  const configService: ConfigService = app.get(ConfigService);
  const PORT = configService.get<number>("PORT", 3000);
  const DEBUG_MODE = configService.get("DEBUG") === "true";

  const DB_URI = configService.get("DATABASE_URL");
  const SESSION_SECRET = configService.get<string>("SESSION_SECRET", "default");
  const SESSION_RESAVE = configService.get<string>("SESSION_RESAVE", "false");
  const SESSION_SAVE_UNINITIALIZED = configService.get<string>("SESSION_SAVE_UNINITIALIZED", "false");
  const SESSION_COOKIE_MAX_AGE = configService.get<string>("SESSION_MAX_AGE", "3600000");

  mongoose.set("debug", DEBUG_MODE);
  useRequestLogging(app);
  useSwagger(app);

  app.useGlobalFilters(new UnauthorizedFilter());

  useContainer(app.select(AppModule), { fallbackOnErrors: true });

  app.useGlobalPipes(new TransformPipe());

  app.useGlobalInterceptors(new ClassSerializerInterceptor(app.get(Reflector)));
  app.useGlobalInterceptors(new AuthInfoInterceptor());

  // express-handlebars setup
  app.useStaticAssets(join(__dirname, "..", "resources", "static"));
  app.setBaseViewsDir(join(__dirname, "..", "resources", "views"));
  app.engine(
    "hbs",
    engine({
      extname: "hbs",
      defaultLayout: "base",
      layoutsDir: join(__dirname, "..", "resources", "views", "layouts"),
      partialsDir: join(__dirname, "..", "resources", "views", "partials"),
      helpers: {
        getFieldErrors: getFieldErrorsHelper,
        setErrorClass: setErrorClassHelper,
        if_eq: ifEqHelper
      }
    })
  );
  app.setViewEngine("hbs");

  const store = new (MongoDBStore(session))({
    uri: DB_URI,
    collection: "sessions"
  });

  app.use(
    session({
      store,
      name: "ses",
      secret: SESSION_SECRET,
      resave: Boolean(SESSION_RESAVE),
      saveUninitialized: Boolean(SESSION_SAVE_UNINITIALIZED),
      cookie: { maxAge: +SESSION_COOKIE_MAX_AGE }
    })
  );

  app.use(passport.initialize());
  app.use(passport.session());

  await app.listen(PORT, () => {
    Logger.log("Server is running on port: " + PORT);
  });
}

bootstrap();
