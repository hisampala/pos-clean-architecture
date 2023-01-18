import { createZodDto } from "@anatine/zod-nestjs";
import { extendApi } from "@anatine/zod-openapi";
import { PAYMENTTYPE, ORDERSTATUS } from "@prisma/client";
import { z } from "zod";
const isvalid = z.object({
  status: z.enum([
    ORDERSTATUS.CANCELLED,
    ORDERSTATUS.COMPLETED,
    ORDERSTATUS.FAILED,
    ORDERSTATUS.ON_HOLD,
    ORDERSTATUS.PENDING,
    ORDERSTATUS.PROCESSING,
    ORDERSTATUS.REFUNDED,
    ORDERSTATUS.TRASH,
  ]),
  paymentType: z.enum([PAYMENTTYPE.BANKTRANFER, PAYMENTTYPE.CASH]),
});
const orderValid = extendApi(isvalid);
export class createOrderValidDTO extends createZodDto(orderValid) {}
