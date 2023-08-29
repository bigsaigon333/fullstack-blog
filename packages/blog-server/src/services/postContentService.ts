import db from "../db.js";
import { PostContent } from "../models/postContentModel.js";

// Get Post Contents by Post ID
export const getPostContentsByPostId = async (
  postId: number
): Promise<PostContent | undefined> => {
  try {
    return new Promise((resolve, reject) =>
      db.get(
        "SELECT * FROM PostContents WHERE postId = ?",
        postId,
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

// Create Post Contents
export const createPostContents = async ({
  postId,
  content,
}: {
  postId: number;
  content: string;
}): Promise<PostContent> => {
  try {
    return new Promise<PostContent>((resolve, reject) => {
      db.run(
        "INSERT INTO PostContents (postId, content) VALUES (?, ?)",
        [postId, content],
        async function (err) {
          if (err) {
            console.error(err);
            reject(err);
          } else {
            const newPostContent = await getPostContentsByPostId(postId);

            if (newPostContent == null) {
              reject(new Error("Failed to create post"));
              return;
            }

            resolve(newPostContent);
          }
        }
      );
    });
  } catch (error) {
    console.error(error);

    throw error;
  }
};

// Update Post Contents
export const updatePostContents = async ({
  postId,
  content,
}: {
  postId: number;
  content: string;
}): Promise<PostContent | undefined> => {
  try {
    // Fetch the existing postContent
    const existingPostContent = await getPostContentsByPostId(postId);

    if (existingPostContent == null) {
      return undefined; // No matching postContent found
    }

    return new Promise((resolve, reject) => {
      db.run(
        "UPDATE PostContents SET content = ? WHERE postId = ?",
        [content, postId],
        function (err) {
          if (err) {
            console.error(err);
            reject(err);
          } else if (this.changes === 0) {
            resolve(undefined); // No matching row found
          } else {
            const updatedPostContent: PostContent = {
              ...existingPostContent,
              content,
            };
            resolve(updatedPostContent);
          }
        }
      );
    });
  } catch (error) {
    console.error(error);

    throw error;
  }
};

// Delete Post Contents
export const deletePostContents = async ({
  postId,
}: {
  postId: number;
}): Promise<PostContent | undefined> => {
  try {
    // Fetch the existing postContent
    const existingPostContent = await getPostContentsByPostId(postId);

    if (existingPostContent == null) {
      return undefined; // No matching postContent found
    }

    return new Promise((resolve, reject) => {
      db.run(
        "DELETE FROM PostContents WHERE postId = ?",
        postId,
        function (err) {
          if (err) {
            console.error(err);
            reject(err);
          } else if (this.changes === 0) {
            resolve(undefined); // No matching row found
          } else {
            resolve(existingPostContent);
          }
        }
      );
    });
  } catch (error) {
    console.error(error);

    throw error;
  }
};
