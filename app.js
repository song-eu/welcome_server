const express = require("express");
const dotenv = require("dotenv");
const morgan = require("morgan");
const cors = require("cors");

const checkConnection = require("./DBconnection");
// routes 선언
const visitOutpatientRouter = require("./routes/visit_outpatient");

dotenv.config();

const PORT = process.env.PORT;

const app = express();
let corsOption = {
  origin: "http://localhost:3000", // 허락하는 요청 주소
  credentials: true, // true로 하면 설정한 내용을 response 헤더에 추가 해줍니다.
};

// logging middleware
app.use(morgan("dev"));
// cors 설정
app.use(cors());

// express body-pasor
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// '/' path message
app.get("/", (req, res) => {
  checkConnection();
  res.send("Hello World");
});

app.use("/api/visitOut", visitOutpatientRouter);

app.listen(PORT, function () {
  console.log(`Welcome Server is running on port ${PORT}`);
});
