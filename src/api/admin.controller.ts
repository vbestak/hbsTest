import { Controller, Get, Render, UseGuards, UseInterceptors } from "@nestjs/common";
import { AuthenticatedGuard } from "../auth/guard/authenticated.guard";
import { AuthInfoInterceptor } from "../common/interceptors/authInfoInterceptor";

@Controller("admin")
@UseGuards(AuthenticatedGuard)
export class AdminController {

  @Get()
  @UseInterceptors(AuthInfoInterceptor)
  @Render("admin/index")
  index() {
  }
}