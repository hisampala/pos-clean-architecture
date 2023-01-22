import { DynamicModule, Module } from "@nestjs/common";
import { UseCaseProxyOrder } from "src/infrastructure/contant";
import { ExceptionsModule } from "src/infrastructure/exceptions/exceptions.module";
import { PrismaService } from "src/infrastructure/service";
import { CacheingService } from "src/infrastructure/service/cache/cacheing.service";
import {
  CreateOrderUsecases,
  DeleteOrderUsecases,
  getOrderItemUsecases,
  GetOrderListUsecases,
  UpdateOrderUsecases,
} from "src/usecases/orders";
import { UseCaseProxy } from "../usescases-proxy";
@Module({
  imports: [ExceptionsModule],
  providers: [PrismaService, CacheingService],
})
export class OrdersProxyModule {
  static register(): DynamicModule {
    return {
      module: OrdersProxyModule,
      providers: [
        {
          provide: UseCaseProxyOrder.creatOrderProxy,
          inject: [PrismaService, CacheingService],
          useFactory: (context: PrismaService, cache: CacheingService) =>
            new UseCaseProxy(new CreateOrderUsecases(context, cache)),
        },
        {
          provide: UseCaseProxyOrder.updateOrderProxy,
          inject: [PrismaService, CacheingService],
          useFactory: (context: PrismaService, cache: CacheingService) =>
            new UseCaseProxy(new UpdateOrderUsecases(context, cache)),
        },
        {
          provide: UseCaseProxyOrder.deleteOrderProxy,
          inject: [PrismaService, CacheingService],
          useFactory: (context: PrismaService, cache: CacheingService) =>
            new UseCaseProxy(new DeleteOrderUsecases(context, cache)),
        },
        {
          provide: UseCaseProxyOrder.getItemOrderProxy,
          inject: [PrismaService, CacheingService],
          useFactory: (context: PrismaService, cache: CacheingService) =>
            new UseCaseProxy(new getOrderItemUsecases(context, cache)),
        },
        {
          provide: UseCaseProxyOrder.getListOrderProxy,
          inject: [PrismaService, CacheingService],
          useFactory: (context: PrismaService, cache: CacheingService) =>
            new UseCaseProxy(new GetOrderListUsecases(context, cache)),
        },
      ],
      exports: [
        UseCaseProxyOrder.creatOrderProxy,
        UseCaseProxyOrder.updateOrderProxy,
        UseCaseProxyOrder.deleteOrderProxy,
        UseCaseProxyOrder.getItemOrderProxy,
        UseCaseProxyOrder.getListOrderProxy,
      ],
    };
  }
}
