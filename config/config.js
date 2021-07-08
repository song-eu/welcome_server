require('dotenv').config();

module.exports = {
    dev: {
        user:process.env.USER,
        password: process.env.PASSWORD,
        connectString: process.env.DBURL
    },
    sup: {

    }
}