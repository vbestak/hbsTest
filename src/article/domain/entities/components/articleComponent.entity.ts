import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { BaseDbObjectEntity } from "../../../../common/baseDbObject.entity";
import { ArticleComponentType } from "./articleComponentType.enum";
import { ArticleComponentIntl } from "./articleComponentIntl.entity";
import { Document } from "mongoose";

export type ArticleComponentDocument = ArticleComponent & Document;

@Schema({ timestamps: true })
export class ArticleComponent extends BaseDbObjectEntity {
  @Prop()
  type: ArticleComponentType;

  @Prop()
  order: number;

  @Prop()
  enabled: boolean;

  @Prop({ type: [ArticleComponentIntl] })
  componentIntl: ArticleComponentIntl[];

  constructor(partial: Partial<ArticleComponent>) {
    super();
    Object.assign(this as ArticleComponent, partial);

    this.componentIntl = this.componentIntl || [];
    this.componentIntl = this.componentIntl.map(intl => new ArticleComponentIntl(intl));
  }
}

export const ArticleComponentSchema = SchemaFactory.createForClass(ArticleComponent);