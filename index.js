const express = require("express");
const app = express();
const port = 5000;

const mongoose = require("mongoose");

mongoose
  .connect(
    "mongodb+srv://eunji:379214@cluster0.at4bs.mongodb.net/myFirstDatabase?retryWrites=true&w=majority",
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  )
  .then(() => console.log("MongoDB Connected!"))
  .catch((err) => console.error(err));

app.get("/", (req, res) => res.send("Hello World"));

app.listen(port, () => console.log(`Listening on port ${port}!`));
