import { Dayjs } from "dayjs";
import { z } from "zod";
import {
  createDayjsFromUnixTimestampMs,
  unixTimestampMsSchema,
} from "../utils/date.js";

export type PostResponse = {
  id: number;
  title: string;
  createdAt: number;
  lastUpdatedAt: number;
};

export const PostResponse = z.object({
  id: z.number(),
  title: z.string(),
  createdAt: unixTimestampMsSchema,
  lastUpdatedAt: unixTimestampMsSchema,
});

export type Post = {
  id: number;
  title: string;
  createdAt: Dayjs;
  lastUpdatedAt: Dayjs;
};

export const Post = z.object({
  id: z.number(),
  title: z.string(),
  createdAt: z.number().transform(createDayjsFromUnixTimestampMs),
  lastUpdatedAt: z.number().transform(createDayjsFromUnixTimestampMs),
});

export type PostContent = {
  id: number;
  content: string;
};

export const PostContent = z.object({
  id: z.number(),
  content: z.string(),
});
