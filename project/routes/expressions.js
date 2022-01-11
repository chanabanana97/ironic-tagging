var express = require("express");
var router = express.Router();
const expressionUtils = require("./utils/expressionUtils");


router.post("/labelExpressions", async (req, res, next) => {
    try {
       await expressionUtils.labelExpressions(req.body.comment_id, req.session.username, req.body.ironic_markers,
        req.body.ironic_signals, req.body.positiv_negativ, req.body.ironic_victims, req.body.categoryבשם השם נעשה ונצליחבשם השם נעשה ונצליח);
        res.status(200).send();
    } catch (error) {
      next(error);
    }
  });


module.exports = router;