import { BadRequestException } from "@nestjs/common";
import { IUseCases } from "src/infrastructure/interfaces";
import { PrismaService } from "src/infrastructure/service";
import { isNullOrUndefined } from "util";

export class getOrderDetailItemUsecases implements IUseCases {
  constructor(private context: PrismaService) {}
  async execute(id: string) {
    return this.context.orderDetail.findFirst({ where: { id: id } });
  }
}
