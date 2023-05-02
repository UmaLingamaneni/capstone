const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const connectDatabase = require("../config/database");
var mysql = require("mssql");
const csv = require("fast-csv");
exports.getdata = catchAsyncErrors(async (req, res, next) => {
  try {
    const { to, from, type } = req.query;

    console.log(to, from);

    const sql =
      type == 1
        ? ` [dbo].[GetSubLocationDistribution]
		@Continent = NULL,
		@Country = NULL,
		@State_or_Province = NULL,
		@sub_region_1 = NULL,
		@sub_region_2 = NULL,
		@sub_region_3 = NULL,
		@sub_region_4 = NULL,
		@StartDate = NULL,
		@EndDate = NULL


        `
        : `SELECT TOP 5 
        CASE 
            WHEN CHARINDEX('/', Location) > 0 AND CHARINDEX('/', Location, CHARINDEX('/', Location)+1) > 0 
            THEN SUBSTRING(Location, CHARINDEX('/', Location)+1, CHARINDEX('/', Location, CHARINDEX('/', Location)+1) - CHARINDEX('/', Location) - 1) 
            ELSE SUBSTRING(Location, CHARINDEX('/', Location)+1, LEN(Location)-1) 
        END AS Country, 
        COUNT(*) AS TotalCases
        FROM tempdata
        GROUP BY 
        CASE 
            WHEN CHARINDEX('/', Location) > 0 AND CHARINDEX('/', Location, CHARINDEX('/', Location)+1) > 0 
            THEN SUBSTRING(Location, CHARINDEX('/', Location)+1, CHARINDEX('/', Location, CHARINDEX('/', Location)+1) - CHARINDEX('/', Location) - 1) 
            ELSE SUBSTRING(Location, CHARINDEX('/', Location)+1, LEN(Location)-1)  
        END
        ORDER BY TotalCases DESC;`;

    let pool = await mysql.connect(connectDatabase);
    const { recordsets } = await pool.request().query(sql);

    return res.status(200).json({
      success: true,
      data: recordsets,
    });
  } catch (error) {
    console.log(error);
  }
});

exports.lowHighCov = catchAsyncErrors(async (req, res, next) => {
  try {
    let sql = ` [dbo].[GetMaxNContentwithLowCoverage];`;

    let pool = await mysql.connect(connectDatabase);
    const { recordset } = await pool.request().query(sql);

    sql = `  [dbo].[CoverageDistribution]
    `;

    const data = await pool.request().query(sql);

    return res.status(200).json({
      success: true,
      lowCovergeMin: recordset,
      counts: data?.recordsets,
    });
  } catch (error) {
    console.log(error);
  }
});

exports.defaultSqlComm = catchAsyncErrors(async (req, res, next) => {
  try {
    const { sql } = req.body;

    let pool = await mysql.connect(connectDatabase);
    const data = await pool.request().query(sql);

    return res.status(200).json({
      success: true,
      data: data?.recordsets,
    });
  } catch (error) {
    console.log(error);
  }
});

exports.defaultcsvdownload = catchAsyncErrors(async (req, res, next) => {
  try {
    // const { sql } = req.body;
    // connectDatabase.stream=true;
    // mysql.connect(connectDatabase, (err) => {
    //   if (err) throw err;

    //   const request = new mysql.Request();
    //   request.stream = true; // enable streaming

    //   const stream = request.query(sql).stream();
    //   res.setHeader("Content-Disposition", "attachment; filename=mydata.csv");
    //   res.setHeader("Content-Type", "text/csv");

    //   const csvStream = csv.format({ headers: true });
    //   csvStream.pipe(res);

    //   stream.on("data", (row) => {
    //     csvStream.write(row);
    //   });

    //   stream.on("end", () => {
    //     csvStream.end();
    //   });

    //   stream.on("error", (err) => {
    //     console.error(err);
    //     res.status(500).send("Internal Server Error");
    //   });
    // });
  } catch (error) {
    console.log(error);
  }
});
