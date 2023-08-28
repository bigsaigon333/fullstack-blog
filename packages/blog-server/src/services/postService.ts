import db from "../db.js"; // Adjust the path accordingly
import { Post } from "../models/postModel.js";

// ... (other functions remain the same)

// Get all posts
export const getAllPosts = async (): Promise<Post[]> => {
  try {
    return new Promise((resolve, reject) => {
      db.all("SELECT * FROM post", (err, rows: Post[]) =>
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
      db.get("SELECT * FROM post WHERE id = ?", id, (err, row: Post) =>
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
  date,
}: {
  title: string;
  date: number;
}): Promise<Post> => {
  try {
    return new Promise((resolve, reject) => {
      db.run(
        "INSERT INTO post (title, date) VALUES (?, ?)",
        [title, date],
        function (err) {
          if (err) {
            console.error(err);
            reject(err);
          } else {
            const newPost: Post = {
              id: this.lastID,
              title,
              date,
            };
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
      const sql = `UPDATE post SET ${placeholders} WHERE id = ?`;
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
      const sql = "DELETE FROM post WHERE id = ?";

      db.get(
        "SELECT * FROM post WHERE id = ?",
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
