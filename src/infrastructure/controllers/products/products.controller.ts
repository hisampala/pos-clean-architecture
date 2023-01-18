import {
  Body,
  Controller,
  Get,
  Inject,
  Param,
  Post,
  Put,
} from "@nestjs/common";
import { Delete, UsePipes } from "@nestjs/common/decorators";
import { ApiBody, ApiExtraModels, ApiResponse, ApiTags } from "@nestjs/swagger";
import { ProductsCreateItem, ProductsUpdateItem } from "src/domain/models";
import { ApiResponseType } from "src/infrastructure/common/swagger/response.decorator";
import {
  CreateProductsUseCases,
  DeleteProductUsecases,
  GetProductItemUsecases,
  GetProductListUsecases,
  UpdateProductsUserCases,
} from "src/usecases/products";
import { UseCaseProxyProducts } from "../../contant";
import controllerPath from "../../contant/controller-path";
import { UseCaseProxy } from "../../usecases-proxy/usescases-proxy";
import { ProductPresenter } from "./prouduct.presenter";
import { ZodValidationPipe } from "@anatine/zod-nestjs";
@Controller(controllerPath.products)
@ApiTags("Products-v1")
@ApiResponse({ status: 500, description: "Internal error" })
@ApiExtraModels(ProductPresenter)
@UsePipes(ZodValidationPipe)
export class ProductsController {
  constructor(
    @Inject(UseCaseProxyProducts.creatProductProxy)
    private readonly createProductUsecasesProxy: UseCaseProxy<CreateProductsUseCases>,
    @Inject(UseCaseProxyProducts.getListProductProxy)
    private readonly getProductListUsecasesProxy: UseCaseProxy<GetProductListUsecases>,
    @Inject(UseCaseProxyProducts.getItemProductProxy)
    private readonly getProductItemUsecasesProxy: UseCaseProxy<GetProductItemUsecases>,
    @Inject(UseCaseProxyProducts.updateProductProxy)
    private readonly updateProductsUserCasesProxy: UseCaseProxy<UpdateProductsUserCases>,
    @Inject(UseCaseProxyProducts.deleteProductProxy)
    private readonly deleteProductUsecasesProxy: UseCaseProxy<DeleteProductUsecases>,
  ) {}
  @Post()
  @ApiBody({ type: ProductsCreateItem })
  @ApiResponseType(ProductPresenter, false)
  async crateProduct(@Body() item: ProductsCreateItem) {
    return this.createProductUsecasesProxy.getInstance().execute(item);
  }
  @Get()
  @ApiResponseType(ProductPresenter, true)
  async getProductList() {
    return this.getProductListUsecasesProxy.getInstance().execute();
  }
  @Get(":id")
  @ApiResponseType(ProductPresenter, false)
  async getProductItemById(@Param("id") id: string) {
    return this.getProductItemUsecasesProxy.getInstance().execute(id);
  }
  @Put(":id")
  @ApiBody({ type: ProductsUpdateItem })
  @ApiResponseType(ProductPresenter, false)
  async updateProduct(
    @Param("id") id: string,
    @Body() item: ProductsUpdateItem,
  ) {
    return this.updateProductsUserCasesProxy.getInstance().execute(id, item);
  }
  @Delete(":id")
  @ApiResponseType(ProductPresenter, false)
  async deleteProduct(@Param("id") id: string) {
    return this.deleteProductUsecasesProxy.getInstance().execute(id);
  }
}
