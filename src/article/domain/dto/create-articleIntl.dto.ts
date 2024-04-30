import { Language } from "../../../language/domain/entities/language.entity";
import { IsOptional, MaxLength, MinLength } from "class-validator";
import { ArticleIntl } from "../entities/articleIntl.entity";

export class CreateArticleIntlDto extends ArticleIntl {
  @MaxLength(150)
  @MinLength(1)
  title: string;

  @MaxLength(500)
  @IsOptional()
  description: string;

  @MaxLength(50)
  @MinLength(1)
  urlSlug: string;

  language: Language;
}