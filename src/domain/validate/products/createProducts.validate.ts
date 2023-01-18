import { TYPEPRODUCTS } from "@prisma/client";
import { createZodDto } from "@anatine/zod-nestjs";
import { extendApi } from "@anatine/zod-openapi";
import { z } from "zod";
const isvalid = z.object({
  name: z.string(),
  price: z.number(),
  cost: z.number(),
  amount: z.number(),
  status: z.enum([TYPEPRODUCTS.INSTOCK, TYPEPRODUCTS.SOLDOUT]),
});
const productValid = extendApi(isvalid);
export class createProductValidDTO extends createZodDto(productValid) {}
