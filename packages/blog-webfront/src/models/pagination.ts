import { z } from "zod";

export type Pagination<T> = {
  total: number;
  data: T[];
};

export const Pagination = <T>(data: z.ZodType<T>): z.ZodType<Pagination<T>> =>
  z.object({
    total: z.number(),
    data: z.array(data),
  });
