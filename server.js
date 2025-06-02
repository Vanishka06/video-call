import express from "express";
import dotenv from "dotenv";
import morgan from "morgan";
import cors from "cors";
import bodyParser from "body-parser";
<<<<<<< HEAD
import path from "path";
import connectDB from "./config/db.js";
import authRoutes from "./routes/authRoute.js";
=======
import path from "path"
import {Server} from "socket.io"
import http from "http";
>>>>>>> 36f9e4b (WIP: saving changes before rebase)

// config
dotenv.config();
connectDB();

const app = express();
const __dirname = path.resolve(); // typo fixed: _dirname ➜ __dirname

// ✅ Add CORS middleware at the very top before any routes
app.use(cors({
<<<<<<< HEAD
  origin: "https://urban-meter-frontend.vercel.app",
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  credentials: true,
=======
  origin: ["http://localhost:5173", "http://192.168.1.1:5173"], // Replace with YOUR IP
  methods: ["GET", "POST"],
  credentials: true
>>>>>>> 36f9e4b (WIP: saving changes before rebase)
}));

app.options('*', cors({
  origin: "https://urban-meter-frontend.vercel.app",
  credentials: true,
}));

// Middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.json());
app.use(morgan("dev"));

// Routes
app.use("/api/v1/auth", authRoutes);
<<<<<<< HEAD

// Serve frontend (optional if needed)
app.use(express.static(path.join(__dirname, "myapp/dist")));
app.get("*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "myapp/dist", "index.html"));
});

// Root test route
app.get("/", (req, res) => {
  res.send("<h1>Welcome</h1>");
});

// Port setup
const PORT = process.env.VITE_PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

// Export for Vercel
=======
app.use(express.static(path.join(_dirname, "../myapp/dist")));


app.get("*", (req, res) => {
  if (req.originalUrl.startsWith("/socket.io")) return;
  res.sendFile(path.join(_dirname, "../myapp/dist", "index.html"));
});
const server = http.createServer(app);

// ✅ Setup Socket.IO AFTER CORS and express.json
const io = new Server(server, {
  cors: {
    origin: "*", // Allow all origins for testing
    methods: ["GET", "POST"],
    credentials: true,
  },
});


// ✅ Socket.IO listeners
io.on("connection", (socket) => {
  console.log("User connected:", socket.id);

  socket.on("disconnect", () => {
    console.log("User disconnected:", socket.id);
  });

  socket.on("callUser", (data) => {
    io.to(data.userToCall).emit("incomingCall", {
      signal: data.signalData,
      from: data.from,
      name: data.name,
    });
  });

  socket.on("answerCall", (data) => {
    io.to(data.to).emit("callAccepted", data.signal);
  });
});

app.get("/", (req, res) => {
  res.send("Server is running");
});

app.post("/log-call", (req, res) => {
  const { from, to } = req.body;
  console.log(`Logging call: From ${from} To ${to}`);
  res.json({ success: true, message: "Call logged successfully" });
});



//rest api


server.listen(PORT, '0.0.0.0', () => {
  console.log(
    `Server Running on ${process.env.MONGO_URL} mode on port ${PORT}`
  );
});




// ✅ Export the app for Vercel
>>>>>>> 36f9e4b (WIP: saving changes before rebase)
export default app;


