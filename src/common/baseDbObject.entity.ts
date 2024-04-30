import {classToPlain, Exclude, Expose, Transform} from "class-transformer";
import {IsOptional} from "class-validator";
import mongoose from "mongoose";
import {ApiHideProperty, ApiProperty} from "@nestjs/swagger";

export class BaseDbObjectEntity {
    @ApiProperty({type: "string", name: "id"})
    @Expose({ name: 'id' })
    @Transform(({ value }) => value.toString(), { toPlainOnly: true })
    _id: mongoose.Schema.Types.ObjectId;

    @ApiHideProperty()
    @Exclude()
    @IsOptional()
    _v: number;

    createdAt: Date;

    updatedAt: Date;

    toJSON() {
        return classToPlain(this);
    }

    toString() {
        return JSON.stringify(this.toJSON());
    }
}