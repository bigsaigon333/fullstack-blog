import db from "./db.js";
import { startServer } from "./server.js"; // Adjust the path accordingly

// Start the server
try {
  await startServer(db);
} catch (error) {
  console.error("Error starting server:", error);
}
