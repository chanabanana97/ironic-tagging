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

  router.post("/labelcomments", async (req, res, next) => {
    console.log(req.body.commentId);
    console.log(req.body.with_politition);
    try {
       await commentsUtils.labelcomments(req.body.commentId, req.session.username,req.body.pre_comment ,req.body.with_politition,
        req.body.against_politition, req.body.with_party, req.body.against_party,
        req.body.with_group, req.body.against_group,req.body.not_authentic,
        req.body.why_not_authentic, req.body.free_text);
        res.status(200).send();
    } catch (error) {
      next(error);
    }
  });



  module.exports = router;