import { ApiProperty } from "@nestjs/swagger";
import { ReceiveProductEntity } from "src/domain/entities";

export class ReceiveProductPresenter implements ReceiveProductEntity {
  @ApiProperty()
  id: string;
  @ApiProperty()
  amount: number;
  @ApiProperty()
  cost: number;
  @ApiProperty()
  dateReceive: Date;
  @ApiProperty()
  productId: string;
}
