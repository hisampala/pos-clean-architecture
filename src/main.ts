import { ConfigService } from "@nestjs/config";
import { NestFactory } from "@nestjs/core";
import {
  NestFastifyApplication,
  FastifyAdapter,
} from "@nestjs/platform-fastify";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";
import { AppModule } from "./app.module";
import { LoggingInterceptor } from "./infrastructure/interceptors/logger.interceptor";
import { ResponseInterceptor } from "./infrastructure/interceptors/response.interceptor";
import { LoggerService } from "./infrastructure/logger/logger.service";

async function bootstrap() {
  const conf = new ConfigService();
  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyAdapter({
      logger: false,
    }),
  );
  app.useGlobalInterceptors(new LoggingInterceptor(new LoggerService()));
  app.useGlobalInterceptors(new ResponseInterceptor());
  app.setGlobalPrefix("api");
  await startSwagger(app);
  await app.listen(conf.get("PORT") ? conf.get("PORT") : 3333, "0.0.0.0");
}

bootstrap();
async function startSwagger(app: NestFastifyApplication) {
  const config = new DocumentBuilder()
    .setTitle("Pos Api")
    .setDescription("The Pos API description")
    .setVersion("1.0")
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup("doc", app, document);
}
