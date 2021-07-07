const express = require('express');
const dotenv = require('dotenv');
const morgan = require('morgan');
const cors = require('cors')

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

// '/' path message
app.get('/', (req, res) => {
    res.send('Hello World');
})

app.listen(PORT, function(){
    console.log(`Welcome Server is running on port ${PORT}`);
})