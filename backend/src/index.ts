import 'dotenv/config';
import express from 'express';
import globalRouter from './global-router';
import { logger } from './logger';
import http from 'http';
import { wss } from './roadmap/roadmap.router';

import RoadmapService from '../../backend/src/roadmap/roadmap.service';


const roadmapService = new RoadmapService();




const app = express();
const PORT = process.env.PORT || 3000;

app.use(logger);
app.use(express.json());
app.use('/api/v1/', globalRouter);

const server = http.createServer(app);

server.on('upgrade', (request, socket, head) => {
  const origin = request.headers.origin;
  if (origin === 'http://localhost:3000') {
    wss.handleUpgrade(request, socket, head, (ws) => {
      wss.emit('connection', ws, request);
    });
  } else {
    socket.destroy();
  }
});

server.listen(PORT, () => {
  console.log(`Server runs at http://localhost:${PORT}`);
});
