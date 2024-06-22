import { Router } from 'express';
import { Server, WebSocket } from 'ws';
import RoadmapService from './roadmap.service';
import RoadmapController from './roadmap.controller';
import { v4 as uuidv4 } from 'uuid';

const roadmapRouter = Router();

const roadmapService = new RoadmapService();
const roadmapController = new RoadmapController(roadmapService);

const wss = new Server({ noServer: true });

wss.on('connection', (ws: WebSocket) => {
  const chatID = uuidv4();
  ws.on('message', async (message: string) => {
    const userPrompt = message.toString();
    await roadmapController.handleWebSocketConnection(ws, userPrompt, chatID);
  });

  ws.send('Connected to WebSocket server');
});

roadmapRouter.get('/roadmaps', (req, res) => {
  res.send('Roadmap API is running');
});

export { roadmapRouter, wss };
