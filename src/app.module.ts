import { UsecasesProxyModule } from "./infrastructure/usecases-proxy/usecases-proxy.module";
import { EnvconfigModule } from "./infrastructure/config/envconfig.module";
import { MiddlewareConsumer, Module } from "@nestjs/common";
import { ControllersModule } from "./infrastructure/controllers/controllers.module";
import { ExceptionsModule } from "./infrastructure/exceptions/exceptions.module";
import { LoggerModule } from "./infrastructure/logger/logger.module";
import { RedisModule } from "@nestjs-modules/ioredis";
import { ConfigService } from "@nestjs/config";
import { CacheingService } from "./infrastructure/service/cache/cacheing.service";
@Module({
  imports: [
    UsecasesProxyModule,
    ExceptionsModule,
    EnvconfigModule,
    ControllersModule,
    LoggerModule,
    RedisModule.forRootAsync({
      useFactory: (conf: ConfigService) => ({
        config: {
          url: conf.get("CACHE_URL"),
          password: conf.get("CACHE_PASS"),
          lazyConnect: true,
          enableReadyCheck: true,
        },
      }),
      inject: [ConfigService],
    }),
  ],
  providers: [CacheingService],
})
export class AppModule {}
