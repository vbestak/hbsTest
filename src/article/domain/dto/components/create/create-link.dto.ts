import { IsEnum, IsMongoId, IsNotEmpty, MaxLength, ValidateNested } from "class-validator";
import { Language } from "../../../../../language/domain/entities/language.entity";
import { ArticleComponentType } from "../../../entities/components/articleComponentType.enum";
import { Type } from "class-transformer";
import { LinkComponent, LinkComponentIntl } from "../../../entities/components/components/linkComponent.entity";

export class CreateLinkComponentIntlDto extends LinkComponentIntl {
  @MaxLength(250)
  @IsNotEmpty()
  link: string;

  @IsMongoId()
  @IsNotEmpty()
  language: Language;
}

export class CreateLinkComponentDto extends LinkComponent {
  @IsEnum(ArticleComponentType)
  type: ArticleComponentType.LINK;

  order: number;
  enabled: boolean;

  @ValidateNested({ each: true })
  @Type(() => CreateLinkComponentIntlDto)
  componentIntl: CreateLinkComponentIntlDto[];
}