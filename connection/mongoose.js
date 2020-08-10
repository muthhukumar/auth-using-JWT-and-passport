const mongoose = require("mongoose");

const mongoURI = process.env.mongoURI;

mongoose.connect(mongoURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

mongoose.connection.on("connected", () => {
  console.log("MongoDB connection established");
});

mongoose.connection.on("disconnected", () => {
  console.log("MongoDB connection disconnected");
});

mongoose.connection.on("error ", (error) => {
  console.log("Error in mongodb connection : ", error.message);
});

process.on("SIGINT", function () {
  mongoose.connection.close(() => {
    process.exit(0);
  });
});
