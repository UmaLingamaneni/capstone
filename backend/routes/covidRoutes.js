const express = require("express");
const {
  getdata,
  lowHighCov,
  defaultSqlComm,
  defaultcsvdownload,
} = require("../controllers/covidController");
const router = express.Router();
const { isAuthenticatedUser } = require("../middleware/auth");

router.route("/covid/data").get(isAuthenticatedUser, getdata);
router.route("/covid/ncontent").get(isAuthenticatedUser, lowHighCov);
router.route("/covid/default").post(isAuthenticatedUser, defaultSqlComm);

router
  .route("/covid/default/csv")
  .post(isAuthenticatedUser, defaultcsvdownload);

module.exports = router;
