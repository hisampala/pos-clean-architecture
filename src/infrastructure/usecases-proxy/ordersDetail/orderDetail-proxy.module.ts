import { DynamicModule, Module } from "@nestjs/common";
import { UseCaseProxyOrderDetail } from "src/infrastructure/contant";
import { ExceptionsModule } from "src/infrastructure/exceptions/exceptions.module";
import { PrismaService } from "src/infrastructure/service";
import {
  CreateOrderDetailUsecases,
  UpdateOrderDetailUsecases,
  DeleteOrderDetailUsecases,
  getOrderDetailItemUsecases,
  GetOrderDetailListUsecases,
} from "src/usecases/orderDetail";

import { UseCaseProxy } from "../usescases-proxy";
@Module({
  imports: [ExceptionsModule],
  providers: [PrismaService],
})
export class OrderDetailProxyModule {
  static register(): DynamicModule {
    return {
      module: OrderDetailProxyModule,
      providers: [
        {
          provide: UseCaseProxyOrderDetail.creatOrderDetailProxy,
          inject: [PrismaService],
          useFactory: (context: PrismaService) =>
            new UseCaseProxy(new CreateOrderDetailUsecases(context)),
        },
        {
          provide: UseCaseProxyOrderDetail.updateOrderDetailProxy,
          inject: [PrismaService],
          useFactory: (context: PrismaService) =>
            new UseCaseProxy(new UpdateOrderDetailUsecases(context)),
        },
        {
          provide: UseCaseProxyOrderDetail.deleteOrderDetailProxy,
          inject: [PrismaService],
          useFactory: (context: PrismaService) =>
            new UseCaseProxy(new DeleteOrderDetailUsecases(context)),
        },
        {
          provide: UseCaseProxyOrderDetail.getItemOrderDetailProxy,
          inject: [PrismaService],
          useFactory: (context: PrismaService) =>
            new UseCaseProxy(new getOrderDetailItemUsecases(context)),
        },
        {
          provide: UseCaseProxyOrderDetail.getListOrderDetailProxy,
          inject: [PrismaService],
          useFactory: (context: PrismaService) =>
            new UseCaseProxy(new GetOrderDetailListUsecases(context)),
        },
      ],
      exports: [
        UseCaseProxyOrderDetail.creatOrderDetailProxy,
        UseCaseProxyOrderDetail.updateOrderDetailProxy,
        UseCaseProxyOrderDetail.deleteOrderDetailProxy,
        UseCaseProxyOrderDetail.getItemOrderDetailProxy,
        UseCaseProxyOrderDetail.getListOrderDetailProxy,
      ],
    };
  }
}
