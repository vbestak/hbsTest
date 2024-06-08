import { IsEnum, IsMongoId, IsNotEmpty, MaxLength, ValidateNested } from "class-validator";
import { Language } from "../../../../../language/domain/entities/language.entity";
import { ArticleComponentType } from "../../../entities/components/articleComponentType.enum";
import { Type } from "class-transformer";
import { QuoteComponent, QuoteComponentIntl } from "../../../entities/components/components/quoteComponent.entity";

export class CreateQuoteComponentIntlDto extends QuoteComponentIntl {
  @MaxLength(500)
  @IsNotEmpty()
  data: string;

  @IsMongoId()
  @IsNotEmpty()
  language: Language;
}

export class CreateQuoteComponentDto extends QuoteComponent {
  @IsEnum(ArticleComponentType)
  type: ArticleComponentType.QUOTE;

  order: number;
  enabled: boolean;

  @ValidateNested({ each: true })
  @Type(() => CreateQuoteComponentIntlDto)
  componentIntl: CreateQuoteComponentIntlDto[];
}