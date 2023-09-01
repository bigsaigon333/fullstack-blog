import db from "../db.js"; // Adjust the path accordingly
import { Post, PostContent, PostWithoutContent } from "../models/postModel.js";

// Get all posts
export const getAllPosts = async (): Promise<PostWithoutContent[]> => {
  try {
    return new Promise((resolve, reject) => {
      db.all(
        "SELECT id, title, createdAt, lastUpdatedAt FROM Posts",
        (err, rows: PostWithoutContent[]) =>
          err ? (console.error(err), reject(err)) : resolve(rows)
      );
    });
  } catch (error) {
    console.error(error);
    throw error;
  }
};

// Get a specific post by ID
export const getPost = async (
  id: number
): Promise<PostWithoutContent | undefined> => {
  try {
    return new Promise((resolve, reject) => {
      db.get(
        "SELECT id, title, createdAt, lastUpdatedAt FROM Posts WHERE id = ?",
        id,
        (err, row: PostWithoutContent | undefined) => {
          if (err) {
            console.error(err);
            reject(err);
          } else if (row == null) {
            resolve(undefined); // No matching row found
          } else {
            resolve(row);
          }
        }
      );
    });
  } catch (error) {
    console.error(error);

    throw error;
  }
};

// Get Post Contents by ID
export const getPostContent = async (
  id: number
): Promise<PostContent | undefined> => {
  try {
    return new Promise((resolve, reject) =>
      db.get(
        "SELECT id, content FROM Posts WHERE id = ?",
        id,
        (err, row: PostContent | undefined) => {
          if (err) {
            console.error(err);
            reject(err);
          } else if (row == null) {
            resolve(undefined); // No matching row found
          } else {
            resolve(row);
          }
        }
      )
    );
  } catch (error) {
    console.error(error);

    throw error;
  }
};

// Create a new post
export const createPost = async ({
  title,
  createdAt,
  content,
}: {
  title: string;
  createdAt: number;
  content: string;
}): Promise<PostWithoutContent> => {
  try {
    return new Promise((resolve, reject) => {
      db.run(
        "INSERT INTO Posts (title, createdAt, lastUpdatedAt, content) VALUES (?, ?, ?)",
        [title, createdAt, createdAt, content],
        async function (err) {
          if (err) {
            console.error(err);
            reject(err);
          } else {
            const newPost = await getPost(this.lastID);
            if (newPost == null) {
              reject(new Error("Failed to create post"));
              return;
            }

            resolve(newPost);
          }
        }
      );
    });
  } catch (error) {
    console.error(error);
    throw error;
  }
};

// Update a post
export const updatePost = async (
  id: number,
  updates: Partial<Post>
): Promise<PostWithoutContent | undefined> => {
  try {
    // Fetch the existing post
    const existingPost = await getPost(id);
    if (existingPost == null) {
      return undefined; // No matching post found
    }

    return new Promise((resolve, reject) => {
      const placeholders = Object.keys(updates)
        .map((column) => `${column} = ?`)
        .join(", ");
      const sql = `UPDATE Posts SET ${placeholders} WHERE id = ?`;
      const values = [...Object.values(updates), id];

      db.run(sql, values, function (err) {
        if (err) {
          console.error(err);
          reject(err);
        } else if (this.changes === 0) {
          resolve(undefined); // No matching row found
        } else {
          const updatedPost: PostWithoutContent = {
            ...existingPost,
            ...updates,
          };
          resolve(updatedPost);
        }
      });
    });
  } catch (error) {
    console.error(error);
    throw error;
  }
};

// Delete a post
export const deletePost = async (
  id: number
): Promise<PostWithoutContent | undefined> => {
  try {
    const existingPost = await getPost(id);

    if (existingPost == null) {
      return undefined; // No matching post found
    }

    return new Promise((resolve, reject) => {
      db.run("DELETE FROM Posts WHERE id = ?", id, function (err) {
        if (err) {
          console.error(err);
          reject(err);
        } else if (this.changes === 0) {
          resolve(undefined); // No matching row found
        } else {
          resolve(existingPost);
        }
      });
    });
  } catch (error) {
    console.error(error);

    throw error;
  }
};
