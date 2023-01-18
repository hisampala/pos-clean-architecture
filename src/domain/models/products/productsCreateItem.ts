import { ApiProperty } from "@nestjs/swagger";
import { TYPEPRODUCTS } from "@prisma/client";
import { createProductValidDTO } from "src/domain/validate";
import { ProductsEntity } from "../../entities/products.entity";
export class ProductsCreateItem
  extends createProductValidDTO
  implements ProductsEntity
{
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
