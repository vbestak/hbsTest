import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from "@nestjs/common";
import { Observable, tap } from "rxjs";

@Injectable()
export class AuthInfoInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const request = context.switchToHttp().getRequest();
    const response = context.switchToHttp().getResponse();

    const isAuthenticated = request.isAuthenticated();

    return next.handle().pipe(
      tap(() => {
        response.locals.isAuthenticated = isAuthenticated;
      }),
    );
  }
}