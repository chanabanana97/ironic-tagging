const { type } = require("express/lib/response");
const DButils = require("./DButils");

async function labelExpressions(commentId, username, ironic_markers, ironic_signals, positiv_negativ, ironic_victims, category ){
    try{  
    await DButils.execQuery(
        `INSERT INTO labeledexpressions(comment_id, username,ironic_markers, ironic_signals, positiv_negativ, ironic_victims, category)
         VALUES ('${commentId}', '${username}','${ironic_markers}', array[${arrFormat(ironic_signals)}],
           '${positiv_negativ}', array[${arrFormat(ironic_victims)}], '${category}')`
     ); }
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

  exports.labelExpressions = labelExpressions;