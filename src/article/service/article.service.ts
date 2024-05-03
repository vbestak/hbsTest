import { Injectable } from "@nestjs/common";
import { BaseService } from "../../common/baseService.service";
import { Article, ArticleDocument } from "../domain/entities/article.entity";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { CreateArticleDto } from "../domain/dto/create-article.dto";
import { UpdateArticleDto } from "../domain/dto/update-article.dto";

@Injectable()
export class ArticleService extends BaseService<ArticleDocument, Article, CreateArticleDto, UpdateArticleDto> {
  constructor(@InjectModel(Article.name) private readonly articleModel: Model<ArticleDocument>) {
    super(articleModel, (data: ArticleDocument) => new Article(data));
  }
}
