const DButils = require("./DButils");
const { type } = require("express/lib/response");


async function getCommentsOfPost(post_id) {
    try{
    let comments = await DButils.execQuery(
        `SELECT * FROM comments WHERE post_id= '${post_id}'`
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
  why_not_authentic, free_text, index_in_webpage){
  try{  
  await DButils.execQuery(
      `INSERT INTO labeledcomments VALUES ('${commentId}', '${username}','${pre_comment}', ${DButils.arrFormat(with_politition)},
      ${DButils.arrFormat(against_politition)} ,${DButils.arrFormat(with_party)},
     ${DButils.arrFormat(against_party)},${DButils.arrFormat(with_group)},
      ${DButils.arrFormat(against_group)}, '${not_authentic}','${why_not_authentic}','${free_text}', '${index_in_webpage}') ON CONFLICT (comment_id, username) DO UPDATE SET (pre_comment, 
        with_politition, against_politition, with_party, against_party, with_group, against_group, not_authentic, why_not_authentic, free_text, index_in_webpage)=('${pre_comment}',
        ${DButils.arrFormat(with_politition)},
      ${DButils.arrFormat(against_politition)} ,${DButils.arrFormat(with_party)},
     ${DButils.arrFormat(against_party)},${DButils.arrFormat(with_group)},
      ${DButils.arrFormat(against_group)}, '${not_authentic}','${why_not_authentic}','${free_text}', '${index_in_webpage}')`
    );
  }
  catch (err) {
    console.error("SQL error", err);
    throw err;
  }
}

async function unidentifycomment(commentId, username, category, identification, index_in_webpage){
  try{  
    await DButils.execQuery(
      `INSERT INTO labeledcomments VALUES ('${commentId}', '${username}') ON CONFLICT (comment_id, username) DO NOTHING`
    );
    await DButils.execQuery(
      `UPDATE labeledcomments SET (${category}, index_in_webpage)=(${identification}, ${index_in_webpage}) WHERE comment_id='${commentId}' AND username='${username}'`
    );
  }
  catch (err) {
    console.error("SQL error", err);
    throw err;
  }
}


exports.getCommentsOfPost = getCommentsOfPost;
exports.labelcomments = labelcomments;
exports.unidentifycomment = unidentifycomment;