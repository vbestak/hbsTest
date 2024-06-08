import { IsEnum, IsMongoId, IsNotEmpty, MaxLength, ValidateNested } from "class-validator";
import { Language } from "../../../../../language/domain/entities/language.entity";
import { ArticleComponentType } from "../../../entities/components/articleComponentType.enum";
import { Type } from "class-transformer";
import { FileComponent, FileComponentIntl } from "../../../entities/components/components/fileComponent.entity";

export class CreateFileComponentIntlDto extends FileComponentIntl {
  @MaxLength(250)
  @IsNotEmpty()
  src: string;

  @IsMongoId()
  @IsNotEmpty()
  language: Language;
}

export class CreateFileComponentDto extends FileComponent {
  @IsEnum(ArticleComponentType)
  type: ArticleComponentType.FILE;

  order: number;
  enabled: boolean;

  @ValidateNested({ each: true })
  @Type(() => CreateFileComponentIntlDto)
  componentIntl: CreateFileComponentIntlDto[];
}