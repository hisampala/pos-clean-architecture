import { Orders, ORDERSTATUS, PAYMENTTYPE } from "@prisma/client";
export class OrdersEntity implements Orders {
  id: string;
  status: ORDERSTATUS;
  paymentType: PAYMENTTYPE;
  createAt: Date | null;
  updateAt: Date | null;
}
