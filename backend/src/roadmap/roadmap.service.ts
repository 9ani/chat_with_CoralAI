import { CohereClient } from "cohere-ai";
import dotenv from "dotenv";
dotenv.config();

class RoadmapService {
  private cohere: CohereClient;

  constructor() {
    this.cohere = new CohereClient({
      token: process.env.COHERE_API_KEY || '',
    });
  }

  async create(userPrompt: string, chatID: string, callback: (data: any) => void) {
    try {
      const chatResponse = await this.cohere.chat({
        model: 'command',
        message: userPrompt,
        conversationId: chatID,
      });

      if (chatResponse && chatResponse.text) {
        const jsonObject = { text: chatResponse.text };
        callback(jsonObject);
      } else {
        throw new Error('Unexpected response format from Cohere');
      }
    } catch (error) {
      console.error('Error processing Cohere stream', error);
      throw new Error('Failed to process Cohere stream');
    }
  }
}

export default RoadmapService;
