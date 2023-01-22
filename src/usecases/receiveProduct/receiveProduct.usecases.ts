import { ReceiveProductItem } from "src/domain/models";
import { IUseCases } from "src/infrastructure/interfaces";
import { PrismaService } from "src/infrastructure/service";
import { validProductById } from "../products";

export class ReceiveProductUsecases implements IUseCases {
  constructor(private context: PrismaService) {}
  async execute(item: ReceiveProductItem) {
    await new validProductById(this.context).isValid(item.productId);
    const result = this.context.$transaction(async (tx) => {
      const product = await tx.products.findFirst({
        where: { id: item.productId },
      });
      const newAmount = product.amount + item.amount;
      const remainingAmount = product.amount;
      const remainingCost = product.cost;
      const newCost = this.onCalculateNewCostProduct(
        remainingAmount,
        remainingCost,
        item.amount,
        item.cost,
      );
      item.cost = newCost;
      await tx.products.update({
        where: { id: product.id },
        data: { amount: newAmount, cost: newCost },
      });
      return await tx.receiveProduct.create({ data: item });
    });
    return result;
  }
  private onCalculateNewCostProduct(
    remainingAmount: number,
    remainingCost: number,
    newAmount: number,
    newcost: number,
  ) {
    const remaining = remainingAmount * remainingCost;
    const newResult = newAmount * newcost;
    const calRemainingNewResult = remaining + newResult;
    return Number.parseInt(
      Number(calRemainingNewResult / (remainingAmount + newAmount)).toFixed(0),
    );
  }
}
