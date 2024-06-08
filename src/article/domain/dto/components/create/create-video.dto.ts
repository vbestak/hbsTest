import { IsEnum, IsMongoId, IsNotEmpty, MaxLength, ValidateNested } from "class-validator";
import { Language } from "../../../../../language/domain/entities/language.entity";
import { ArticleComponentType } from "../../../entities/components/articleComponentType.enum";
import { Type } from "class-transformer";
import { VideoComponent, VideoComponentIntl } from "../../../entities/components/components/videoComponent.entity";

export class CreateVideoComponentIntlDto extends VideoComponentIntl {
  @MaxLength(250)
  @IsNotEmpty()
  src: string;

  @IsMongoId()
  @IsNotEmpty()
  language: Language;
}

export class CreateVideoComponentDto extends VideoComponent {
  @IsEnum(ArticleComponentType)
  type: ArticleComponentType.VIDEO;

  order: number;
  enabled: boolean;

  @ValidateNested({ each: true })
  @Type(() => CreateVideoComponentIntlDto)
  componentIntl: CreateVideoComponentIntlDto[];
}