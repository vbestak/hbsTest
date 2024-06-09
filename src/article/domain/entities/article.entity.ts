import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { BaseDbObjectEntity } from "../../../common/baseDbObject.entity";
import { Document, Schema as MongooseSchema } from "mongoose";
import { ArticleIntl, ArticleIntlSchema } from "./articleIntl.entity";
import { ArticleComponent, ArticleComponentSchema } from "./components/articleComponent.entity";
import { ArticleComponentType } from "./components/articleComponentType.enum";
import { ParagraphComponentSchema } from "./components/components/paragraphComponent.entity";
import { FileComponentSchema } from "./components/components/fileComponent.entity";
import { LinkComponentSchema } from "./components/components/linkComponent.entity";
import { VideoComponentSchema } from "./components/components/videoComponent.entity";
import { ImageComponentSchema } from "./components/components/imageComponent.entity";
import { QuoteComponentSchema } from "./components/components/quoteComponent.entity";
import { QuestionnaireComponentSchema } from "./components/components/questionnaireComponent.entity";

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

const articleComponentSchema = ArticleSchema.path<MongooseSchema.Types.Subdocument>("components");
articleComponentSchema.discriminator(ArticleComponentType.PARAGRAPH, ParagraphComponentSchema);
articleComponentSchema.discriminator(ArticleComponentType.FILE, FileComponentSchema);
articleComponentSchema.discriminator(ArticleComponentType.LINK, LinkComponentSchema);
articleComponentSchema.discriminator(ArticleComponentType.VIDEO, VideoComponentSchema);
articleComponentSchema.discriminator(ArticleComponentType.IMAGE, ImageComponentSchema);
articleComponentSchema.discriminator(ArticleComponentType.QUOTE, QuoteComponentSchema);
articleComponentSchema.discriminator(ArticleComponentType.QUESTIONNAIRE, QuestionnaireComponentSchema);
