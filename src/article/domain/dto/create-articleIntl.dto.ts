import { IsMongoId, IsNotEmpty, IsOptional, MaxLength } from "class-validator";
import { ArticleIntl } from "../entities/articleIntl.entity";
import { Types } from "mongoose";

export class CreateArticleIntlDto extends ArticleIntl {
  @MaxLength(150)
  @IsNotEmpty()
  title: string;

  @MaxLength(500)
  @IsOptional()
  description: string;

  @MaxLength(50)
  @IsNotEmpty()
  urlSlug: string;

  @IsMongoId()
  language: Types.ObjectId;
}