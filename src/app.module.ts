import { UsecasesProxyModule } from "./infrastructure/usecases-proxy/usecases-proxy.module";
import { EnvconfigModule } from "./infrastructure/config/envconfig.module";
import { Module } from "@nestjs/common";
import { ControllersModule } from "./infrastructure/controllers/controllers.module";
import { ExceptionsModule } from "./infrastructure/exceptions/exceptions.module";
import { LoggerModule } from "./infrastructure/logger/logger.module";
@Module({
  imports: [
    UsecasesProxyModule,
    ExceptionsModule,
    EnvconfigModule,
    ControllersModule,
    LoggerModule,
  ],
})
export class AppModule {}
