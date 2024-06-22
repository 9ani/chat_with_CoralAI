import WebSocket from 'ws';
import RoadmapService from './roadmap.service'; // Adjust the import path based on your actual structure

class RoadmapController {
  private roadmapService: RoadmapService;

  constructor(roadmapService: RoadmapService) {
    this.roadmapService = roadmapService;
  }

  async handleWebSocketConnection(ws: WebSocket, userPrompt: string, chatID: string) {
    try {
      await this.roadmapService.create(userPrompt, chatID, (data) => {
        ws.send(JSON.stringify(data));
      });
    } catch (error) {
      ws.send(JSON.stringify({ error: 'Failed to process Cohere stream' }));
    }
  }
}

export default RoadmapController;
