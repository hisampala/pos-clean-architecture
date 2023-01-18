import { Module } from "@nestjs/common";
import { EvnconfigService } from "./evnconfig.service";
import { ConfigModule } from "@nestjs/config";
import { validateEnv } from "./evnconfig.validate";
@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: "./env",
      isGlobal: true,
      validate: validateEnv,
    }),
  ],
  providers: [EvnconfigService],
  exports: [EvnconfigService],
})
export class EnvconfigModule {}
