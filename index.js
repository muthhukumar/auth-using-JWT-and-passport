const express = require("express");
const passport = require("passport");
const bodyParser = require("body-parser");
const helmet = require("helmet");
const morgan = require("morgan");

const userRoute = require("./routes/userRoute");

const middlewares = require("./middleware/error-middleware");

require("dotenv").config();
require("./connection/mongoose");

const app = express();

app.use(bodyParser.json());
app.use(helmet());
app.use(
  morgan(":method :url :status :res[content-length] - :response-time ms")
);

app.use(passport.initialize());
require("./passport/strategy/jwt/index");
require("./passport/strategy/local/index");

app.use("/user", userRoute);

app.use(middlewares.routeNotFound);
app.use(middlewares.errorHandler);

app.listen(5000, () => {
  console.log("Serving at http://localhost:5000");
});
