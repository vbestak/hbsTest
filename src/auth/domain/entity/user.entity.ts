import {Prop, Schema, SchemaFactory} from '@nestjs/mongoose';
import {Document} from 'mongoose';
import {Exclude} from 'class-transformer';
import {BaseDbObjectEntity} from "../../../common/baseDbObject.entity";
import {ApiHideProperty} from "@nestjs/swagger";

export type UserDocument = User & Document;

@Schema({timestamps: true})
export class User extends BaseDbObjectEntity{
    @Prop({unique: true, required: true})
    username: string;

    @Prop({unique: true, required: true})
    email: string;

    @ApiHideProperty()
    @Prop({required: true})
    @Exclude()
    password: string;

    constructor(partial: Partial<User>) {
        super();
        Object.assign(this, partial);
    }
}

export const UserSchema = SchemaFactory.createForClass(User);
