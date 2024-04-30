import {Module} from '@nestjs/common';
import {LanguageService} from './service/language.service';
import {LanguageController} from './language.controller';
import {MongooseModule} from '@nestjs/mongoose';
import {Language, LanguageSchema} from "./domain/entities/language.entity";

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Language.name, schema: LanguageSchema }]),
  ],
  controllers: [LanguageController],
  providers: [LanguageService],
})
export class LanguageModule {}
