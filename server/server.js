import express from "express";
import http from "http";
import { Server } from "socket.io";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";

//import authRoutes from "./routes/auth.js";
//import teamRoutes from "./routes/team.js";
//import adminRoutes from "./routes/admin.js";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

const server = http.createServer(app);
const io = new Server(server, {
  cors: { origin: "*" }
});
app.set("io", io);

mongoose.connect(process.env.MONGO_STRING).then(() => {
  console.log("✅ Mongo connected");
});

io.on('connection', (socket) => {
    // This block runs for each individual client that connects
    console.log(`✅ Client Connected: ${socket.id}`);
  
    // You can also listen for the disconnect event
    socket.on('disconnect', () => {
      console.log(`❌ Client Disconnected: ${socket.id}`);
    });
  });

//app.use("/auth", authRoutes);
//app.use("/team", teamRoutes);
//app.use("/admin", adminRoutes);

const PORT = 5000;
server.listen(PORT, () => console.log(`🚀 Backend running on ${PORT}`));
