import { Prop, Schema } from "@nestjs/mongoose";
import { BaseDbObjectEntity } from "../../../../common/baseDbObject.entity";
import { ArticleComponentType } from "./articleComponentType.enum";
import { Language } from "../../../../language/domain/entities/language.entity";
import mongoose from "mongoose";

@Schema({timestamps: true})
export class ArticleComponentIntl extends BaseDbObjectEntity {

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: Language.name })
  language: Language;

  constructor(partial: Partial<ArticleComponentIntl>) {
    super();
    Object.assign(this as ArticleComponentIntl, partial);
  }
}