import express from "express";
import mongoose from "mongoose";
import Store from "./api/models/store";
import Axios from "axios";

const app = express();
const PORT = 4000;
const ADMIN_PASSWORD = "5WaAV3ePLG0TXAyi";

mongoose.connect(
  `mongodb+srv://yuchan:${ADMIN_PASSWORD}@cluster0-nyivz.mongodb.net/test?retryWrites=true&w=majority`, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  }
);

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  next();
});

app.use(
  express.json({
    limit: "50mb",
  })
);

app.post("/api/stores", (req, res) => {
  let dbStores = [];
  let stores = req.body;
  stores.forEach((store) => {
    dbStores.push({
      storeName: store.name,
      phoneNumber: store.phoneNumber,
      address: store.address,
      openStatusText: store.openStatusText,
      addressLines: store.addressLines,
      location: {
        type: "Point",
        coordinates: [store.coordinates.longitude, store.coordinates.latitude],
      },
    });
  });
  Store.create(dbStores, (err, stores) => {
    if (err) {
      return res.status(500).send(err);
    } else {
      return res.status(200).send(stores);
    }
  });
  return res.send("You have posted!");
});

app.get("/api/stores", (req, res) => {
  const zipCode = req.query.zip_code;
  const googleMapsURL = "https://maps.googleapis.com/maps/api/geocode/json";
  Axios.get(googleMapsURL, {
      params: {
        address: zipCode,
        key: "AIzaSyA_2tf19OiLby7_m06kUpjQ_ivdhR3JYUM",
      },
    })
    .then((response) => {
      const data = response.data;
      const coordinates = [
        data.results[0].geometry.location.lng,
        data.results[0].geometry.location.lat,
      ];

      Store.find({
          location: {
            $near: {
              $maxDistance: 3218,
              $geometry: {
                type: "Point",
                coordinates: coordinates,
              },
            },
          },
        },
        (err, stores) => {
          if (err) {
            res.status(500).send(err);
          } else {
            res.status(200).send(stores);
          }
        }
      );
    })
    .catch((err) => {
      console.log(err);
    });
  Store.find({}, (err, stores) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.status(200).send(stores);
    }
  });
});

app.delete("/api/stores", (req, res) => {
  Store.deleteMany({}, (err) => {
    res.status(200).send(err);
  });
});

app.get("/", (req, res) => {
  res.send("Oh fuck~");
});
app.listen(4000 || PORT, () =>
  console.log(`Listening on: http://localhost:${PORT}`)
);
