import { createServer } from "http";
import dotenv from "dotenv";
import app from "./app";
dotenv.config();
const PORT = process.env.PORT || 2000;
const uri = process.env.MONGO_URL;
const server = createServer(app);

(async () => {
  server.listen(PORT, () =>
    console.log(`Listening to port @ http://localhost:${PORT}`)
  );
})();
