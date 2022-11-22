const express = require("express");
const app = express();
require("dotenv").config();
require("./config/dbConfig");
const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
