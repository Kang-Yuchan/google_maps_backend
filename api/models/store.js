import mongoose from "mongoose";

const storeSchema = mongoose.Schema({
  storeName: String,
  phoneNumber: String,
  address: {},
  openStatusText: String,
  addressLines: Array,
  location: {
    type: {
      type: String,
      enum: ["Point"],
      required: true,
    },
    coordinates: {
      type: [Number],
      required: true,
    },
  },
});

storeSchema.index({ location: "2dsphere" }, { sparse: true });

export default mongoose.model("Store", storeSchema);
