import { ApiProperty } from "@nestjs/swagger";
import { ReceiveProductEntity } from "src/domain/entities";

export class UpdateReceiveProductItem implements ReceiveProductEntity {
  @ApiProperty({ required: true })
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
