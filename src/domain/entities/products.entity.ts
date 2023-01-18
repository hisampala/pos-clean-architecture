import { TYPEPRODUCTS } from ".prisma/client";
import { Products } from "@prisma/client";

export class ProductsEntity implements Products {
  id: string;
  name: string;
  price: number;
  cost: number;
  amount: number;
  status: TYPEPRODUCTS;
}
