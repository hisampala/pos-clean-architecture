import { DynamicModule, Module } from "@nestjs/common";
import { UseCaseProxyOrder } from "src/infrastructure/contant";
import { ExceptionsModule } from "src/infrastructure/exceptions/exceptions.module";
import { PrismaService } from "src/infrastructure/service";
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
  providers: [PrismaService],
})
export class OrdersProxyModule {
  static register(): DynamicModule {
    return {
      module: OrdersProxyModule,
      providers: [
        {
          provide: UseCaseProxyOrder.creatOrderProxy,
          inject: [PrismaService],
          useFactory: (context: PrismaService) =>
            new UseCaseProxy(new CreateOrderUsecases(context)),
        },
        {
          provide: UseCaseProxyOrder.updateOrderProxy,
          inject: [PrismaService],
          useFactory: (context: PrismaService) =>
            new UseCaseProxy(new UpdateOrderUsecases(context)),
        },
        {
          provide: UseCaseProxyOrder.deleteOrderProxy,
          inject: [PrismaService],
          useFactory: (context: PrismaService) =>
            new UseCaseProxy(new DeleteOrderUsecases(context)),
        },
        {
          provide: UseCaseProxyOrder.getItemOrderProxy,
          inject: [PrismaService],
          useFactory: (context: PrismaService) =>
            new UseCaseProxy(new getOrderItemUsecases(context)),
        },
        {
          provide: UseCaseProxyOrder.getListOrderProxy,
          inject: [PrismaService],
          useFactory: (context: PrismaService) =>
            new UseCaseProxy(new GetOrderListUsecases(context)),
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
