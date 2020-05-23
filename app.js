import express from "express";

const app = express();
const PORT = 4000;

app.get("/", (req, res) => {
  res.send("Oh fuck~");
});

app.listen(4000 || PORT, () =>
  console.log(`Listening on: http://localhost:${PORT}`)
);
