import db from "../db.js";
import { UserProfile } from "../models/userModel.js";

export async function getUserRole(userId: number): Promise<"admin" | "guest"> {
  try {
    return new Promise<"admin" | "guest">((resolve, reject) => {
      db.get(
        "SELECT role from Users where id = ? ",
        [userId],
        async function (err, row: { role: "admin" | "guest" } | undefined) {
          if (err) {
            console.error(err);
            reject(err);
          } else {
            if (row == null) {
              await setUserRole(userId, "guest");
            }

            resolve(row?.role ?? "guest");
          }
        }
      );
    });
  } catch (error) {
    console.error(error);
    throw error;
  }
}

export async function setUserRole(
  userId: number,
  role: UserProfile["role"] = "guest"
) {
  try {
    return new Promise((resolve, reject) => {
      db.run(
        "INSERT INTO Users (id, role, lastUpdatedAt) VALUES (?, ?, ?)",
        [userId, role, Date.now()],
        async function (err) {
          if (err) {
            console.error(err);
            reject(err);
          } else {
            resolve(true);
          }
        }
      );
    });
  } catch (error) {
    console.error(error);
    throw error;
  }
}
