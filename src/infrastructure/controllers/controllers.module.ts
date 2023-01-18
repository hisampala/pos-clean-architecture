import { Module } from "@nestjs/common";
import { UsecasesProxyModule } from "../usecases-proxy/usecases-proxy.module";
import { OrdersController } from "./orders/orders.controller";
import { ProductsController } from "./products/products.controller";
import { OrderDetailController } from "./orderDetail/orderDetail.controller";
import { ReceiveProductController } from "./receiveProduct/receiveProduct.controller";

@Module({
  imports: [UsecasesProxyModule],
  controllers: [
    ProductsController,
    OrdersController,
    OrderDetailController,
    ReceiveProductController,
  ],
})
export class ControllersModule {}
