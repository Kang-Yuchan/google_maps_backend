import express from "express";
import mongoose from "mongoose";
import Store from "./api/models/store";


const app = express();
const PORT = 4000;
const ADMIN_PASSWORD = "5WaAV3ePLG0TXAyi";

mongoose.connect(
  `mongodb+srv://yuchan:${ADMIN_PASSWORD}@cluster0-nyivz.mongodb.net/test?retryWrites=true&w=majority`, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }
);

app.use(
  express.json({
    limit: "50mb",
  })
);

app.post("/api/stores", (req, res) => {
  const dbStores = req.body;
  console.log(dbStores);
  res.send("You have posted!");
});

app.get("/", (req, res) => {
  res.send("Oh fuck~");
});
app.listen(4000 || PORT, () =>
  console.log(`Listening on: http://localhost:${PORT}`)
);
