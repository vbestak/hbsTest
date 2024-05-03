import { ArticleComponent } from "../entities/components/articleComponent.entity";
import { IsBoolean, IsDate, IsNotEmpty, IsOptional, Max, MaxLength, ValidateNested } from "class-validator";
import { Transform, Type } from "class-transformer";
import { CreateArticleIntlDto } from "./create-articleIntl.dto";
import { ArticleDocument } from "../entities/article.entity";

export class CreateArticleDto implements Partial<ArticleDocument> {
  @MaxLength(120)
  @IsNotEmpty()
  name: string;

  @MaxLength(120)
  @IsNotEmpty()
  author: string;

  @MaxLength(250)
  @IsNotEmpty()
  coverImage: string;

  @Max(120)
  @IsNotEmpty()
  @Type(() => Number)
  timeToRead: number;

  @ValidateNested({ each: true })
  @Type(() => CreateArticleIntlDto)
  articleIntl: CreateArticleIntlDto[];

  @ValidateNested({ each: true })
  @Type(() => ArticleComponent)
  components: ArticleComponent[];

  @IsBoolean()
  @IsOptional()
  @Type(() => Boolean)
  enabled: boolean = false;

  @IsDate()
  @Type(() => Date)
  @Transform((params) => {
    const date = params.value;

    if (date.toString() !== "Invalid Date")
      return date.toISOString().slice(0, 16);
  }, { toPlainOnly: true })
  scheduledAt: Date;
}
