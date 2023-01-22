import { createZodDto } from "@anatine/zod-nestjs";
import { extendApi } from "@anatine/zod-openapi";
import { z } from "zod";
const isvalid = z.object({
  id: z.string().uuid(),
  productId: z.string().uuid(),
  quantity: z.number().min(1),
  cost: z.number().min(1),
  price: z.number().min(1),
  orderId: z.string().uuid(),
});
const orderValid = extendApi(isvalid);
export class updateOrderDetailValidDTO extends createZodDto(orderValid) {}
