const { type } = require("express/lib/response");
const DButils = require("./DButils");

async function labelExpressions(commentId, username, ironic_markers, ironic_signals, positiv_negativ, ironic_victims, category,ironic_expression ){
    try{  
    await DButils.execQuery(
        `INSERT INTO labeledexpressions(comment_id, username,ironic_markers, ironic_signals, positiv_negativ, ironic_victims, category,ironic_expression)
         VALUES ('${commentId}', '${username}','${ironic_markers}', ${DButils.arrFormat(ironic_signals)},
           '${positiv_negativ}', ${DButils.arrFormat(ironic_victims)}, '${category}','${ironic_expression}')`
     ); }
  catch (err) {
    console.error("SQL error", err);
    throw err;
  }}
  
  async function NonIronicExpressions(commentId, username,category, non_ironic_expression ){
    try{  
    await DButils.execQuery(
        `INSERT INTO labeledexpressions(comment_id, username,category ,non_ironic_expression)
         VALUES ('${commentId}', '${username}','${category}','${non_ironic_expression}')`
     ); }
  catch (err) {
    console.error("SQL error", err);
    throw err;
  }}


  exports.labelExpressions = labelExpressions;
  exports.NonIronicExpressions = NonIronicExpressions;