import { z } from "zod";

const EnvSchema = z.object({
  PORT: z
    .string()
    .refine((port) => !isNaN(Number.parseInt(port)))
    .transform((port) => Number.parseInt(port)),
  DATABASE_URL: z.string(),
});

export type TENV = z.infer<typeof EnvSchema>;
export function validateEnv(config: Record<string, string>) {
  const env = EnvSchema.parse(config);
  return env;
}
