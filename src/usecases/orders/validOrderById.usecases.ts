import { BadRequestException } from "@nestjs/common";
import { PrismaService } from "src/infrastructure/service";
import { isNullOrUndefined } from "util";

export class validOrderById {
  constructor(private context: PrismaService) {}
  async isValid(id: string) {
    const isOrder = await this.context.orders.findFirst({
      where: { id: id },
    });
    if (isNullOrUndefined(isOrder)) {
      throw new BadRequestException(`Not found OrderId:: ${id} `);
    }
  }
}
