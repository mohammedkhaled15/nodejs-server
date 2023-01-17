require("dotenv").config();
const express = require("express");
const app = express();
const path = require("path");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const { logger } = require("./middleware/logEvents");
const corsOptions = require("./config/corsOptions");
const errorHandler = require("./middleware/errorHandler");
const verifyJWT = require("./middleware/verifyJWT");
const credientials = require("./middleware/credientials");
const mongoose = require("mongoose");
const connectDB = require("./config/dbConn");
const PORT = process.env.PORT || 3500;

connectDB();

app.use(logger);

app.use(credientials);

app.use(cors(corsOptions));

app.use(express.urlencoded({ extended: false }));

app.use(express.json());

app.use(cookieParser());

//serve static pages
app.use("/", express.static(path.join(__dirname, "/public")));

//Public routes
app.use("/", require("./routes/root"));
app.use("/register", require("./routes/registerUser"));
app.use("/auth", require("./routes/auth"));
app.use("/refresh", require("./routes/refreshToken"));
app.use("/logout", require("./routes/logout"));

// Private Routes
app.use(verifyJWT); // JWT verfiction middleware
app.use("/employees", require("./routes/api/employees"));
app.use("/users", require("./routes/api/Users"));
app.use("/users", require("./routes/api/getAllUsersRouter"));

app.all("*", (req, res) => {
  if (req.accepts("html")) {
    res.sendFile(path.join(__dirname, "views", "404.html"));
  } else if (req.accepts("json")) {
    res.json({ error: "404 Not found" });
  } else {
    res.type("txt").send("404 Not Found ");
  }
});

app.use(errorHandler);

mongoose.connection.once("open", () => {
  console.log("connected to MongoDB");
  app.listen(PORT, () => {
    console.log(`Server Running on port ${PORT}`);
  });
});
