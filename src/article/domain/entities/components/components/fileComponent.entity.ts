import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { ArticleComponentType } from "../articleComponentType.enum";
import { ArticleComponent } from "../articleComponent.entity";
import { ArticleComponentIntl } from "../articleComponentIntl.entity";

@Schema({ timestamps: true })
export class FileComponentIntl extends ArticleComponentIntl {
  @Prop()
  src: string;
}

@Schema()
export class FileComponent extends ArticleComponent {
  type: ArticleComponentType.FILE;

  @Prop({ type: [FileComponentIntl] })
  componentIntl: FileComponentIntl[];
}

export const FileComponentSchema = SchemaFactory.createForClass(FileComponent);
