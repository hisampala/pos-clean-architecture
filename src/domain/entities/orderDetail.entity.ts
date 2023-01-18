import { OrderDetail } from "@prisma/client";
export class OrderDetailEntity implements OrderDetail {
  id: string;
  productId: string;
  quantity: number;
  cost: number;
  price: number;
  orderId: string;
}
