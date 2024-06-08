import { IsEnum, IsMongoId, IsNotEmpty, MaxLength, ValidateNested } from "class-validator";
import { Language } from "../../../../../language/domain/entities/language.entity";
import { ArticleComponentType } from "../../../entities/components/articleComponentType.enum";
import { Type } from "class-transformer";
import { ImageComponent, ImageComponentIntl } from "../../../entities/components/components/imageComponent.entity";

export class CreateImageComponentIntlDto extends ImageComponentIntl {
  @MaxLength(250)
  @IsNotEmpty()
  src: string;

  @IsMongoId()
  @IsNotEmpty()
  language: Language;
}

export class CreateImageComponentDto extends ImageComponent {
  @IsEnum(ArticleComponentType)
  type: ArticleComponentType.IMAGE;

  order: number;
  enabled: boolean;

  @ValidateNested({ each: true })
  @Type(() => CreateImageComponentIntlDto)
  componentIntl: CreateImageComponentIntlDto[];
}