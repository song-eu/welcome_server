require("dotenv").config();

module.exports = {
  dev: {
    user: process.env.DBUSERNAME,
    password: process.env.PASSWORD,
    connectString: process.env.DBURL,
  },
  vdb: {
    host: process.env.VDBURL,
    port: process.env.VPORT,
    database: process.env.VDB,
    user: process.env.VUNAME,
    password: process.env.VPASS,
  },
};
