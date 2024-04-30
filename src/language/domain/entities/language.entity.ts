import { Document } from "mongoose";
import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { BaseDbObjectEntity } from "../../../common/baseDbObject.entity";

export type LanguageDocument = Language & Document;

@Schema({ timestamps: true })
export class Language extends BaseDbObjectEntity {
  @Prop({ required: true })
  code: string;

  @Prop()
  iconSrc: string;

  constructor(partial: Partial<Language>) {
    super();
    Object.assign(this as Language, partial);

  }
}

export const LanguageSchema = SchemaFactory.createForClass(Language);
