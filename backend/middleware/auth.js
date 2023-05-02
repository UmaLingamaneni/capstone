const jwt = require("jsonwebtoken");
const catchAsyncErrors = require("./catchAsyncErrors");
const resError = require("./errors");
const connectDatabase = require("../config/database");
var mysql = require("mssql");
//Check if user is authenticate or not

exports.isAuthenticatedUser = catchAsyncErrors(async (req, res, next) => {
  const { auth } = req.headers;
  if (!auth || auth == null || auth == "undefined") {
    return res.status(401).json({
      success: false,
      error: {
        message: `Please login into your account`,
      },
    });
  }

  //If token exists verify the user

  if (auth) {
    const decoded = jwt.verify(auth, process.env.JWT_SECRET);

    let sql = `SELECT * FROM login WHERE id='${decoded.id}'`;

    let pool = await mysql.connect(connectDatabase);
    const { recordset } = await pool.request().query(sql);
    console.log(recordset);

    req.user = recordset[0];
    next();
  }
});

// Handling User Roles

exports.authorizeRoles = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return res.status(403).json({
        success: false,
        error: {
          message: `${req.user.role} is not allowed to access this resource`,
        },
      });
    }
    next();
  };
};
