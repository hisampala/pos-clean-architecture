import { ReceiveProduct } from "@prisma/client";

export class ReceiveProductEntity implements ReceiveProduct {
  id: string;
  amount: number;
  cost: number;
  dateReceive: Date;
  productId: string;
}
