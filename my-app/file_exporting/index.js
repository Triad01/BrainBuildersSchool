const express = require("express");
const app = express();

app;
app.get("/", (req, res) => {
  res.send("We got your request on our server");
  console.log("Incoming reques on our server");
});

app.listen(3000, () => {
  console.log("Listening for all incoming requests on port 3000");
});
