const express = require("express");
const mongoose = require("mongoose");
const FuelStation = require("./models/fuel");

const cors = require("cors");
const app = express();
const port = process.env.PORT || 9000;
app.use(cors());
// MongoDB connection string

const mongoDBString =
  "mongodb+srv://shiv:shiv05@cluster0.fn70xtj.mongodb.net/Fuel-Station";

mongoose
  .connect(mongoDBString, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((err) => {
    console.error("Error connecting to MongoDB: " + err);
  });

// Define routes and middleware here
app.get("/fuel-stations", async (req, res) => {
  try {
    const fuelStations = await FuelStation.find(); // Retrieve all fuel stations from MongoDB
    res.json(fuelStations);
  } catch (error) {
    console.error("Error fetching fuel stations: " + error);
    res.status(500).json({ error: "Unable to retrieve fuel stations" });
  }
});

app.get("/active-fuel-stations", async (req, res) => {
  try {
    const activeFuelStations = await FuelStation.find({ status: "Active" }); // Query to filter active fuel stations
    res.json(activeFuelStations);
  } catch (error) {
    console.error("Error fetching active fuel stations: " + error);
    res.status(500).json({ error: "Unable to retrieve active fuel stations" });
  }
});

app.get("/inactive-fuel-stations", async (req, res) => {
  try {
    const inactiveFuelStations = await FuelStation.find({ status: "Inactive" }); // Query to filter active fuel stations
    res.json(inactiveFuelStations);
  } catch (error) {
    console.error("Error fetching active fuel stations: " + error);
    res.status(500).json({ error: "Unable to retrieve active fuel stations" });
  }
});

app.post("/fuel-stations", async (req, res) => {
  try {
    const fuelStationData = req.body; // Request body should contain the data for the new fuel station
    const newFuelStation = new FuelStation(fuelStationData);

    const savedFuelStation = await newFuelStation.save();
    res.status(201).json(savedFuelStation);
  } catch (error) {
    console.error("Error adding a new fuel station: " + error);
    res.status(500).json({ error: "Unable to add a new fuel station" });
  }
});

// Start the Express server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});