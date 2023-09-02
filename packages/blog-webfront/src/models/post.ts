import { Dayjs } from "dayjs";
import { z } from "zod";
import { createDayjsFromUnixTimestampMs } from "../utils/date.js";

export type PostResponse = {
  id: number;
  title: string;
  createdAt: number;
  lastUpdatedAt: number;
};

const unixTimestampMsSchema = z
  .number()
  .refine(
    (value) => typeof value === "number" && !Number.isNaN(value) && value > 0
  );

export const PostResponse = z.object({
  id: z.number(),
  title: z.string(),
  createdAt: unixTimestampMsSchema,
  lastUpdatedAt: unixTimestampMsSchema,
});

export const Post = z.object({
  id: z.number(),
  title: z.string(),
  createdAt: z.number().transform(createDayjsFromUnixTimestampMs),
  lastUpdatedAt: z.number().transform(createDayjsFromUnixTimestampMs),
});

export type Post = {
  id: number;
  title: string;
  createdAt: Dayjs;
  lastUpdatedAt: Dayjs;
};
