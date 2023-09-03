import dayjs, { Dayjs } from "dayjs";
import timezone from "dayjs/plugin/timezone.js";
import advancedFormat from "dayjs/plugin/advancedFormat.js";
import { z } from "zod";

dayjs.extend(timezone);
dayjs.extend(advancedFormat);

export const unixTimestampMsSchema = z
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
