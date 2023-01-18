import { ApiProperty } from "@nestjs/swagger";
import { OrderDetailEntity } from "src/domain/entities/orderDetail.entity";
import { createOrderDetailValidDTO } from "src/domain/validate/orderDetail/createOrderDetail.validate";

export class OrderDetailCreateItem
  extends createOrderDetailValidDTO
  implements OrderDetailEntity
{
  id: string;
  @ApiProperty({ required: true })
  productId: string;
  @ApiProperty({ required: true })
  quantity: number;
  @ApiProperty({ required: true })
  cost: number;
  @ApiProperty({ required: true })
  price: number;
  @ApiProperty({ required: true })
  orderId: string;
}
