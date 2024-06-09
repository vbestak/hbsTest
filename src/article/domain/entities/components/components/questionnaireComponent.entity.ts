import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { ArticleComponentType } from "../articleComponentType.enum";
import { ArticleComponent } from "../articleComponent.entity";
import { ArticleComponentIntl } from "../articleComponentIntl.entity";

@Schema()
export class QuestionnaireComponent extends ArticleComponent {
  type: ArticleComponentType.QUESTIONNAIRE;

  @Prop({ type: [ArticleComponentIntl] })
  componentIntl: ArticleComponentIntl[];
}

export const QuestionnaireComponentSchema = SchemaFactory.createForClass(QuestionnaireComponent);
