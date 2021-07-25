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
        oracleDB.getConnection(dbConnInfo.dev, (err, con) => {
            if(err){
                console.log('visit_outpatient oracle connect fail', err);
            }
            con.execute('SELECT * FROM HR.SAMPLE_DATA', {}, {outFormat:oracleDB.OBJECT},(err, result) => {
                if(err){
                    console.log("visit_outpatient api error", err);
                    res.send("fail!!");
                }else{
                    console.log("result : ",result.rows);
                    //res.writeHead(200, {"ContentType":"text/html"});
                    res.json(200, result.rows);
                }
            })

        })
        //conn = await oracleDB.getConnection(dbConnInfo.dev)
        //res.send('Outpatient Visit Request')
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