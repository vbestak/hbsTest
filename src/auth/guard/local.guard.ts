import { ExecutionContext, Injectable } from "@nestjs/common";
import {AuthGuard} from '@nestjs/passport';

@Injectable()
export class LocalGuard extends AuthGuard('local') {
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const result: boolean = (await super.canActivate(context)) as boolean;

    if(result) {
      const request = context.switchToHttp().getRequest();
      const returnTo = request.session.returnTo;

      await super.logIn(context.switchToHttp().getRequest());
      request.session.returnTo = returnTo;
    }

    return result;
  }
}
