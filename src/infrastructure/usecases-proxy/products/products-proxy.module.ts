import { DynamicModule, Module } from "@nestjs/common";
import { ExceptionsModule } from "src/infrastructure/exceptions/exceptions.module";
import { PrismaService } from "src/infrastructure/service";
import {
  CreateProductsUseCases,
  DeleteProductUsecases,
  GetProductItemUsecases,
  GetProductListUsecases,
  UpdateProductsUserCases,
} from "../../../usecases/products";
import { UseCaseProxyProducts } from "../../contant";
import { UseCaseProxy } from "../usescases-proxy";
@Module({
  imports: [ExceptionsModule],
  providers: [PrismaService],
})
export class ProductsProxyModule {
  static register(): DynamicModule {
    return {
      module: ProductsProxyModule,
      providers: [
        {
          provide: UseCaseProxyProducts.creatProductProxy,
          inject: [PrismaService],
          useFactory: (context: PrismaService) =>
            new UseCaseProxy(new CreateProductsUseCases(context)),
        },
        {
          provide: UseCaseProxyProducts.updateProductProxy,
          inject: [PrismaService],
          useFactory: (context: PrismaService) =>
            new UseCaseProxy(new UpdateProductsUserCases(context)),
        },
        {
          provide: UseCaseProxyProducts.deleteProductProxy,
          inject: [PrismaService],
          useFactory: (context: PrismaService) =>
            new UseCaseProxy(new DeleteProductUsecases(context)),
        },
        {
          provide: UseCaseProxyProducts.getItemProductProxy,
          inject: [PrismaService],
          useFactory: (context: PrismaService) =>
            new UseCaseProxy(new GetProductItemUsecases(context)),
        },
        {
          provide: UseCaseProxyProducts.getListProductProxy,
          inject: [PrismaService],
          useFactory: (context: PrismaService) =>
            new UseCaseProxy(new GetProductListUsecases(context)),
        },
      ],
      exports: [
        UseCaseProxyProducts.creatProductProxy,
        UseCaseProxyProducts.updateProductProxy,
        UseCaseProxyProducts.deleteProductProxy,
        UseCaseProxyProducts.getItemProductProxy,
        UseCaseProxyProducts.getListProductProxy,
      ],
    };
  }
}
