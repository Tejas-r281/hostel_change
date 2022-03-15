const express = require("express");

  const {addcomment,allcomment} = require("../controllers/suggestionController");
const { isAuthenticatedUser, authorizeRoles } = require("../middleware/auth");


  const router = express.Router();

router.route("/suggestion/comment").get(isAuthenticatedUser, addcomment);
router.route("/suggestion/allcomment").get(isAuthenticatedUser, allcomment);





module.exports = router;
