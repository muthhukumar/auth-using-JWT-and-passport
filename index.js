const express = require("express");
const passport = require("passport");
const bodyParser = require("body-parser");
const helmet = require("helmet");
const morgan = require("morgan");
const rateLimit = require("express-rate-limit");

const userRoute = require("./routes/userRoute");

const middlewares = require("./middleware/error-middleware");

require("dotenv").config();
require("./connection/mongoose");

const app = express();

const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100,
});

const createAccountLimiter = rateLimit({
  windowMs: 60 * 60 * 1000, // 1 hour window
  max: 5, // start blocking after 5 requests
  message:
    "Too many accounts created from this IP, please try again after an hour",
});

app.use(apiLimiter);
app.use(bodyParser.json());
app.use(helmet());
app.use(
  morgan(":method :url :status :res[content-length] - :response-time ms")
);

app.use(passport.initialize());
require("./passport/strategy/jwt/index");
require("./passport/strategy/local/index");

app.use("/user", createAccountLimiter, userRoute);

app.use(middlewares.routeNotFound);
app.use(middlewares.errorHandler);

app.listen(5000, () => {
  console.log("Serving at http://localhost:5000");
});
