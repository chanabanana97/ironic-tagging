const { type } = require("express/lib/response");
const DButils = require("./DButils");

async function getPostIdsFromPolitician(politicianName) {
    try{
    const postIds = await DButils.execQuery(
        `SELECT post_id, created_time FROM posts where politician_name= '${politicianName}' ORDER BY created_time`
      );
    return postIds;
    }
catch (err) {
    console.error("SQL error", err);
    throw err;
  }

}

async function getPostFromId(postId) {
    try{
    const post = await DButils.execQuery(
        `SELECT * FROM posts where post_id= '${postId}'`
      );
    return post;
    }
catch (err) {
    console.error("SQL error", err);
    throw err;
  }

}

async function labelPost(postId, username, subject, style, emotion, freeText) {
  try{  
  await DButils.execQuery(
      `INSERT INTO labeledPosts VALUES ('${postId}', '${username}', ${DButils.arrFormat(subject)}, 
     ${DButils.arrFormat(style)}, ${DButils.arrFormat(emotion)}, '${freeText}')`
    );
  }
catch (err) {
  console.error("SQL error", err);
  throw err;
}}



async function getPostIdsByCategory(category, label) { 
  /* category is name of column. for example: subject, style..
  label is the name of the label given in the category (by a user) for example: political
  */
  try{
    const post_ids = await DButils.execQuery(
        `SELECT post_id FROM labeledPosts WHERE ('${label}' = ANY (${category}))`
      );
    return post_ids;
  }
catch (err) {
  console.error("SQL error", err);
  throw err;
}}

exports.getPostIdsFromPolitician = getPostIdsFromPolitician
exports.getPostFromId = getPostFromId
exports.labelPost = labelPost;
exports.getPostIdsByCategory = getPostIdsByCategory;