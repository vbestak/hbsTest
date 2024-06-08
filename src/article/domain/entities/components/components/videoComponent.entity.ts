import { Prop, Schema } from "@nestjs/mongoose";
import { ArticleComponentType } from "../articleComponentType.enum";
import { ArticleComponent } from "../articleComponent.entity";
import { ArticleComponentIntl } from "../articleComponentIntl.entity";

@Schema({ timestamps: true })
export class VideoComponentIntl extends ArticleComponentIntl {
  @Prop()
  src: string;
}

@Schema()
export class VideoComponent extends ArticleComponent {

  @Prop()
  type: ArticleComponentType.VIDEO;

  @Prop({ type: [VideoComponentIntl] })
  componentIntl: VideoComponentIntl[];
}