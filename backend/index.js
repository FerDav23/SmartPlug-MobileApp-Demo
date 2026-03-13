require("dotenv").config();
const express = require("express");
const cors = require("cors");
const deviceRoutes = require("./routes/devices");
const userRoutes = require("./routes/userRoutes");
const roomSmartPlugRoutes = require("./routes/roomSmartPlugRoutes");
const smartPlugRoutes = require("./routes/smartPlugRoutes");
//const mqttTestRoutes = require("./routes/mqttTestRoutes")


// Initialize Express app
const app = express();

// Middleware
app.use(cors()); // Enables CORS (Cross-Origin Resource Sharing) for handling requests from different origins
app.use(express.json()); // For parsing application/json data


// Routes
app.use("/api/users", userRoutes);
app.use("/api/devices", deviceRoutes);
app.use("/api/rooms", roomSmartPlugRoutes);
app.use("/api/smartPlugs", smartPlugRoutes);
//app.use("/api/mqttTest", mqttTestRoutes )


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
