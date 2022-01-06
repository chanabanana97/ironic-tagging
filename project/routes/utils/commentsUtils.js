const DButils = require("./DButils");

async function getCommentsOfPost(post_id) {
    try{
    let comments = await DButils.execQuery(
        `SELECT * FROM comments where post_id= '${post_id}'`
      );
    sorted = comments.sort((a,b) => a.index - b.index)
    return comments;
    }
catch (err) {
    console.error("SQL error", err);
    throw err;
  }
}

exports.getCommentsOfPost = getCommentsOfPost;
