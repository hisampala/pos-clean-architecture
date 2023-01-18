import { ApiProperty } from "@nestjs/swagger";
import { ORDERSTATUS, PAYMENTTYPE } from "@prisma/client";
import { OrdersEntity } from "src/domain/entities/";

export class OrderPresenter implements OrdersEntity {
  @ApiProperty()
  id: string;
  @ApiProperty()
  status: ORDERSTATUS;
  @ApiProperty()
  paymentType: PAYMENTTYPE;
  @ApiProperty()
  createAt: Date;
  @ApiProperty()
  updateAt: Date;
}
