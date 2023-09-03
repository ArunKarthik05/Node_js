const express = require("express");
const server = express();

server.get("/", (req, res) => {
  res.json({
    message: "Vankkam da maapla SERVER la irunthu😉😉",
    port: `${port}`,
  });
});
const port = 2000;
server.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
