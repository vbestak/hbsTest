import {INestApplication} from "@nestjs/common";
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

export function useSwagger(app: INestApplication): void {
    const config = new DocumentBuilder()
        .setTitle('Blog')
        .setContact("Valentino Beštak", "", "valentino.bestak@gmail.com")
        .setVersion('0.1')
        .addBearerAuth()
        .build();
    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup('api', app, document, {});
}