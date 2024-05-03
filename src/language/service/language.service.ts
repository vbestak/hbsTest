import { Injectable } from "@nestjs/common";
import { BaseService } from "../../common/baseService.service";
import { Language, LanguageDocument } from "../domain/entities/language.entity";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { CreateLanguageDto } from "../domain/dto/create-language.dto";
import { UpdateLanguageDto } from "../domain/dto/update-language.dto";

@Injectable()
export class LanguageService extends BaseService<LanguageDocument, Language, CreateLanguageDto, UpdateLanguageDto> {
  constructor(@InjectModel(Language.name) private readonly languageModel: Model<LanguageDocument>) {
    super(languageModel, (data: LanguageDocument) => new Language(data));
  }
}
