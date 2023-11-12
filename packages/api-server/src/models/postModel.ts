export interface Post {
  id: number;
  title: string;
  createdAt: number;
  lastUpdatedAt: number;
  content: string;
}

export type PostWithoutContent = Omit<Post, "content">;

export type PostContent = Pick<Post, "id" | "content">;
