import { Body, Controller, Get, Param, Post, Render, Req, Res, UseGuards } from "@nestjs/common";
import { LanguageService } from "./service/language.service";
import { CreateLanguageDto } from "./domain/dto/create-language.dto";
import { UpdateLanguageDto } from "./domain/dto/update-language.dto";
import { ParseObjectIdPipe } from "../common/pipes/parseObjectId.pipe";
import { Types } from "mongoose";
import { AuthenticatedGuard } from "../auth/guard/authenticated.guard";
import { Request, Response } from "express";
import { validate } from "../util/validation/validate";

@Controller("admin/languages/")
@UseGuards(AuthenticatedGuard)
export class LanguageController {
  constructor(private readonly languageService: LanguageService) {
  }

  @Get("create")
  @Render("admin/languages/create")
  async createView() {
  }

  @Get()
  @Render("admin/languages/items")
  async findAll() {
    const data = await this.languageService.findAll();
    return { data };
  }

  @Post()
  async create(@Req() req: Request, @Res() res: Response, @Body() createDto: CreateLanguageDto) {
    const errors = await validate(createDto);

    if (errors) {
      return res.render("admin/languages/create", {
        errors,
        language: createDto,
        isAuthenticated: req.isAuthenticated(),
        url: req.url
      });
    }

    const result = await this.languageService.create(createDto);
    res.redirect("/admin/languages");

    return result;
  }

  @Post("update/:id")
  async update(@Req() req: Request, @Res() res: Response, @Param("id", ParseObjectIdPipe) id: Types.ObjectId, @Body() updateDto: UpdateLanguageDto) {
    const errors = await validate(updateDto);

    if (errors) {
      return res.render("admin/languages/update", {
        errors,
        data: updateDto,
        isAuthenticated: req.isAuthenticated(),
        url: req.url
      });
    }

    const result = await this.languageService.update(id, updateDto);
    res.redirect("/admin/languages");

    return result;
  }

  @Post("delete/:id")
  @Render("admin/languages/items")
  async remove(@Param("id", ParseObjectIdPipe) id: Types.ObjectId) {
    await this.languageService.delete(id);

    const data = await this.languageService.findAll();
    return { data };
  }

  @Get(":id")
  @Render("admin/languages/update")
  async findOne(@Param("id", ParseObjectIdPipe) id: Types.ObjectId) {
    const data = await this.languageService.findById(id);
    return { data };
  }
}
