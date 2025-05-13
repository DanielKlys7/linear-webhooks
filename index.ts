import express from "express";
import { config } from "dotenv";

import linearRouter from "./src/routes/linearRouter";

config();

const server = express();
const PORT = process.env.PORT || 3000;

server.use(express.json());

server.get("/", (req, res) => {
  res.send("Express server is running");
});

server.use("/linear", linearRouter);

server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
