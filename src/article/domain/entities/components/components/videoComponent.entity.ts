import { Prop, Schema } from "@nestjs/mongoose";
import { ArticleComponentType } from "../articleComponentType.enum";
import { ArticleComponent } from "../articleComponent.entity";
import { ArticleComponentIntl } from "../articleComponentIntl.entity";

@Schema()
export class VideoComponent extends ArticleComponent {

  @Prop()
  type: ArticleComponentType.VIDEO;

  @Prop({ type: [ArticleComponentIntl] })
  componentIntl: ArticleComponentIntl[];
}