import { Injectable } from "@nestjs/common";
import { User } from "../domain/entity/user.entity";
import { UserService } from "./user.service";
import { PassportSerializer } from '@nestjs/passport';

@Injectable()
export class SessionSerializerService extends PassportSerializer {
  constructor(private userService: UserService) {
    super()
  }

  serializeUser(user: User, done: (err: Error, user: UserSerializationPayload) => void) {
    done(null, {_id: user._id.toString()});
  }

  async deserializeUser(
    payload: UserSerializationPayload,
    done: (err: Error, payload: User) => void
  ) {
    const user = await this.userService.findById(payload._id);

    done(null, user);
  }
}

interface UserSerializationPayload {
  _id: string;
}
