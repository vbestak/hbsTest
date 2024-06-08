import { ArticleComponent } from "../entities/components/articleComponent.entity";
import { IsBoolean, IsDate, IsNotEmpty, IsOptional, Max, MaxLength, ValidateNested } from "class-validator";
import { Transform, Type } from "class-transformer";
import { CreateArticleIntlDto } from "./create-articleIntl.dto";
import { ArticleDocument } from "../entities/article.entity";
import { CreateParagraphComponentDto } from "./components/create/create-paragraph.dto";
import { ArticleComponentType } from "../entities/components/articleComponentType.enum";
import { CreateFileComponentDto } from "./components/create/create-file.dto";
import { CreateImageComponentDto } from "./components/create/create-image.dto";
import { CreateLinkComponentDto } from "./components/create/create-link.dto";
import { CreateQuoteComponentDto } from "./components/create/create-quote.dto";
import { CreateVideoComponentDto } from "./components/create/create-video.dto";

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
  @Type(() => CreateParagraphComponentDto, {
    discriminator: {
      property: "type",
      subTypes: [{
          name: ArticleComponentType.FILE,
          value: CreateFileComponentDto
        },
        {
          name: ArticleComponentType.IMAGE,
          value: CreateImageComponentDto
        },
        {
          name: ArticleComponentType.LINK,
          value: CreateLinkComponentDto
        },
        {
          name: ArticleComponentType.PARAGRAPH,
          value: CreateParagraphComponentDto
        },
        {
          name: ArticleComponentType.QUOTE,
          value: CreateQuoteComponentDto
        },
        {
          name: ArticleComponentType.VIDEO,
          value: CreateVideoComponentDto
        },
      ]
    },
    keepDiscriminatorProperty: true
  })
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
