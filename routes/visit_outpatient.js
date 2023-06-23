const moment = require("moment");
const express = require("express");
const oracleDB = require("oracledb");
const dbConnInfo = require("../config/config");

const router = express.Router();

router.get("/", async (req, res, next) => {
  //let conn
  try {
    // 외래 환자 쿼리 추가 필요
    console.log("Outpatient visit Get Request");
    console.log("dbConnInfo", dbConnInfo.dev);
    oracleDB.getConnection(dbConnInfo.dev, (err, con) => {
      if (err) {
        console.log("visit_outpatient oracle connect fail", err);
      }
      con.execute(
        "SELECT * FROM  D02760.temp_procedure_rank",
        {},
        { outFormat: oracleDB.OBJECT },
        (err, result) => {
          if (err) {
            console.log("visit_outpatient api error", err);
            res.send("fail!!");
          } else {
            // console.log("result : ", result.rows);
            //res.writeHead(200, {"ContentType":"text/html"});
            res.json(200, result.rows);
          }
        }
      );
    });
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

router.get("/personMap", async (req, res, next) => {
  //let conn
  try {
    // 외래 환자 쿼리 추가 필요
    console.log("Outpatient visit Get personMap Request");
    console.log("dbConnInfo", dbConnInfo.dev);
    console.log("req", req.query);
    let { id, voc_id, month } = req.query;
    oracleDB.getConnection(dbConnInfo.dev, (err, con) => {
      if (err) {
        console.log("visit_outpatient oracle connect fail", err);
      }
      if (id === "OP") {
        var query =
          "SELECT * FROM  D02760.temp_procedure_SIDO WHERE VOC_ID = '" +
          voc_id +
          "' AND \"DATE\" = '" +
          month.substring(0, 4) +
          "'";
        console.log("query", query);
      } else {
        var query =
          "SELECT * FROM  D02760.temp_condition_SIDO WHERE VOC_ID = '" +
          voc_id +
          "' AND \"DATE\" = '" +
          month.substring(0, 4) +
          "'";
        console.log("PERSON_MAP query", query);
      }

      con.execute(query, {}, { outFormat: oracleDB.OBJECT }, (err, result) => {
        if (err) {
          console.log("visit_outpatient api error", err);
          res.send(err);
        } else {
          console.log("result : ", result.rows);
          //res.writeHead(200, {"ContentType":"text/html"});

          res.json(200, result.rows);
        }
      });
    });
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

router.get("/deptRank", async (req, res, next) => {
  //let conn
  try {
    // 외래 환자 쿼리 추가 필요
    console.log("Outpatient visit Get personMap Request");
    console.log("dbConnInfo", dbConnInfo.dev);
    console.log("req", req.query);
    let { id, voc_id, month } = req.query;
    oracleDB.getConnection(dbConnInfo.dev, (err, con) => {
      if (err) {
        console.log("visit_outpatient oracle connect fail", err);
      }
      if (id === "OP") {
        var query =
          "SELECT * FROM  D02760.temp_procedure_DEPT WHERE VOC_ID = '" +
          voc_id +
          "' AND \"DATE\" = '" +
          month.substring(0, 4) +
          "'";
        console.log("query", query);
      } else {
        var query =
          "SELECT * FROM  D02760.temp_condition_DEPT WHERE VOC_ID = '" +
          voc_id +
          "' AND \"DATE\" = '" +
          month.substring(0, 4) +
          "'";
        console.log("query", query);
      }

      con.execute(query, {}, { outFormat: oracleDB.OBJECT }, (err, result) => {
        if (err) {
          console.log("visit_outpatient api error", err);
          res.send(err);
        } else {
          //   console.log("result : ", result.rows);
          //res.writeHead(200, {"ContentType":"text/html"});

          res.json(200, result.rows);
        }
      });
    });
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

router.get("/labRank", async (req, res, next) => {
  //let conn
  try {
    // 외래 환자 쿼리 추가 필요
    console.log("Outpatient visit Get personMap Request");
    console.log("dbConnInfo", dbConnInfo.dev);
    console.log("req", req.query);
    let { id, voc_id, month } = req.query;
    oracleDB.getConnection(dbConnInfo.dev, (err, con) => {
      if (err) {
        console.log("visit_outpatient oracle connect fail", err);
      }
      if (id === "OP") {
        var query =
          "SELECT * FROM  D02760.temp_procedure_LAB WHERE VOC_ID = '" +
          voc_id +
          "' AND \"DATE\" = '" +
          month.substring(0, 4) +
          "' AND ROWNUM < 40";
        console.log("query", query);
      } else {
        var query =
          "SELECT * FROM  D02760.temp_condition_LAB WHERE VOC_ID = '" +
          voc_id +
          "' AND \"DATE\" = '" +
          month.substring(0, 4) +
          "' AND ROWNUM < 40";
        console.log("query", query);
      }

      con.execute(query, {}, { outFormat: oracleDB.OBJECT }, (err, result) => {
        if (err) {
          console.log("visit_outpatient api error", err);
          res.send(err);
        } else {
          //   console.log("result : ", result.rows);
          //res.writeHead(200, {"ContentType":"text/html"});

          res.json(200, result.rows);
        }
      });
    });
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

router.get("/monthlyStat", async (req, res, next) => {
  //let conn
  // SELECT * FROM D02760.temp_condition_MONTHLY
  // WHERE voc_id = 'D00000031'
  // AND "DATE" BETWEEN '2020-01' AND '2020-12';
  try {
    // 외래 환자 쿼리 추가 필요
    console.log("Outpatient visit Get monthlyStat Request");
    console.log("dbConnInfo", dbConnInfo.dev);
    console.log("req", req.query);
    let { id, voc_id, month } = req.query;
    oracleDB.getConnection(dbConnInfo.dev, (err, con) => {
      if (err) {
        console.log("visit_outpatient oracle connect fail", err);
      }
      if (id === "OP") {
        var query =
          "SELECT * FROM  D02760.temp_procedure_MONTHLY WHERE VOC_ID = '" +
          voc_id +
          "' AND \"DATE\" BETWEEN '" +
          moment(month).subtract(11, "month").format("YYYY-MM") +
          "' AND '" +
          month +
          "'";
        console.log("query", query);
      } else {
        var query =
          "SELECT * FROM  D02760.temp_condition_MONTHLY WHERE VOC_ID = '" +
          voc_id +
          "' AND \"DATE\" BETWEEN '" +
          moment(month).subtract(11, "month").format("YYYY-MM") +
          "' AND '" +
          month +
          "'";
        console.log("query", query);
      }

      con.execute(query, {}, { outFormat: oracleDB.OBJECT }, (err, result) => {
        if (err) {
          console.log("visit_outpatient api error", err);
          res.send(err);
        } else {
          //   console.log("result : ", result.rows);
          //res.writeHead(200, {"ContentType":"text/html"});

          res.json(200, result.rows);
        }
      });
    });
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

module.exports = router;
