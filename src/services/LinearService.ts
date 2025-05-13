import { Issue, IssuePayload, LinearClient } from "@linear/sdk";
import { Request, Response } from "express";

class LinearService {
  private linearClient: LinearClient;

  constructor(linearClient: LinearClient) {
    this.linearClient = linearClient;

    this.updateIssueProjectId = this.updateIssueProjectId.bind(this);
    this.getIssue = this.getIssue.bind(this);
  }

  async updateIssueProjectId(
    issue: Issue,
    projectId: string
  ): Promise<IssuePayload> {
    const updatedIssue = await this.linearClient.updateIssue(issue.id, {
      projectId,
    });

    return updatedIssue;
  }

  async getIssue(issueId: string): Promise<Issue> {
    const issue = await this.linearClient.issue(issueId);

    if (!issue) {
      throw new Error(`Issue with ID ${issueId} not found`);
    }

    return issue;
  }
}

export default LinearService;
