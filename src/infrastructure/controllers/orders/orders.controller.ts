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
import { OrdersCreateItem, OrdersUpdateItem } from "src/domain/models";
import { ApiResponseType } from "src/infrastructure/common/swagger/response.decorator";
import { UseCaseProxyOrder } from "src/infrastructure/contant";
import { controllerPath } from "src/infrastructure/contant/controller-path";

import { UseCaseProxy } from "src/infrastructure/usecases-proxy/usescases-proxy";
import {
  CreateOrderUsecases,
  DeleteOrderUsecases,
  getOrderItemUsecases,
  GetOrderListUsecases,
  UpdateOrderUsecases,
} from "src/usecases/orders";
import { OrderPresenter } from "./order.presenter";

@Controller(controllerPath.orders)
@ApiTags("Orders-v1")
@ApiResponse({ status: 500, description: "Internal error" })
@ApiExtraModels(OrderPresenter)
@UsePipes(ZodValidationPipe)
export class OrdersController {
  constructor(
    @Inject(UseCaseProxyOrder.creatOrderProxy)
    private readonly createOrderUsecasesProxy: UseCaseProxy<CreateOrderUsecases>,
    @Inject(UseCaseProxyOrder.getListOrderProxy)
    private readonly getOrderListUsecasesProxy: UseCaseProxy<GetOrderListUsecases>,
    @Inject(UseCaseProxyOrder.getItemOrderProxy)
    private readonly getOrderItemUsecasesProxy: UseCaseProxy<getOrderItemUsecases>,
    @Inject(UseCaseProxyOrder.updateOrderProxy)
    private readonly updateOrdersUserCasesProxy: UseCaseProxy<UpdateOrderUsecases>,
    @Inject(UseCaseProxyOrder.deleteOrderProxy)
    private readonly deleteOrderUsecasesProxy: UseCaseProxy<DeleteOrderUsecases>,
  ) {}
  @Post()
  @ApiBody({ type: OrdersCreateItem })
  @ApiResponseType(OrderPresenter, false)
  async onCrateOrder(@Body() item: OrdersCreateItem) {
    return await this.createOrderUsecasesProxy.getInstance().execute(item);
  }
  @ApiResponseType(OrderPresenter, true)
  @Get()
  async getListOrder() {
    return await this.getOrderListUsecasesProxy.getInstance().execute();
  }
  @Get(":id")
  @ApiResponseType(OrderPresenter, false)
  async getItemOrder(@Param("id") id: string) {
    return await this.getOrderItemUsecasesProxy.getInstance().execute(id);
  }
  @Put(":id")
  @ApiBody({ type: OrdersUpdateItem })
  @ApiResponseType(OrderPresenter, false)
  async onUpdateOrder(@Param("id") id: string, @Body() item: OrdersUpdateItem) {
    return await this.updateOrdersUserCasesProxy
      .getInstance()
      .execute(id, item);
  }
  @Delete(":id")
  @ApiResponseType(OrderPresenter, false)
  async onDelete(@Param("id") id: string) {
    return await this.deleteOrderUsecasesProxy.getInstance().execute(id);
  }
}
