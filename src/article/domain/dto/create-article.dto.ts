import { ArticleComponent } from "../entities/components/articleComponent.entity";
import { IsBoolean, IsDate, IsNotEmpty, Max, MaxLength, ValidateNested } from "class-validator";
import { Type } from "class-transformer";
import { CreateArticleIntlDto } from "./create-articleIntl.dto";

export class CreateArticleDto {
  @MaxLength(120)
  @IsNotEmpty()
  name: string;

  @MaxLength(120)
  author: string;

  @MaxLength(250)
  coverImage: string;

  @Max(120)
  @IsNotEmpty()
  @Type(()=>Number)
  timeToRead: number;

  @ValidateNested({ each: true })
  @Type(() => CreateArticleIntlDto)
  articleIntl: CreateArticleIntlDto[];

  @ValidateNested({ each: true })
  @Type(() => ArticleComponent)
  components: ArticleComponent[];

  @IsBoolean()
  @Type(()=>Boolean)
  enabled: boolean;

  @IsDate()
  @Type(()=>Date)
  publishedAt: Date;

  @IsDate()
  @Type(()=>Date)
  scheduledAt: Date;
}
