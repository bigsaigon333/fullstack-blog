import db from "../db.js"; // Adjust the path accordingly
import { Post } from "../models/postModel.js";

// Get all posts
export const getAllPosts = async (): Promise<Post[]> => {
  try {
    return new Promise((resolve, reject) => {
      db.all("SELECT * FROM Posts", (err, rows: Post[]) =>
        err ? (console.error(err), reject(err)) : resolve(rows)
      );
    });
  } catch (error) {
    console.error(error);
    throw error;
  }
};

// Get a specific post by ID
export const getPost = async (id: number): Promise<Post | undefined> => {
  try {
    return new Promise((resolve, reject) => {
      db.get("SELECT * FROM Posts WHERE id = ?", id, (err, row: Post) =>
        err ? (console.error(err), reject(err)) : resolve(row)
      );
    });
  } catch (error) {
    console.error(error);

    throw error;
  }
};

// Create a new post
export const createPost = async ({
  title,
  createdAt,
}: {
  title: string;
  createdAt: number;
}): Promise<Post> => {
  try {
    return new Promise((resolve, reject) => {
      db.run(
        "INSERT INTO Posts (title, createdAt) VALUES (?, ?)",
        [title, createdAt],
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
): Promise<Post | undefined> => {
  try {
    // Fetch the existing post
    const existingPost = await getPost(id);
    if (!existingPost) {
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
          const updatedPost: Post = {
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
export const deletePost = async (id: number): Promise<Post | undefined> => {
  try {
    return new Promise((resolve, reject) => {
      const sql = "DELETE FROM Posts WHERE id = ?";

      db.get(
        "SELECT * FROM Posts WHERE id = ?",
        id,
        (err, existingPost: Post) => {
          if (err) {
            console.error(err);
            reject(err);
          } else if (!existingPost) {
            resolve(undefined); // No matching row found
          } else {
            db.run(sql, id, function (err) {
              if (err) {
                console.error(err);
                reject(err);
              } else if (this.changes === 0) {
                resolve(undefined); // No matching row found
              } else {
                resolve(existingPost);
              }
            });
          }
        }
      );
    });
  } catch (error) {
    console.error(error);
    throw error;
  }
};
