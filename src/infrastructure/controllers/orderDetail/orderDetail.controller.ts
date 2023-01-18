import { ZodValidationPipe } from "@anatine/zod-nestjs";
import {
  Body,
  Controller,
  Delete,
  Get,
  Inject,
  Param,
  Post,
  Put,
  UsePipes,
} from "@nestjs/common";
import { ApiBody, ApiExtraModels, ApiResponse, ApiTags } from "@nestjs/swagger";
import {
  OrderDetailCreateItem,
  OrderDetailUpdateItem,
} from "src/domain/models";
import { ApiResponseType } from "src/infrastructure/common/swagger/response.decorator";

import { UseCaseProxyOrderDetail } from "src/infrastructure/contant";
import controllerPath from "src/infrastructure/contant/controller-path";
import { UseCaseProxy } from "src/infrastructure/usecases-proxy/usescases-proxy";
import {
  CreateOrderDetailUsecases,
  GetOrderDetailListUsecases,
  getOrderDetailItemUsecases,
  UpdateOrderDetailUsecases,
  DeleteOrderDetailUsecases,
} from "src/usecases/orderDetail";
import { OrderDetailPresenter } from "./orderDetail.presenter";

@Controller(controllerPath.orderDetail)
@ApiTags("OrderDetail-v1")
@ApiResponse({ status: 500, description: "Internal error" })
@ApiExtraModels(OrderDetailPresenter)
@UsePipes(ZodValidationPipe)
export class OrderDetailController {
  constructor(
    @Inject(UseCaseProxyOrderDetail.creatOrderDetailProxy)
    private readonly createOrderDetailUsecasesProxy: UseCaseProxy<CreateOrderDetailUsecases>,
    @Inject(UseCaseProxyOrderDetail.getListOrderDetailProxy)
    private readonly getOrderDetailListUsecasesProxy: UseCaseProxy<GetOrderDetailListUsecases>,
    @Inject(UseCaseProxyOrderDetail.getItemOrderDetailProxy)
    private readonly getOrderDetailItemUsecasesProxy: UseCaseProxy<getOrderDetailItemUsecases>,
    @Inject(UseCaseProxyOrderDetail.updateOrderDetailProxy)
    private readonly updateOrderDetailUserCasesProxy: UseCaseProxy<UpdateOrderDetailUsecases>,
    @Inject(UseCaseProxyOrderDetail.deleteOrderDetailProxy)
    private readonly deleteOrderDetailUsecasesProxy: UseCaseProxy<DeleteOrderDetailUsecases>,
  ) {}
  @Post()
  @ApiBody({ type: OrderDetailCreateItem })
  @ApiResponseType(OrderDetailPresenter, false)
  async onCrateOrderDetail(@Body() item: OrderDetailCreateItem) {
    return await this.createOrderDetailUsecasesProxy
      .getInstance()
      .execute(item);
  }
  @Get()
  @ApiResponseType(OrderDetailPresenter, true)
  async getListOrderDetail() {
    return await this.getOrderDetailListUsecasesProxy.getInstance().execute();
  }
  @Get(":id")
  @ApiResponseType(OrderDetailPresenter, false)
  async getItemOrderDetail(@Param("id") id: string) {
    return await this.getOrderDetailItemUsecasesProxy.getInstance().execute(id);
  }
  @Put(":id")
  @ApiBody({ type: OrderDetailUpdateItem })
  @ApiResponseType(OrderDetailPresenter, false)
  async onUpdateOrderDetail(
    @Param("id") id: string,
    @Body() item: OrderDetailUpdateItem,
  ) {
    return await this.updateOrderDetailUserCasesProxy
      .getInstance()
      .execute(id, item);
  }
  @Delete()
  @ApiResponseType(OrderDetailPresenter, false)
  async onDelete(@Param("id") id: string) {
    return await this.deleteOrderDetailUsecasesProxy.getInstance().execute(id);
  }
}
