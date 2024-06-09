import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { ArticleComponentType } from "../articleComponentType.enum";
import { ArticleComponent } from "../articleComponent.entity";
import { ArticleComponentIntl } from "../articleComponentIntl.entity";

@Schema({ timestamps: true })
export class LinkComponentIntl extends ArticleComponentIntl {
  @Prop()
  link: string;
}

@Schema()
export class LinkComponent extends ArticleComponent {
  type: ArticleComponentType.LINK;

  @Prop({ type: [LinkComponentIntl] })
  componentIntl: LinkComponentIntl[];
}

export const LinkComponentSchema = SchemaFactory.createForClass(LinkComponent);
