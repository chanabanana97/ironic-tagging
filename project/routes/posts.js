var express = require("express");
var router = express.Router();
const postsUtils = require("./utils/postsUtils");

router.get("/getPostsOfPolitician/:politicianName", async (req, res, next) => {
    try {
        const postsIds = await postsUtils.getPostIdsFromPolitician(req.params.politicianName);
        res.status(200).send(postsIds);
    } catch (error) {
      next(error);
    }
  });

  router.get("/getPostFromId/:postId", async (req, res, next) => {
    try {
        const post = await postsUtils.getPostFromId(req.params.postId);
        res.status(200).send(post);
    } catch (error) {
      next(error);
    }
  });

  router.post("/labelPost", async (req, res, next) => {
    console.log(req.body.subject);
    try {
       await postsUtils.labelPost(req.body.postId, req.session.username, req.body.subject, req.body.style, 
        req.body.emotion, req.body.freeText);
        res.status(200).send();
    } catch (error) {
      next(error);
    }
  });

  router.get("/getPostsFromCategory", async (req, res, next) => {
    try {
        let posts = []
        const postIds = await postsUtils.getPostIdsByCategory(req.query.category, req.query.label);
        //get all details of each post from the postIds
        for (const postId of postIds)
        {
          let post = await postsUtils.getPostFromId(postId.post_id);
          posts.push(post);
        }
        res.status(200).send(posts);
    } catch (error) {
      next(error);
    }
  });



  module.exports = router;