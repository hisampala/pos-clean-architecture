import { ApiProperty } from "@nestjs/swagger";
import { TYPEPRODUCTS } from "@prisma/client";
import { ProductsEntity } from "src/domain/entities";
import { updateProductValidDTO } from "src/domain/validate/products/updateProducts.validate";

export class ProductsUpdateItem
  extends updateProductValidDTO
  implements ProductsEntity
{
  @ApiProperty({ required: true })
  id: string;
  @ApiProperty({ required: true })
  name: string;
  @ApiProperty({ required: true })
  price: number;
  @ApiProperty({ required: true })
  cost: number;
  @ApiProperty({ required: true })
  amount: number;
  @ApiProperty({ required: true })
  status: TYPEPRODUCTS;
}
