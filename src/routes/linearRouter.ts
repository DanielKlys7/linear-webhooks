import express, { Request, Response } from "express";

import IssueController from "../controllers/linearWebhookController";
import DIContainer, { SERVICES } from "../config/DIContainer";

const linearWebhookController = DIContainer.get<IssueController>(
  SERVICES.LINEAR_WEBHOOK_CONTROLLER
);

const linearRouter = express.Router();

linearRouter.post("/webhook", linearWebhookController.updateIssueWithProject);

export default linearRouter;
