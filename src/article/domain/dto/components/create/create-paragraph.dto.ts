import { ArticleComponentType } from "../../../entities/components/articleComponentType.enum";
import { Language } from "src/language/domain/entities/language.entity";
import { IsEnum, IsMongoId, IsNotEmpty, MaxLength, ValidateNested } from "class-validator";
import { Type } from "class-transformer";
import {
  ParagraphComponent,
  ParagraphComponentIntl
} from "../../../entities/components/components/paragraphComponent.entity";


export class CreateParagraphComponentIntlDto extends ParagraphComponentIntl {
  @MaxLength(1500)
  @IsNotEmpty()
  data: string;

  @IsMongoId()
  @IsNotEmpty()
  language: Language;
}

export class CreateParagraphComponentDto extends ParagraphComponent {
  @IsEnum(ArticleComponentType)
  type: ArticleComponentType.PARAGRAPH;

  order: number;
  enabled: boolean;

  @ValidateNested({ each: true })
  @Type(() => CreateParagraphComponentIntlDto)
  componentIntl: CreateParagraphComponentIntlDto[];
}