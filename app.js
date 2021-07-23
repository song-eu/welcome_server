const express = require('express');
const dotenv = require('dotenv');
const morgan = require('morgan');
const cors = require('cors');
const dbConnInfo = require('./config/config');
// routes 선언
const visitOutpatientRouter = require('./routes/visit_outpatient');

dotenv.config();

const PORT = process.env.PORT;

const app = express();

// logging middleware 
app.use(morgan('dev'))
// cors 설정
app.use(cors())

// express body-pasor
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


const oracledb = require('oracledb');
let connection;


// checkConnection asycn function
async function checkConnection() {
  try {
    oracledb.initOracleClient({configDir: 'C:\oracle\instantclient_19_11'});
    connection = await oracledb.getConnection(dbConnInfo.dev);
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


// '/' path message
app.get('/', (req, res) => {
    checkConnection();
    res.send('Hello World');
})



app.use('/api/visitOut', visitOutpatientRouter);

app.listen(PORT, function(){
    console.log(`Welcome Server is running on port ${PORT}`);
})