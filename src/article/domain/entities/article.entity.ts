import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { BaseDbObjectEntity } from "../../../common/baseDbObject.entity";
import { Document } from "mongoose";
import { ArticleIntl, ArticleIntlSchema } from "./articleIntl.entity";
import { ArticleComponent, ArticleComponentSchema } from "./components/articleComponent.entity";

export type ArticleDocument = Article & Document;

@Schema({ timestamps: true })
export class Article extends BaseDbObjectEntity {

  @Prop()
  name: string;

  @Prop()
  author: string;

  @Prop()
  coverImage: string;

  @Prop()
  timeToRead: number;

  @Prop({ type: [ArticleIntlSchema] })
  articleIntl: ArticleIntl[];

  @Prop({ type: [ArticleComponentSchema] })
  components: ArticleComponent[];

  @Prop()
  enabled: boolean;

  @Prop({ isRequired: false })
  publishedAt?: Date;

  @Prop()
  scheduledAt: Date;

  constructor(partial: Partial<Article>) {
    super();
    Object.assign(this as Article, partial);

    this.components = this.components || [];
    this.components = this.components.map(component => new ArticleComponent(component));

    this.articleIntl = this.articleIntl || [];
    this.articleIntl = this.articleIntl.map(intl => new ArticleIntl(intl));
  }
}

export const ArticleSchema = SchemaFactory.createForClass(Article);