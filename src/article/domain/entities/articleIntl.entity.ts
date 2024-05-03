import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { BaseDbObjectEntity } from "../../../common/baseDbObject.entity";
import { Language } from "../../../language/domain/entities/language.entity";
import mongoose, { Types } from "mongoose";

@Schema({timestamps: true})
export class ArticleIntl extends BaseDbObjectEntity {
  @Prop()
  title: string;

  @Prop()
  description: string;

  @Prop({ unique: true })
  urlSlug: string;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: Language.name })
  language: Language | Types.ObjectId;

  constructor(partial: Partial<ArticleIntl>) {
    super();
    Object.assign(this as ArticleIntl, partial);
  }
}

export const ArticleIntlSchema = SchemaFactory.createForClass(ArticleIntl);