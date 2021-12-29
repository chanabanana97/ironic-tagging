const DButils = require("./DButils");

async function getCommentsOfPost(post_id) {
    try{
    const comments = await DButils.execQuery(
        `SELECT * FROM comments where post_id= '${post_id}'`
      );
    return comments;
    }
catch (err) {
    console.error("SQL error", err);
    throw err;
  }
}

exports.getCommentsOfPost = getCommentsOfPost;
