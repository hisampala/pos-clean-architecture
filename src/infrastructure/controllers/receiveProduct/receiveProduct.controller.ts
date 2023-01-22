import { ZodValidationPipe } from "@anatine/zod-nestjs";
import {
  Body,
  Controller,
  Get,
  Inject,
  Param,
  Post,
  Put,
  UsePipes,
} from "@nestjs/common";
import { ApiTags, ApiResponse, ApiExtraModels } from "@nestjs/swagger";
import { ReceiveProductItem } from "src/domain/models";
import { UpdateReceiveProductItem } from "src/domain/models/receiveProduct/updateReceiveProductItem";
import { UseCaseProxyReceiveProduct } from "src/infrastructure/contant";
import { controllerPath } from "src/infrastructure/contant/controller-path";
import { UseCaseProxy } from "src/infrastructure/usecases-proxy/usescases-proxy";
import {
  ReceiveProductUsecases,
  UpdateReceiveProductUsecases,
} from "src/usecases/receiveProduct";
import { GetReceiveProductListUsecase } from "src/usecases/receiveProduct/getReceiveProductList.usecases";
import { ReceiveProductPresenter } from "./receiveproduct.presenter";

@Controller(controllerPath.receiveProduct)
@ApiTags("ReceiveProduct-v1")
@ApiResponse({ status: 500, description: "Internal error" })
@ApiExtraModels(ReceiveProductPresenter)
@UsePipes(ZodValidationPipe)
export class ReceiveProductController {
  constructor(
    @Inject(UseCaseProxyReceiveProduct.receiveProduct)
    private readonly receiveProductUseCasesProxy: UseCaseProxy<ReceiveProductUsecases>,
    @Inject(UseCaseProxyReceiveProduct.updateReceiveProduct)
    private readonly receiveUpdateProductUseCasesProxy: UseCaseProxy<UpdateReceiveProductUsecases>,
    @Inject(UseCaseProxyReceiveProduct.getReceiveProductList)
    private readonly GetReceiveProductListUseCaseProxy: UseCaseProxy<GetReceiveProductListUsecase>,
  ) {}
  @Post()
  onReceiveProduct(@Body() item: ReceiveProductItem) {
    return this.receiveProductUseCasesProxy.getInstance().execute(item);
  }
  @Put(":id")
  onUpdateReceiveProduct(
    @Param("id") id: string,
    @Body() item: UpdateReceiveProductItem,
  ) {
    return this.receiveUpdateProductUseCasesProxy
      .getInstance()
      .execute(id, item);
  }
  @Get()
  getGetReceiveProductList() {
    return this.GetReceiveProductListUseCaseProxy.getInstance().execute();
  }
}
