require('dotenv').config();

module.exports = {
    dev: {
        user:process.env.USERNAME,
        password: process.env.PASSWORD,
        connectString: process.env.DBURL
    },
    sup: {

    }
}