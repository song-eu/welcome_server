const express = require('express');
const oracleDB = require('oracledb');
const dbConnInfo = require('../config/config');

const router = express.Router();

router.get('/', async(req, res, next) =>{
    //let conn
    try {
        // 외래 환자 쿼리 추가 필요
        console.log('Outpatient visit Get Request');
        console.log('dbConnInfo', dbConnInfo.dev);
        //conn = await oracleDB.getConnection(dbConnInfo.dev)
        res.send('Outpatient Visit Request')
    }
    catch(error) {
        console.log(error);
        res.status(202).send(error);
        next(error)
    } finally {
        // if(conn) {
        //     await conn.close();
        // }
    }
})

module.exports = router;