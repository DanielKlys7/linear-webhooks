import { Request, Response } from "express";
import OpenAiService from "../services/OpenAIService";
import { LinearIssueWebhookPayload } from "../types";
import LinearService from "../services/LinearService";

class LinearWebhookController {
  private openAiService: OpenAiService;

  constructor(linearService: LinearService, openAiService: OpenAiService) {
    this.openAiService = openAiService;

    this.updateIssueWithProject = this.updateIssueWithProject.bind(this);
  }

  async updateIssueWithProject(
    req: Request<{}, {}, LinearIssueWebhookPayload>,
    res: Response
  ): Promise<void> {
    // const {
    //   data: { title },
    // } = req.body;

    const targetProject = await this.openAiService.getTargetProjectForIssue(
      "Zaprogramować asystenta AI"
    );

    res.status(200).json({ targetProject });
  }
}

export default LinearWebhookController;
