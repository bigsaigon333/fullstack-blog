import dayjs, { Dayjs } from "dayjs";
import { z } from "zod";

const unixTimestampMsSchema = z
  .number()
  .refine(
    (value) => typeof value === "number" && !Number.isNaN(value) && value > 0
  );

export const createDayjsFromUnixTimestampMs = (
  unixTimestampMs: number
): Dayjs => {
  unixTimestampMsSchema.parse(unixTimestampMs);

  return dayjs(unixTimestampMs);
};
