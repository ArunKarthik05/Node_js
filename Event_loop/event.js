const EventEmitter = require("events");
const http = require("http");

const myEmitter = new EventEmitter();

myEmitter.on("newSale", () => {
  console.log("There was a newsale");
});

myEmitter.on("newSale", () => {
  console.log("Arun");
});

myEmitter.on("newSale", (stock) => {
  console.log(`There ere now ${stock} items left`);
});
myEmitter.emit("newSale", 9);
/////////SERVER

const server = http.createServer();

server.on("request", (req, res) => {
  console.log("Request recieved");
  res.end("Request recieved");
});

server.on("request", (req, res) => {
  console.log("Request recieved 2");
});

server.on("close", () => {
  console.log("Closed");
});

server.listen(8000, "127.0.0.1", () => {
  console.log("Waiting for requests");
});
