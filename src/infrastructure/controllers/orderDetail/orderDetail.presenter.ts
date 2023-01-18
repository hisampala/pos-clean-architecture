import { ApiProperty } from "@nestjs/swagger";
import { OrderDetailEntity } from "src/domain/entities/orderDetail.entity";

export class OrderDetailPresenter implements OrderDetailEntity {
  @ApiProperty()
  id: string;
  @ApiProperty()
  productId: string;
  @ApiProperty()
  quantity: number;
  @ApiProperty()
  cost: number;
  @ApiProperty()
  price: number;
  @ApiProperty()
  orderId: string;
}
