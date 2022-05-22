const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const mongodb = require("./db/connect");
const cors = require("cors");
const port = process.env.PORT || 8080;

const bucketlistRoutes = require("./routes/bucketlistRoutes");
// const userRoutes = require("./routes/userRoutes");

app.use(cors());
app.use(bodyParser.json());
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers"
  );
  next();
});
app.use("/bucketlist", bucketlistRoutes);
// app.use("/user", userRoutes);

mongodb.initDb((err) => {
  if (err) {
    console.log(err);
  } else {
    app.listen(port);
    console.log(`Connected to DB and listening on ${port}`);
  }
});
