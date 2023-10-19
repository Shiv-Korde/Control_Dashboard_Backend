const mongoose = require("mongoose");

const fuelStationSchema = new mongoose.Schema(
  {
    fs_id: String,
    status: String,
    last_seen: String,
    last_updated_timestamp: String,
    temperature: String,
    Humidity: String,
    // Add more fields as needed
  },
  { collection: "Fuel-Station-Data" }
); // Use the correct collection name

module.exports = mongoose.model("FuelStation", fuelStationSchema);
