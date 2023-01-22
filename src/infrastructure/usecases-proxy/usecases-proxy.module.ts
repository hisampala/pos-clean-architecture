import { Module } from "@nestjs/common";
import { ProductsProxyModule } from "./products/products-proxy.module";
import { OrdersProxyModule } from "./orders/orders-proxy.module";
import { OrderDetailProxyModule } from "./ordersDetail/orderDetail-proxy.module";
import { ReceiveProductProxyModule } from "./receiveProduct/receive-product-proxy.module";

@Module({
  imports: [
    ProductsProxyModule.register(),
    OrdersProxyModule.register(),
    OrderDetailProxyModule.register(),
    ReceiveProductProxyModule.register(),
  ],
  exports: [
    ProductsProxyModule,
    OrdersProxyModule,
    OrderDetailProxyModule,
    ReceiveProductProxyModule,
  ],
})
export class UsecasesProxyModule {}
