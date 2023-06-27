const moment = require("moment");
const express = require("express");
const { Client } = require("vertica-nodejs");
const dbConnInfo = require("../config/config");
// const client = new Client(dbConnInfo.vdb);
// const checkVerticaConnection = require("../VDBConnection");

const verticaRouter = express.Router();

verticaRouter.get("/", async (req, res, next) => {
  //let conn
  try {
    // 외래 환자 쿼리 추가 필요
    console.log("Outpatient visit Get Request Vertica Request");
    console.log("dbConnInfo", dbConnInfo.vdb);
    const queryStringRoot = "SELECT * FROM  D02760.temp_procedure_rank";
    var client = new Client(dbConnInfo.vdb);
    client.connect();
    client.query(queryStringRoot, (err, ress) => {
      // console.log(err || ress);

      res.json(200, ress.rows[0]);
      client.end();
    });
    //conn = await oracleDB.getConnection(dbConnInfo.dev)
    //res.send('Outpatient Visit Request')
  } catch (error) {
    console.log(error);
    // res.status(202).send(error);
    next(error);
  } finally {
    // if(conn) {
    //     await conn.close();
    // }
  }
});
verticaRouter.get("/barChart", async (req, res, next) => {
  //let conn
  try {
    // 외래 환자 쿼리 추가 필요
    // console.log("Outpatient visit Get Request Vertica Request");
    // console.log("dbConnInfo", dbConnInfo.vdb);
    const queryStringRoot = "SELECT * FROM  D02760.temp_BARCHART";
    var client = new Client(dbConnInfo.vdb);
    client.connect();
    client.query(queryStringRoot, (err, ress) => {
      // console.log(err || ress);

      res.json(200, ress.rows);
      client.end();
    });
    //conn = await oracleDB.getConnection(dbConnInfo.dev)
    //res.send('Outpatient Visit Request')
  } catch (error) {
    console.log(error);
    // res.status(202).send(error);
    next(error);
  } finally {
    // if(conn) {
    //     await conn.close();
    // }
  }
});

verticaRouter.get("/ageGender", async (req, res, next) => {
  //let conn
  try {
    let { id, voc_id, month } = req.query;
    // // 외래 환자 쿼리 추가 필요
    // console.log("Outpatient visit Get Request Vertica Request");
    // console.log("dbConnInfo", dbConnInfo.vdb);
    const queryStringPage =
      "SELECT * FROM  D02760.temp_procedure_AGE WHERE VOC_ID = '" +
      voc_id +
      "' AND \"DATE\" = '" +
      month.substring(0, 4) +
      "'";
    const queryStringCage =
      "SELECT * FROM  D02760.temp_condition_AGE WHERE VOC_ID = '" +
      voc_id +
      "' AND \"DATE\" = '" +
      month.substring(0, 4) +
      "'";
    var client = new Client(dbConnInfo.vdb);
    client.connect();
    if (id === "OP") {
      client.query(queryStringPage, (err, result) => {
        // console.log(result.rows);
        res.json(200, result.rows);
        client.end();
      });
    } else {
      // console.log(queryStringCPmap);
      client.query(queryStringCage, (err, result) => {
        // console.log(err || result.rows);
        res.json(200, result.rows);
        client.end();
      });
    }
    //conn = await oracleDB.getConnection(dbConnInfo.dev)
    //res.send('Outpatient Visit Request')
  } catch (error) {
    console.log(error);
    // res.status(202).send(error);
    next(error);
  } finally {
    // if(conn) {
    //     await conn.close();
    // }
  }
});

verticaRouter.get("/personMap", async (req, res, next) => {
  //let conn
  try {
    // 외래 환자 쿼리 추가 필요
    // console.log("Outpatient visit Get personMap Request");
    // console.log("dbConnInfo", dbConnInfo.dev);
    // console.log("req", req.query);
    let { id, voc_id, month } = req.query;
    // console.log(req.query);
    const queryStringPPmap =
      "SELECT * FROM  D02760.temp_procedure_SIDO WHERE VOC_ID = '" +
      voc_id +
      "' AND \"DATE\" = '" +
      month.substring(0, 4) +
      "'";
    // console.log(queryStringPPmap);
    const queryStringCPmap =
      "SELECT * FROM  D02760.temp_condition_SIDO WHERE VOC_ID = '" +
      voc_id +
      "' AND \"DATE\" = '" +
      month.substring(0, 4) +
      "'";
    var client = new Client(dbConnInfo.vdb);
    client.connect();
    if (id === "OP") {
      client.query(queryStringPPmap, (err, result) => {
        // console.log(result);
        res.json(200, result.rows);
        client.end();
      });
    } else {
      // console.log(queryStringCPmap);
      client.query(queryStringCPmap, (err, result) => {
        // console.log(err || result.rows);
        res.json(200, result.rows);
        client.end();
      });
    }
    //conn = await oracleDB.getConnection(dbConnInfo.dev)
    //res.send('Outpatient Visit Request')
  } catch (error) {
    console.log(error);
    res.status(202).send(error);
    next(error);
  } finally {
    // if(conn) {
    //     await conn.close();
    // }
  }
});

