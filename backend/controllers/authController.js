const ErrorHandler = require("../utilis/errorHandler");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const connectDatabase = require("../config/database");
const crypto = require("crypto");
const validator = require("validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const resError = require("../middleware/errors");
const sendToken = require("../utilis/jwtToken");
var mysql = require("mssql");

// Login => api/v1/login
exports.login = catchAsyncErrors(async (req, res, next) => {
  const { email, password } = req.body;

  // var sql = `CREATE TABLE login (id int NOT NULL AUTO_INCREMENT,email varchar(255) NOT NULL UNIQUE,password varchar(255),name varchar(255),role varchar(255),PRIMARY KEY (id))`;
  console.log(email);

  let sql = `SELECT * FROM login WHERE email='${email}'`;

  let pool = await mysql.connect(connectDatabase);
  const { recordset } = await pool.request().query(sql);

  console.log(recordset);

  if (recordset?.length <= 0) {
    return resError(
      {
        message: "User does not exist with this email",
        statusCode: 401,
      },
      req,
      res,
      next
    );
  }

  const isPasswordMatch = await bcrypt.compare(password, recordset[0].password);

  console.log(isPasswordMatch);

  if (!isPasswordMatch) {
    return resError(
      {
        message: "Please enter correct password",
        statusCode: 401,
      },
      req,
      res,
      next
    );
  }

  sendToken(recordset[0], 200, res);

  pool.close();
});

exports.currentUser = catchAsyncErrors(async (req, res, next) => {
  try {
    const sql = `SELECT * FROM login WHERE id="${req.user.id}"`;

    let pool = await mysql.connect(connectDatabase);
    const { recordset } = await pool.request().query(sql);

    return res.status(200).json({
      success: true,
      user: recordset[0],
    });
  } catch (error) {
    next(error);
  }
});

exports.register = catchAsyncErrors(async (req, res, next) => {
  try {
    const { name, email, password } = req.body;
    // var sql = `CREATE TABLE login (id int NOT NULL IDENTITY(1,1),email varchar(255) NOT NULL UNIQUE,password varchar(255),name varchar(255),PRIMARY KEY (id))`;

    const hashpassword = await bcrypt.hash(password, 10);

    const sql = `INSERT INTO login(email,password,name) VALUES('${email}','${hashpassword}','${name}')`;

    let pool = await mysql.connect(connectDatabase);
    const register = await pool.request().query(sql);

    return res.status(200).json({
      success: true,
    });
  } catch (error) {
    console.log(error);
  }
});
