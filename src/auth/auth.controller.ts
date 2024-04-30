import { Controller, Get, Post, Render, Req, Res, UseGuards, UseInterceptors } from "@nestjs/common";
import { AuthService } from "./service/auth.service";
import { Request, Response } from "express";
import { LocalGuard } from "./guard/local.guard";
import { AuthInfoInterceptor } from "../common/interceptors/authInfoInterceptor";

@Controller()
export class AuthController {
  constructor(
    private authService: AuthService
  ) {
  }

  @Get("/login")
  @UseInterceptors(AuthInfoInterceptor)
  @Render("login")
  index(@Req() req: Request & {session: {returnTo?: string}}) {
    const a = "d";
    const b = a;

    return  {a, b}
  }

  @UseGuards(LocalGuard)
  @Post("login")
  login(@Req() req: Request & {session: {returnTo?: string}}, @Res() res: Response) {
    const returnTo = req.session.returnTo || "/";
    delete req.session.returnTo;

    res.redirect(returnTo);
  }

  @Post("logout")
  logout(@Req() req: Request, @Res() res: Response) {
    this.authService.logout(req);
    res.redirect("/");
  }

}
