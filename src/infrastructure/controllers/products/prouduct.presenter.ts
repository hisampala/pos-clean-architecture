import { ApiProperty } from "@nestjs/swagger";
import { TYPEPRODUCTS } from "@prisma/client";
import { ProductsEntity } from "src/domain/entities";

export class ProductPresenter implements ProductsEntity {
  @ApiProperty()
  id: string;
  @ApiProperty()
  name: string;
  @ApiProperty()
  price: number;
  @ApiProperty()
  cost: number;
  @ApiProperty()
  amount: number;
  @ApiProperty({ enum: TYPEPRODUCTS })
  status: TYPEPRODUCTS;
}
