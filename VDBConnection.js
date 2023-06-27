const { Client } = require("vertica-nodejs");
const dbConnInfo = require("./config/config");

const client = new Client(dbConnInfo.vdb);

async function checkVerticaConnection() {
  try {
    client.connect();
    client.query(
      "SELECT 'Vertica DB Connection success' as connection",
      (err, res) => {
        console.log(err || res.rows[0]);
        client.end();
      }
    );
  } catch (err) {
    console.error(err.message);
  }
}

module.exports = checkVerticaConnection;
