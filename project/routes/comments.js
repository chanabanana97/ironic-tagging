var express = require("express");
var router = express.Router();
const commentsUtils = require("./utils/commentsUtils");

router.get("/getCommentsOfPost/:postId", async (req, res, next) => {
    try {
        console.log(req.params.postId);
        const comments = await commentsUtils.getCommentsOfPost(req.params.postId);
        res.status(200).send(comments);
    } catch (error) {
      next(error);
    }
  });


  module.exports = router;