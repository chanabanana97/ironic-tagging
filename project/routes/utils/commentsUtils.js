const DButils = require("./DButils");
const { type } = require("express/lib/response");


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

async function labelcomments(commentId, username, pre_comment ,with_politition , against_politition, 
  with_party, against_party, with_group,against_group,not_authentic,
  why_not_authentic, free_text){
  try{  
  await DButils.execQuery(
      `INSERT INTO labeledcomments VALUES ('${commentId}', '${username}','${pre_comment}', array[${arrFormat(with_politition)}],
      array[${arrFormat(against_politition)}] ,array[${arrFormat(with_party)}],
      array[${arrFormat(against_party)}],array[${arrFormat(with_group)}],
      array[${arrFormat(against_group)}], '${not_authentic}','${why_not_authentic}','${free_text}')`
    );
  }
catch (err) {
  console.error("SQL error", err);
  throw err;
}}

function arrFormat(arr){
  if (typeof(arr) == 'string')
    return `'${arr}'`;
  else
    return arr.map(str => `'${str}'`).join(',');
}

exports.getCommentsOfPost = getCommentsOfPost;
exports.labelcomments = labelcomments;