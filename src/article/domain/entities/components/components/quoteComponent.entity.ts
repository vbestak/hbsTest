import { Prop, Schema } from "@nestjs/mongoose";
import { ArticleComponentType } from "../articleComponentType.enum";
import { ArticleComponent } from "../articleComponent.entity";
import { ArticleComponentIntl } from "../articleComponentIntl.entity";

@Schema()
export class QuoteComponent extends ArticleComponent {

  @Prop()
  type: ArticleComponentType.QUOTE;

  @Prop({ type: [ArticleComponentIntl] })
  componentIntl: ArticleComponentIntl[];
}