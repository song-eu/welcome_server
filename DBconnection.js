const oracledb = require('oracledb');
const dbConnInfo = require('./config/config');
//oracledb.initOracleClient({libDir: '/Users/eunhyesong/oracle/instantclient_19_8'});0
//oracledb.initOracleClient({libDir: 'C:\\oracle\\instantclient_19_12'});
//oracledb.initOracleClient({libDir: 'C:\oracle\instantclient_19_12'});


//windows set up

async function checkConnection() {
    try {
    console.log('dbconnInfo', dbConnInfo.dev)
      var connection = await oracledb.getConnection(dbConnInfo.dev);
      console.log('connected to database');
    } catch (err) {
      console.error(err.message);
    } finally {
      if (connection) {
        try {
          // Always close connections
          await connection.close(); 
          console.log('close connection success');
        } catch (err) {
          console.error(err.message);
        }
      }
    }
  }


module.exports = checkConnection;