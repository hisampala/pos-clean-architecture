import { ApiProperty } from "@nestjs/swagger";
import { OrderDetailEntity } from "src/domain/entities/orderDetail.entity";
import { updateOrderDetailValidDTO } from "../../validate/orderDetail";
export class OrderDetailUpdateItem
  extends updateOrderDetailValidDTO
  implements OrderDetailEntity
{
  @ApiProperty({ required: true })
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
