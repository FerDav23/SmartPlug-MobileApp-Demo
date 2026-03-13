
/*
const mqtt = require("mqtt");
require("dotenv").config();

// Use a fallback if MQTT_BROKER is undefined
const MQTT_BROKER = process.env.MQTT_BROKER || "mqtt://192.168.137.33";

const appClient = mqtt.connect(MQTT_BROKER);
var count = 0; // ✅ Keeps track of received messages

appClient.on("connect", () => {
  console.log("✅ MQTT Connected to", MQTT_BROKER);



  appClient.subscribe("smartplug/message", (err) => {
    if (err) {
      console.error("❌ MQTT Subscription Error:", err.message);
    } else {
      console.log("📡 Subscribed to topic: smartplug/message");
    }
  });
});

// ✅ Handle Connection Errors
appClient.on("error", (err) => {
  console.error("❌ MQTT Connection Error:", err.message);
});

// ✅ Handle Reconnect Attempts
appClient.on("reconnect", () => {
  console.log("🔄 Reconnecting to MQTT Broker...");
});

// ✅ Increment count when a message is received
appClient.on("message", (topic, message) => {
  const msg = message.toString();

  if (msg === "increase count") {
    count++; // ✅ Increase count for each message
  } else {
    count = 0; // ✅ Reset count for any other message
  }

  console.log(`📩 MQTT Message Received - ${topic}: ${msg}`);
  console.log(`🔢 Message Count: ${count}`);
});


// ✅ Export MQTT Client & Count Reset Function
module.exports = { appClient};

*/