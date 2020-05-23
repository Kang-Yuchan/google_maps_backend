import express from "express";

const app = express();
const PORT = 4000;

app.use(express.json({
  limit: "50mb"
}));

app.post("/api/stores", (req, res) => {
  const dbStores = req.body;
  console.log(dbStores)
  res.send(dbStores)
})

app.get("/", (req, res) => {
  res.send("Oh fuck~");
});

app.listen(4000 || PORT, () =>
  console.log(`Listening on: http://localhost:${PORT}`)
);
