//Main entry file
const express = require("express");
const bodyParser = require("body-parser");
const HttpError = require("./models/http-error");
const userRoutes = require("./routes/user-routes");
const placesRoutes = require("./routes/places-routes");
const mongoose = require("mongoose");

const app = express();

app.use(bodyParser.json());
app.use("/api/places", placesRoutes);
app.use("/api/users", userRoutes);

//Could not find route
app.use((req, res, next) => {
  const error = new HttpError("Could not find route", 404);
  throw error;
});
//special error handling function
app.use((error, req, res, next) => {
  if (res.headersSent) {
    return next(error);
  }
  res.status(error.code || 500);
  res.json({ message: error.message || "Unknown error occured" });
});
//connect backend before connecting to port
const connectConfig = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true
};
const connectUrl =
  "mongodb+srv://tfkim67:kevin0105@cluster0-prukk.mongodb.net/test?retryWrites=true&w=majority ";
mongoose
  .connect(connectUrl, connectConfig)
  .then(() => {
    app.listen(5000);
  })
  .catch(err => {
    console.log(err);
  });
