const allowedOrigins = require("./allowedOrigins");

const corsOptions = {
  origin: (myOrigin, callback) => {
    // console.log(myOrigin);
    if (allowedOrigins.indexOf(myOrigin) !== -1 || !myOrigin) {
      callback(null, true);
    } else {
      // console.log(myOrigin);
      callback(new Error("Not allowed by CORS"));
    }
  },
  optionSuccessStatus: 200,
};

module.exports = corsOptions;
