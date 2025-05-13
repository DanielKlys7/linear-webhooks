import { LinearClient } from "@linear/sdk";
import { config } from "dotenv";

config();

const linearClient = new LinearClient({
  apiKey: process.env.LINEAR_API_KEY,
});

export default linearClient;
