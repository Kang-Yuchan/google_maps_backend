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
  let dbStores = [];
  let stores = req.body;
  stores.forEach(store => {
    dbStores.push({
      storeName: store.name,
      phoneNumber: store.phoneNumber,
      address: store.address,
      openStatusText: store.openStatusText,
      addressLines: store.addressLines,
      location: {
        type: 'Point',
        coordinates: [
          store.coordinates.latitude,
          store.coordinates.longitude
        ]
      }
    })
  })
  Store.create(dbStores, (err, stores) => {
    if (err) {
      return res.status(500).send(err);
    } else {
      return res.status(200).send(stores);
    }
  })
  return res.send("You have posted!");
});

app.delete("/api/stores", (req, res) => {
  Store.deleteMany({}, err => {
    res.status(200).send(err);
  })
})

app.get("/", (req, res) => {
  res.send("Oh fuck~");
});
app.listen(4000 || PORT, () =>
  console.log(`Listening on: http://localhost:${PORT}`)
);
