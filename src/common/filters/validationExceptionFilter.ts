import { ArgumentsHost, Catch, ExceptionFilter } from "@nestjs/common";
import { ValidationFailedError } from "../errors/validationFailedError";
import {Response, Request} from "express";

@Catch(ValidationFailedError)
export class ValidationExceptionFilter implements ExceptionFilter {
  view: string
  objectName: string

  constructor(view: string, objectName: string) {
    this.view = view;
    this.objectName = objectName;
  }

  async catch(exception: ValidationFailedError, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();

    response.render(this.view, {
      errors: exception.validationErrors,
      [this.objectName]: exception.target,
      url: request.url,
    });
  }
}