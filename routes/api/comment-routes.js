const router = require("express").Router();
const {
  addComment,
  removeComment,
  addReply,
  removeReply,
} = require("../../controllers/comment-controller");

// /api/comments/<pizzaId>
router.route("/:pizzaId").post(addComment);

// /api/comments/<pizzaId>/<commentId>
//the add reply is a PUT route instead of a post, because we are technically 
//just updating the comment resource.
router.route("/:pizzaId/:commentId").put(addReply).delete(removeComment);

//It's kind of like saying, "Go to this pizza, 
//then look at this particular comment, then delete this one reply."
router.route('/:pizzaId/:commentId/:replyId').delete(removeReply);

module.exports = router;
