import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { ArticleComponentType } from "../articleComponentType.enum";
import { ArticleComponent } from "../articleComponent.entity";
import { ArticleComponentIntl } from "../articleComponentIntl.entity";

@Schema({ timestamps: true })
export class QuoteComponentIntl extends ArticleComponentIntl {
  @Prop()
  data: string;
}


@Schema()
export class QuoteComponent extends ArticleComponent {
  type: ArticleComponentType.QUOTE;

  @Prop({ type: [QuoteComponentIntl] })
  componentIntl: QuoteComponentIntl[];
}

export const QuoteComponentSchema = SchemaFactory.createForClass(QuoteComponent);
