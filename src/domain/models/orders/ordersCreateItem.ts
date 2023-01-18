import { ApiProperty } from "@nestjs/swagger";
import { ORDERSTATUS, PAYMENTTYPE } from "@prisma/client";
import { createOrderValidDTO } from "src/domain/validate";
import { OrdersEntity } from "../../entities/orders.entity";
export class OrdersCreateItem
  extends createOrderValidDTO
  implements OrdersEntity
{
  id: string;
  @ApiProperty({ enum: ORDERSTATUS })
  status: ORDERSTATUS;
  @ApiProperty({ enum: PAYMENTTYPE })
  paymentType: PAYMENTTYPE;
  createAt: Date;
  updateAt: Date;
}
