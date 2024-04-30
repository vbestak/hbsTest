import { Controller, Get, Render, UseInterceptors } from "@nestjs/common";
import { AuthInfoInterceptor } from "../common/interceptors/authInfoInterceptor";

@Controller()
export class IndexController {

  @Get()
  @UseInterceptors(AuthInfoInterceptor)
  @Render("index")
  index() {
  }
}