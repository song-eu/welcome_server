require('dotenv').config();

module.exports = {
    dev: {
        user:process.env.DBUSERNAME,
        password: process.env.PASSWORD,
        connectString: process.env.DBURL
    },
    sup: {

    }
}