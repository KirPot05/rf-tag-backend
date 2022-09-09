import express from "express";
import cors from "cors";
import { createServer } from "http";
import { Server } from "socket.io";
import dbConnect from "./utils/db.js";
import Members from "./models/members.js";
import Tracking from "./models/tracking.js";

const app = express();
const port = process.env.PORT;
const httpInstance = createServer(app);
const io = new Server(httpInstance, {
  cors: {
    origin: "*",
  },
});

dbConnect();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const incomingStream = Tracking.watch();
incomingStream.setMaxListeners(11);

io.on("connection", (socket) => {
  console.log("A user connected");

  incomingStream.on("change", () => {
    Tracking.aggregate([
      {
        $lookup: {
          from: "members",
          foreignField: "rfID",
          localField: "rfID",
          as: "entries",
        },
      },
    ]).exec((err, data) => {
      if (err) throw err;

      console.log(data);
      socket.emit("tracking", data);
    });
  });

  socket.on("disconnect", () => {
    console.log("user disconnected");
    incomingStream.removeAllListeners();
  });
});

app.get("/api/data", async (req, res) => {
  const data = await Tracking.find();
  res.json(data);
});

app.post("/api/data", async (req, res) => {
  const data = req.body;
  const savedData = await Members.create(data);
  res.json(savedData);
});

httpInstance.listen(port, () => {
  console.log("Server running");
});
