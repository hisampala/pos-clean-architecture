import { ApiProperty } from "@nestjs/swagger";
import { ReceiveProductEntity } from "src/domain/entities";

export class ReceiveProductItem implements ReceiveProductEntity {
  id: string;
  @ApiProperty({ required: true })
  amount: number;
  @ApiProperty({ required: true })
  cost: number;
  @ApiProperty({ required: true })
  dateReceive: Date;
  @ApiProperty({ required: true })
  productId: string;
}
