import { AIVideoType } from "@/models/ai.model";
import { handleError } from "@/utils/handleError";
import type { Server as HttpServer } from "http";
import { Server } from "socket.io";

export const SOCKET_EVENTS = {
  CONNECTION: "connection",
  AI_VIDEO_GET: "ai_video_get",
};

export const initSocket = (httpServer: HttpServer) => {
  const io = new Server(httpServer, {
    cors: {
      origin: "http://localhost:5173",
    },
  });

  setIO(io);

  return io;
};

export const emitAIVideoUpdate = (io: Server | null, data: AIVideoType) => {
  if (io) {
    io.emit(SOCKET_EVENTS.AI_VIDEO_GET, data);
  }
};

let io: Server | null = null;

export const setIO = (instance: Server) => {
  if (io) return;
  io = instance;
};

export const getIO = () => {
  if (!io) {
    handleError("WebSocket is not initialized");
  }

  return io;
};
