import { ArgumentsHost, Catch, ExceptionFilter, Logger, UnauthorizedException } from "@nestjs/common";
import { Response } from "express";

@Catch(UnauthorizedException)
export class UnauthorizedFilter implements ExceptionFilter {
  catch(exception: UnauthorizedException, host: ArgumentsHost) {
    Logger.log(exception.getResponse());
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();

    response.redirect("/login"); // Redirect to the login page
  }
}