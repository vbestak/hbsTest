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
import { Article, ArticleDocument } from "./domain/entities/article.entity";
import { ArticleService } from "./service/article.service";
import { BaseController } from "../common/baseController.controller";
import { ParseObjectIdPipe } from "../common/pipes/parseObjectId.pipe";
import { Types } from "mongoose";
import { CreateArticleDto } from "./domain/dto/create-article.dto";
import { UpdateArticleDto } from "./domain/dto/update-article.dto";
import { AuthInfoInterceptor } from "../common/interceptors/authInfoInterceptor";
import { ValidationExceptionFilter } from "../common/filters/validationExceptionFilter";
import { Response } from "express";
import { AuthenticatedGuard } from "../auth/guard/authenticated.guard";

@Controller("admin/articles")
@UseGuards(AuthenticatedGuard)
export class ArticleController extends BaseController<ArticleDocument, Article> {
  constructor(private readonly articleService: ArticleService) {
    super(articleService);
  }

  @Get("create")
  @UseInterceptors(AuthInfoInterceptor)
  @Render("admin/articles/create")
  async createView() {
  }

  @Get()
  @UseInterceptors(AuthInfoInterceptor)
  @Render("admin/articles/items")
  async findAll() {
    return await super.findAll();
  }

  @Post()
  @UseFilters(new ValidationExceptionFilter("admin/articles/create", "article"))
  async createNew(@Res() res: Response, @Body() createDto: CreateArticleDto) {
    res.redirect("/admin/articles");
    return await super.create(createDto);
  }

  @Post(":id")
  @UseFilters(new ValidationExceptionFilter("admin/articles/update", "data"))
  async updateNew(@Res() res: Response, @Param("id", ParseObjectIdPipe) id: Types.ObjectId, @Body() updateDto: UpdateArticleDto) {
    res.redirect("/admin/articles");
    return await super.update(id, updateDto);
  }

  @Get(":id")
  @UseInterceptors(AuthInfoInterceptor)
  @Render("admin/articles/update")
  async findOne(@Param("id", ParseObjectIdPipe) id: Types.ObjectId) {
    return await super.findOne(id);
  }
}