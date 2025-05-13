import { Issue, LinearClient } from "@linear/sdk";
import { Request, Response } from "express";

class LinearService {
  private linearClient: LinearClient;

  constructor(linearClient: LinearClient) {
    this.linearClient = linearClient;
  }

  async updateIssue(issue: Issue): Promise<Issue> {
    return Promise.resolve(issue);
  }
}

export default LinearService;
