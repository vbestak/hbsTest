import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { ArticleComponentType } from "../articleComponentType.enum";
import { ArticleComponent } from "../articleComponent.entity";
import { ArticleComponentIntl } from "../articleComponentIntl.entity";


@Schema({ timestamps: true })
export class ParagraphComponentIntl extends ArticleComponentIntl {
  @Prop()
  data: string;
}

@Schema()
export class ParagraphComponent extends ArticleComponent {
  type: ArticleComponentType.PARAGRAPH;

  @Prop({ type: [ParagraphComponentIntl] })
  componentIntl: ParagraphComponentIntl[];
}

export const ParagraphComponentSchema = SchemaFactory.createForClass(ParagraphComponent);

