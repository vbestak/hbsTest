import { ArticleComponentIntl } from "../../../entities/components/articleComponentIntl.entity";
import { ArticleComponentType } from "../../../entities/components/articleComponentType.enum";
import { Language } from "src/language/domain/entities/language.entity";
import { IsEnum, IsNotEmpty, MaxLength, ValidateNested } from "class-validator";
import { Type } from "class-transformer";
import { ParagraphComponentEntity } from "../../../entities/components/components/paragraphComponent.entity";


export class CreateParagraphComponentIntlDto extends ArticleComponentIntl {
  @MaxLength(1500)
  @IsNotEmpty()
  data: string;
  language: Language;
}

export class CreateParagraphComponentDto extends ParagraphComponentEntity {
  @IsEnum(ArticleComponentType)
  type: ArticleComponentType.PARAGRAPH;

  order: number;
  enabled: boolean;

  @ValidateNested({ each: true })
  @Type(() => CreateParagraphComponentIntlDto)
  componentIntl: CreateParagraphComponentIntlDto[];
}