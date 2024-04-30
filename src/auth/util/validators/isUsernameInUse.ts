import { registerDecorator, ValidationArguments, ValidatorConstraint, ValidatorConstraintInterface } from 'class-validator';
import { Injectable } from '@nestjs/common';
import {UserService} from "../../service/user.service";

@ValidatorConstraint({ async: true })
@Injectable()
export class IsUsernameInUseConstraint implements ValidatorConstraintInterface {
    constructor(private readonly userService: UserService) {}

    async validate(username: string, args: ValidationArguments): Promise<boolean> {
        const user = await this.userService.findByUsername(username);
        return !user;
    }

    defaultMessage(args: ValidationArguments): string {
        return 'Username $value is already in use.';
    }
}

export function IsUsernameInUse(): PropertyDecorator {
    return function (object: Object, propertyName: string): void {
        registerDecorator({
            target: object.constructor,
            propertyName: propertyName.toString(),
            options: {},
            constraints: [],
            validator: IsUsernameInUseConstraint,
        });
    };
}