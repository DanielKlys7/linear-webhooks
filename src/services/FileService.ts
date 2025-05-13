import fs from "fs";
import path from "path";

class FileService {
  constructor() {}

  getPromptContent(promptName: string): string {
    const promptPath = path.join(__dirname, "../prompts", `${promptName}.md`);

    try {
      return fs.readFileSync(promptPath, "utf-8");
    } catch (error) {
      console.error(`Error reading prompt file: ${error}`);
      throw new Error(`Prompt file not found: ${promptName}`);
    }
  }
}

export default FileService;
