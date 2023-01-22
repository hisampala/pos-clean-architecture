import { DynamicModule, Module } from "@nestjs/common";
import { UseCaseProxyReceiveProduct } from "src/infrastructure/contant";
import { ExceptionsModule } from "src/infrastructure/exceptions/exceptions.module";
import { PrismaService } from "src/infrastructure/service";
import {
  ReceiveProductUsecases,
  UpdateReceiveProductUsecases,
} from "src/usecases/receiveProduct";
import { GetReceiveProductListUsecase } from "src/usecases/receiveProduct/getReceiveProductList.usecases";
import { UseCaseProxy } from "../usescases-proxy";

@Module({
  imports: [ExceptionsModule],
  providers: [PrismaService],
})
export class ReceiveProductProxyModule {
  static register(): DynamicModule {
    return {
      module: ReceiveProductProxyModule,
      providers: [
        {
          provide: UseCaseProxyReceiveProduct.receiveProduct,
          inject: [PrismaService],
          useFactory: (context: PrismaService) =>
            new UseCaseProxy(new ReceiveProductUsecases(context)),
        },
        {
          provide: UseCaseProxyReceiveProduct.updateReceiveProduct,
          inject: [PrismaService],
          useFactory: (context: PrismaService) =>
            new UseCaseProxy(new UpdateReceiveProductUsecases(context)),
        },
        {
          provide: UseCaseProxyReceiveProduct.getReceiveProductList,
          inject: [PrismaService],
          useFactory: (context: PrismaService) =>
            new UseCaseProxy(new GetReceiveProductListUsecase(context)),
        },
      ],
      exports: [
        UseCaseProxyReceiveProduct.receiveProduct,
        UseCaseProxyReceiveProduct.updateReceiveProduct,
        UseCaseProxyReceiveProduct.getReceiveProductList,
      ],
    };
  }
}
