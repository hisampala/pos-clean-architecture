import { ApiProperty } from "@nestjs/swagger";
import { ORDERSTATUS, PAYMENTTYPE } from "@prisma/client";
import { updateOrderValidDTO } from "src/domain/validate";
import { OrdersEntity } from "../../entities/orders.entity";

export class OrdersUpdateItem
  extends updateOrderValidDTO
  implements OrdersEntity
{
  @ApiProperty()
  id: string;
  @ApiProperty({ enum: ORDERSTATUS })
  status: ORDERSTATUS;
  @ApiProperty({ enum: PAYMENTTYPE })
  paymentType: PAYMENTTYPE;
  createAt: Date;
  updateAt: Date;
}