verticaRouter.get("/deptRank", async (req, res, next) => {
  //let conn
  try {
    // 외래 환자 쿼리 추가 필요
    // console.log("Outpatient visit Get personMap Request");
    // console.log("dbConnInfo", dbConnInfo.dev);
    // console.log("req", req.query);
    let { id, voc_id, month } = req.query;
    const queryStringCdept =
      "SELECT * FROM  D02760.temp_condition_DEPT WHERE VOC_ID = '" +
      voc_id +
      "' AND \"DATE\" = '" +
      month.substring(0, 4) +
      "'";
    const queryStringPdept =
      "SELECT * FROM  D02760.temp_procedure_DEPT WHERE VOC_ID = '" +
      voc_id +
      "' AND \"DATE\" = '" +
      month.substring(0, 4) +
      "'";
    var client = new Client(dbConnInfo.vdb);
    client.connect();
    if (id === "OP") {
      client.query(queryStringPdept, (err, result) => {
        // console.log(result.rows);
        res.json(200, result.rows);
        client.end();
      });
    } else {
      client.query(queryStringCdept, (err, result) => {
        // console.log(err || res.rows);
        res.json(200, result.rows);
        client.end();
      });
    }
    //conn = await oracleDB.getConnection(dbConnInfo.dev)
    //res.send('Outpatient Visit Request')
  } catch (error) {
    console.log(error);
    res.status(202).send(error);
    next(error);
  } finally {
    // if(conn) {
    //     await conn.close();
    // }
  }
});

verticaRouter.get("/labRank", async (req, res, next) => {
  //let conn
  try {
    // 외래 환자 쿼리 추가 필요
    // console.log("Outpatient visit Get personMap Request");
    // console.log("dbConnInfo", dbConnInfo.dev);
    // console.log("req", req.query);
    let { id, voc_id, month } = req.query;
    const queryStringClab =
      "SELECT * FROM  D02760.temp_condition_LAB WHERE VOC_ID = '" +
      voc_id +
      "' AND \"DATE\" = '" +
      month.substring(0, 4) +
      "' limit 40;";
    const queryStringPlab =
      "SELECT * FROM  D02760.temp_procedure_LAB WHERE VOC_ID = '" +
      voc_id +
      "' AND \"DATE\" = '" +
      month.substring(0, 4) +
      "' limit 40;";
    var client = new Client(dbConnInfo.vdb);
    client.connect();
    if (id === "OP") {
      client.query(queryStringPlab, (err, result) => {
        // console.log(result);
        res.json(200, result.rows);
        client.end();
      });
    } else {
      client.query(queryStringClab, (err, result) => {
        // console.log(queryStringClab);
        res.json(200, result.rows);
        client.end();
      });
    }

    //conn = await oracleDB.getConnection(dbConnInfo.dev)
    //res.send('Outpatient Visit Request')
  } catch (error) {
    console.log(error);
    res.status(202).send(error);
    next(error);
  } finally {
    // if(conn) {
    //     await conn.close();
    // }
  }
});

verticaRouter.get("/monthlyStat", async (req, res, next) => {
  //let conn
  // SELECT * FROM D02760.temp_condition_MONTHLY
  // WHERE voc_id = 'D00000031'
  // AND "DATE" BETWEEN '2020-01' AND '2020-12';
  try {
    // 외래 환자 쿼리 추가 필요
    // console.log("Outpatient visit Get monthlyStat Request");
    // console.log("dbConnInfo", dbConnInfo.dev);
    // console.log("req", req.query);
    let { id, voc_id, month } = req.query;
    const queryStringCmonth =
      "SELECT * FROM  D02760.temp_condition_MONTHLY WHERE VOC_ID = '" +
      voc_id +
      "' AND \"DATE\" BETWEEN '" +
      moment(month).subtract(11, "month").format("YYYY-MM") +
      "' AND '" +
      month +
      "'";
    const queryStringPmonth =
      "SELECT * FROM  D02760.temp_procedure_MONTHLY WHERE VOC_ID = '" +
      voc_id +
      "' AND \"DATE\" BETWEEN '" +
      moment(month).subtract(11, "month").format("YYYY-MM") +
      "' AND '" +
      month +
      "'";
    var client = new Client(dbConnInfo.vdb);
    client.connect();
    if (id === "OP") {
      client.query(queryStringPmonth, (err, result) => {
        // console.log(result);
        res.json(200, result.rows);
        client.end();
      });
    } else {
      client.query(queryStringCmonth, (err, result) => {
        // console.log(result);
        res.json(200, result.rows);
        client.end();
      });
    }
    //conn = await oracleDB.getConnection(dbConnInfo.dev)
    //res.send('Outpatient Visit Request')
  } catch (error) {
    console.log(error);
    res.status(202).send(error);
    next(error);
  } finally {
    // if(conn) {
    //     await conn.close();
    // }
  }
});

module.exports = verticaRouter;
