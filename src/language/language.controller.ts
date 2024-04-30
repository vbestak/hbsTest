import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Render,
  Res,
  UseFilters,
  UseGuards,
  UseInterceptors
} from "@nestjs/common";
import { LanguageService } from "./service/language.service";
import { CreateLanguageDto } from "./domain/dto/create-language.dto";
import { UpdateLanguageDto } from "./domain/dto/update-language.dto";
import { BaseController } from "../common/baseController.controller";
import { Language, LanguageDocument } from "./domain/entities/language.entity";
import { ParseObjectIdPipe } from "../common/pipes/parseObjectId.pipe";
import { Types } from "mongoose";
import { AuthInfoInterceptor } from "../common/interceptors/authInfoInterceptor";
import { AuthenticatedGuard } from "../auth/guard/authenticated.guard";
import { ValidationExceptionFilter } from "../common/filters/validationExceptionFilter";
import { Response } from "express";

@Controller("admin/languages/")
@UseGuards(AuthenticatedGuard)
export class LanguageController extends BaseController<LanguageDocument, Language> {
  constructor(private readonly languageService: LanguageService) {
    super(languageService);
  }

  @Get("create")
  @UseInterceptors(AuthInfoInterceptor)
  @Render("admin/languages/create")
  async createView() {
  }

  @Get()
  @UseInterceptors(AuthInfoInterceptor)
  @Render("admin/languages/items")
  async findAll() {
    return await super.findAll();
  }

  @Post()
  @UseFilters(new ValidationExceptionFilter("admin/languages/create", "language"))
  async createNew(@Res() res: Response, @Body() createDto: CreateLanguageDto) {
    res.redirect("/admin/languages");
    return await super.create(createDto);
  }

  @Post(":id")
  @UseFilters(new ValidationExceptionFilter("admin/languages/update", "data"))
  async updateNew(@Res() res: Response, @Param("id", ParseObjectIdPipe) id: Types.ObjectId, @Body() updateDto: UpdateLanguageDto) {
    res.redirect("/admin/languages");
    return await super.update(id, updateDto);
  }

  @Get(":id")
  @UseInterceptors(AuthInfoInterceptor)
  @Render("admin/languages/update")
  async findOne(@Param("id", ParseObjectIdPipe) id: Types.ObjectId) {
    return await super.findOne(id);
  }
}
