const http = require('http');
const device = require("aws-iot-device-sdk").device;
const express = require("express");
const path = require('path');
const app = express();
const bodyParser = require("body-parser");
const WebSocket = require("ws");
app.set("view engine", "ejs");
app.set('views', path.join(__dirname, 'views'));

app.use(bodyParser.json());
app.use(express.static("public"));
app.use("/views", express.static(__dirname + "/views"));

const wss = new WebSocket.Server({ port: 9090 });

const client = device({
  keyPath: "/home/chin/telecom-kmitl/key/private.pem.key",
  certPath: "/home/chin/telecom-kmitl/key/certificate.pem.crt",
  caPath: "/home/chin/telecom-kmitl/key/AmazonRootCA1.pem",
  clientId: "node",
  host: "a3tc60o8wobvo5-ats.iot.ap-southeast-1.amazonaws.com",
});

client.on("connect", () => {
  console.log("Connected to the broker");
  client.subscribe("device/25/data", (err) => {
    if (!err) {
      console.log("Subscribed to topic");
    }
  });
});

// Listen for MQTT messages and send them over the WebSocket connection
client.on("message", (topic, message) => {
  console.log(`Received message from topic ${topic}: ${message.toString()}`);
  wss.clients.forEach((client) => {
    client.send(message.toString());
  });
});

wss.on("connection", (ws) => {
  console.log("WebSocket client connected");

  // Send received message to client as soon as they connect
  client.on("message", (topic, message) => {
    console.log(`Received message from topic ${topic}: ${message.toString()}`);
    ws.send(message.toString());
  });
});

app.get("/", (req, res) => {
  res.render("index"); // Render index.ejs view when client first connects
});

// Run the server
let PORT = process.env.PORT || 9009;
httpServer.listen(PORT, () => {
    console.log(`Server beating 💓 on port: ${PORT}`)
});
