import express from "express";
import { config } from "dotenv";

import linearRouter from "../src/routes/linearRouter";
import ipWhitelist from "../src/middleware/ipWhitelist";

config();

const server = express();
server.set("trust proxy", true);

const PORT = process.env.PORT || 3000;

server.use(express.json());

server.get("/", (req, res) => {
  res.send("Express server is running");
});

process.env.NODE_ENV !== "development"
  ? server.use("/linear", ipWhitelist, linearRouter)
  : server.use("/linear", linearRouter);

server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

module.exports = server;
