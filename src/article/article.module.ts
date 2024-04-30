import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { Article, ArticleSchema } from "./domain/entities/article.entity";
import { ArticleController } from "./article.controller";
import { ArticleService } from "./service/article.service";

@Module({
  imports: [MongooseModule.forFeature([{
    name: Article.name,
    schema: ArticleSchema
  }])],
  controllers: [ArticleController],
  providers: [ArticleService]
})
export class ArticleModule {
}
