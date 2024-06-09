import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { ArticleComponentType } from "../articleComponentType.enum";
import { ArticleComponent } from "../articleComponent.entity";
import { ArticleComponentIntl } from "../articleComponentIntl.entity";

@Schema({ timestamps: true })
export class ImageComponentIntl extends ArticleComponentIntl {
  @Prop()
  src: string;
}

@Schema()
export class ImageComponent extends ArticleComponent {
  type: ArticleComponentType.IMAGE;

  @Prop({ type: [ImageComponentIntl] })
  componentIntl: ImageComponentIntl[];
}

export const ImageComponentSchema = SchemaFactory.createForClass(ImageComponent);
