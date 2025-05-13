import OpenAI from "openai";
import FileService from "./FileService";

class OpenAIService {
  private openAiClient: OpenAI;
  private fileService: FileService;

  constructor(openAIClient: OpenAI, fileService: FileService) {
    this.fileService = fileService;
    this.openAiClient = openAIClient;
  }

  async getTargetProjectForIssue(title: string): Promise<string> {
    const completion = await this.openAiClient.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "system",
          content: this.fileService.getPromptContent("determineIssueProject"),
        },
        { role: "user", content: title },
      ],
    });

    return completion.choices[0]?.message?.content?.trim() ?? "";
  }
}

export default OpenAIService;
