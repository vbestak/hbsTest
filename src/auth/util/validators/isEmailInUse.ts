import { registerDecorator, ValidationArguments, ValidatorConstraint, ValidatorConstraintInterface } from 'class-validator';
import { Injectable } from '@nestjs/common';
import {UserService} from "../../service/user.service";

@ValidatorConstraint({ async: true })
@Injectable()
export class IsEmailInUseConstraint implements ValidatorConstraintInterface {
    constructor(private readonly userService: UserService) {}

    async validate(email: string, args: ValidationArguments): Promise<boolean> {
        const user = await this.userService.findByEmail(email);
        return !user;
    }

    defaultMessage(args: ValidationArguments): string {
        return 'Email $value is already in use.';
    }
}

export function IsEmailInUse(): PropertyDecorator {
    return function (object: Object, propertyName: string): void {
        registerDecorator({
            target: object.constructor,
            propertyName: propertyName.toString(),
            options: {},
            constraints: [],
            validator: IsEmailInUseConstraint,
        });
    };
}