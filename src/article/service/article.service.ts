import { Injectable } from "@nestjs/common";
import { BaseService } from "../../common/baseService.service";
import { Article, ArticleDocument } from "../domain/entities/article.entity";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";

@Injectable()
export class ArticleService extends BaseService<ArticleDocument, Article> {
  constructor(@InjectModel(Article.name) private readonly articleModel: Model<ArticleDocument>) {
    super(articleModel, (data: ArticleDocument) => new Article(data));
  }
}
