import { Request, Response } from "express";
import OpenAiService from "../services/OpenAIService";
import { LinearIssueWebhookPayload } from "../types";
import LinearService from "../services/LinearService";

class LinearWebhookController {
  private openAiService: OpenAiService;
  private linearService: LinearService;

  constructor(linearService: LinearService, openAiService: OpenAiService) {
    this.linearService = linearService;
    this.openAiService = openAiService;

    this.updateIssueWithProject = this.updateIssueWithProject.bind(this);
  }

  async updateIssueWithProject(
    req: Request<{}, {}, LinearIssueWebhookPayload>,
    res: Response
  ): Promise<void> {
    const { data } = req.body;

    const targetProject = await this.openAiService.getTargetProjectForIssue(
      data.title
    );

    const issue = await this.linearService.getIssue(data.id);

    if (issue.projectId) {
      res.status(200).json({ message: "Issue already has a project" });
      return;
    }

    const updatedIssue = await this.linearService.updateIssueProjectId(
      issue,
      targetProject
    );

    res.status(200).json({ data: updatedIssue });
  }
}

export default LinearWebhookController;
