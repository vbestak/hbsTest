import { Module } from "@nestjs/common";
import { AdminController } from "./admin.controller";
import { IndexController } from "./index.controller";

@Module({
  controllers: [
    AdminController,
    IndexController
  ]
})
export class ControllerModule {
}
