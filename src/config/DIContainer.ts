import OpenAiService from "../services/OpenAIService";
import LinearWebhookController from "../controllers/linearWebhookController";

import LinearClient from "./linear";
import OpenAiClient from "./openAI";
import LinearService from "../services/LinearService";
import FileService from "../services/FileService";

export const SERVICES = {
  LINEAR_CLIENT: "linearClient",
  OPENAI_CLIENT: "openAIClient",

  LINEAR_SERVICE: "linearService",
  OPENAI_SERVICE: "openAiService",
  FILE_SERVICE: "fileService",

  LINEAR_WEBHOOK_CONTROLLER: "linearWebhookController",
} as const;

class DIContainer {
  private services: Map<string, any> = new Map();

  constructor() {
    // clients
    this.services.set(SERVICES.LINEAR_CLIENT, LinearClient);
    this.services.set(SERVICES.OPENAI_CLIENT, OpenAiClient);

    // services
    this.services.set(SERVICES.FILE_SERVICE, new FileService());
    this.services.set(
      SERVICES.OPENAI_SERVICE,
      new OpenAiService(
        this.get(SERVICES.OPENAI_CLIENT),
        this.get(SERVICES.FILE_SERVICE)
      )
    );
    this.services.set(
      SERVICES.LINEAR_SERVICE,
      new LinearService(this.get(SERVICES.LINEAR_CLIENT))
    );

    // controllers
    this.services.set(
      SERVICES.LINEAR_WEBHOOK_CONTROLLER,
      new LinearWebhookController(
        this.get(SERVICES.LINEAR_SERVICE),
        this.get(SERVICES.OPENAI_SERVICE)
      )
    );
  }
  get<T>(serviceName: string): T {
    if (!this.services.has(serviceName)) {
      throw new Error(`Service ${serviceName} not found`);
    }
    return this.services.get(serviceName) as T;
  }
}

export default new DIContainer();
