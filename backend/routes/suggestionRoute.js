const express = require("express");

const {
  addcomment,
  allcomment,
  like,
  dislike,
  commentsDetails
} = require("../controllers/suggestionController");
const { isAuthenticatedUser, authorizeRoles } = require("../middleware/auth");

const router = express.Router();

router.route("/suggestion/comment").get(isAuthenticatedUser, addcomment);
router.route("/suggestion/allcomment").get(isAuthenticatedUser, allcomment);
router.route("/suggestion/like/:id").put(isAuthenticatedUser, like);
router.route("/suggestion/dislike/:id").put(isAuthenticatedUser, dislike);
router.route("/suggestion/commentdetail/:id").get(isAuthenticatedUser, commentsDetails);

module.exports = router;
