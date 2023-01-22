import { BadRequestException } from "@nestjs/common";
import { PrismaService } from "src/infrastructure/service";
import { isNullOrUndefined } from "util";

export class ValidReceiveProductById {
  constructor(private context: PrismaService) {}
  async isValid(id: string) {
    const isReceiveProduct = await this.context.receiveProduct.findFirst({
      where: { id: id },
    });
    if (isNullOrUndefined(isReceiveProduct)) {
      throw new BadRequestException(`Not found receiveProductId:: ${id} `);
    }
  }
}
