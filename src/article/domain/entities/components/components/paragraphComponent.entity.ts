import { Prop, Schema } from "@nestjs/mongoose";
import { ArticleComponentType } from "../articleComponentType.enum";
import { ArticleComponent } from "../articleComponent.entity";
import { ArticleComponentIntl } from "../articleComponentIntl.entity";


@Schema({ timestamps: true })
export class ParagraphComponentIntl extends ArticleComponentIntl {
  @Prop()
  data: string;
}

@Schema()
export class ParagraphComponentEntity extends ArticleComponent {

  @Prop()
  type: ArticleComponentType.PARAGRAPH;

  @Prop({ type: [ParagraphComponentIntl] })
  componentIntl: ParagraphComponentIntl[];
}

