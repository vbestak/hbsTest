import { Body, Controller, Get, Param, Post, Render, Req, Res, UseGuards } from "@nestjs/common";
import { ArticleService } from "./service/article.service";
import { ParseObjectIdPipe } from "../common/pipes/parseObjectId.pipe";
import { Types } from "mongoose";
import { CreateArticleDto } from "./domain/dto/create-article.dto";
import { UpdateArticleDto } from "./domain/dto/update-article.dto";
import { Request, Response } from "express";
import { AuthenticatedGuard } from "../auth/guard/authenticated.guard";
import { validate } from "../util/validation/validate";
import { LanguageService } from "../language/service/language.service";

@Controller("admin/articles")
@UseGuards(AuthenticatedGuard)
export class ArticleController {
  constructor(private readonly articleService: ArticleService,
              private readonly languageService: LanguageService) {
  }

  @Get("create")
  @Render("admin/articles/create")
  async createView() {
    const languages = await this.languageService.findAll();

    return { languages };
  }

  @Get()
  @Render("admin/articles/items")
  async findAll() {
    const data = await this.articleService.findAll();
    return { data };
  }

  @Post()
  async create(@Req() req: Request, @Res() res: Response, @Body() createDto: CreateArticleDto) {
    const errors = await validate(createDto);

    if (errors) {
      const languages = await this.languageService.findAll();

      return res.render("admin/articles/create", {
        errors,
        article: createDto,
        isAuthenticated: req.isAuthenticated(),
        languages,
        url: req.url,
      });
    }

    const result = await this.articleService.create(createDto);
    res.redirect("/admin/articles");

    return result;
  }

  @Post("update/:id")
  async update(@Req() req: Request, @Res() res: Response, @Param("id", ParseObjectIdPipe) id: Types.ObjectId, @Body() updateDto: UpdateArticleDto) {
    const errors = await validate(updateDto);

    if (errors) {
      return res.render("admin/articles/update", {
        errors,
        data: updateDto,
        isAuthenticated: req.isAuthenticated(),
        url: req.url
      });
    }

    const result = await this.articleService.update(id, updateDto);
    res.redirect("/admin/articles");

    return result;
  }

  @Post("delete/:id")
  @Render("admin/articles/items")
  async remove(@Param("id", ParseObjectIdPipe) id: Types.ObjectId) {
    await this.articleService.delete(id);

    const data = await this.articleService.findAll();
    return { data };
  }

  @Get(":id")
  @Render("admin/articles/update")
  async findOne(@Param("id", ParseObjectIdPipe) id: Types.ObjectId) {
    const data = await this.articleService.findById(id);
    return { data };
  }
}