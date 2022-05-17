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
    try {
      console.log(req.params.postId);
      await commentsUtils.labelcomments(req.body.commentId, req.body.username, req.body.pre_comment, req.body.with_politition,
        req.body.against_politition, req.body.with_party, req.body.against_party,
        req.body.with_group, req.body.against_group,req.body.not_authentic,
        req.body.why_not_authentic, req.body.free_text, req.body.index_in_webpage);
        res.status(200).send();
    }
    catch (error) {
      next(error);
    }
  });

  router.post("/unidentifycomment", async (req, res, next) => {
    try {
       await commentsUtils.unidentifycomment(req.body.commentId, req.body.username, req.body.category, req.body.positive_identification, req.body.index_in_webpage);
        res.status(200).send();
    }
    catch (error) {
      next(error);
    }
  });



  module.exports = router;