import { Request, Response } from "express";
import OpenAI from "openai";
import FileService from "./FileService";

class OpenAiService {
  private openAiClient: OpenAI;
  private fileService: FileService;

  constructor(openAIClient: OpenAI, fileService: FileService) {
    this.fileService = fileService;
    this.openAiClient = openAIClient;
  }

  async getTargetProjectForIssue(title: string): Promise<string> {
    const response = await this.openAiClient.responses.create({
      model: "gpt-3.5-turbo",
      instructions: this.fileService.getPromptContent("determineIssueProject"),
      input: title,
    });

    return response.output_text;
  }
}

export default OpenAiService;
