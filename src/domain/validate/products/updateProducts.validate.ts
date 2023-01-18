import { createZodDto } from "@anatine/zod-nestjs";
import { extendApi } from "@anatine/zod-openapi";
import { TYPEPRODUCTS } from "@prisma/client";
import { z } from "zod";
const isvalid = z.object({
  id: z.string().uuid(),
  name: z.string(),
  price: z.number(),
  cost: z.number(),
  amount: z.number(),
  status: z.enum([TYPEPRODUCTS.INSTOCK, TYPEPRODUCTS.SOLDOUT]),
});
const productValid = extendApi(isvalid);
export class updateProductValidDTO extends createZodDto(productValid) {}
