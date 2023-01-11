const express = require("express");
const ROLES_LIST = require("../../config/rolesList");
const { getAllUsers, deleteUser } = require("../../controllers/userController");
const verifyRoles = require("../../middleware/verifyRoles");
const router = express.Router();

router.route("/").get(verifyRoles(ROLES_LIST.Admin), getAllUsers);
router.route("/:id").delete(verifyRoles(ROLES_LIST.Admin), deleteUser);

module.exports = router;
