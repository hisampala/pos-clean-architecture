import { createZodDto } from "@anatine/zod-nestjs";
import { extendApi } from "@anatine/zod-openapi";
import { z } from "zod";
const isvalid = z.object({
  amount: z.number().min(1),
  cost: z.string().min(1),
  productId: z.string().uuid(),
});
const receiveProductValid = extendApi(isvalid);
export class receiveProductValidDTO extends createZodDto(receiveProductValid) {}
