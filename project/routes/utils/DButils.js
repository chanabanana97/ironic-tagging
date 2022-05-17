require("dotenv").config({path: 'project/.env'})
// require("dotenv").config()

const {Pool} = require("pg");

const config = {
  user: process.env.tedious_username,
  host: process.env.tedious_server,
  database: process.env.tedious_database,
  password: process.env.tedious_password,
  port: process.env.PORT,
};


const pool = new Pool(config);
const poolConnect = pool.connect();

exports.execQuery = async function (query) {
  await poolConnect;
  try {
    var result = await pool.query(query);
    return result.rows;
  } catch (err) {
    console.error("SQL error", err);
    throw err;
  }
};


exports.arrFormat = function(arr){
{
    if (arr == '') // no input
      return null;
    if (typeof(arr) == 'string')
      return `array['${arr}']`;
    else
      arrStr = arr.map(str => `'${str}'`).join(',');
      return `array[${arrStr}]`
  }
}
// process.on("SIGINT", function () {
//   if (pool) {
//     pool.close(() => console.log("connection pool closed"));
//   }
// });

// poolConnect.then(() => {
//   console.log("pool closed");

//   return sql.close();
// });

// exports.execQuery = function (query) {
//   return new Promise((resolve, reject) => {
//     sql
//       .connect(config)
//       .then((pool) => {
//         return pool.request().query(query);
//       })
//       .then((result) => {
//         // console.log(result);
//         sql.close();
//         resolve(result.recordsets[0]);
//       })
//       .catch((err) => {
//         // ... error checks
//       });
//   });
// };
