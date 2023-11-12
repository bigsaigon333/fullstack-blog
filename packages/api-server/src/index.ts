import db from "./db.js";
import { startServer } from "./server.js";

try {
  await startServer(db);
} catch (error) {
  console.error("Error starting server:", error);
}
