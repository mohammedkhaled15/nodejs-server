const express = require("express");
const router = express.Router();
const { handelNewUser } = require("../controllers/registerController");

router.route("/").post(handelNewUser);

module.exports = router;
