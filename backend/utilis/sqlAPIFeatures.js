const connectDatabase = require('../config/database')
const resError = require('../middleware/errors');


const apiFeatures = (req, res, next, type, query) => {
  console.log(query);


  //Sorting of query
  if (!query.orderBy || !query.order) {
    query.orderBy = "id";
    query.order = "ASC";
  }

  // SELECT QUERY of sql with foreign key and without foreign key
  //Foreign key query format table_name/field1,field2,field3/table_id-table2_name/field1,field2,field3/table2_id

  sql = query.foreignkey ? `SELECT ${type}.*,${query.foreignkey.split('-').map((item) => (
    item.split('/')[1].split(',').map((foreignField) => (
      item.split('/')[0] + "." + foreignField
    ))
  )
  )} FROM ${type} ${query.foreignkey.split('-').map((item) => (
    "INNER JOIN " + item.split('/')[0] + " ON " + type + "." + item.split('/')[2] + " = " + item.split('/')[0] + "." + (item.split('/')[3] ? item.split('/')[3] : item.split('/')[2])
  )).join(" ")}` : `SELECT * FROM ${type} `


  //Count of query

  countsql = `SELECT COUNT(*) as dataCount FROM ${type}`


  //SearchBy and keyword of query
  if (query.searchBy && query.keyword) {
    sql += ` WHERE ${query.searchBy.split(",").map((item) => (item + " LIKE " + `'%${query.keyword}%'`)).join(" OR ")}`
    countsql += ` WHERE ${query.searchBy.split(",").map((item) => (item + " LIKE " + `'%${query.keyword}%'`)).join(" OR ")}`
  }


  const notInclude = ["limit", "page", "orderBy", "order", "searchBy", "keyword", "foreigntable", "foreignfields", "foreignkey"];

  //Filter of query

  const filterArr = Object.keys(query).filter((item) => notInclude.indexOf(item) == -1);

  if (filterArr?.length > 0) {
    filterArr.forEach((item, index) => {
      index == 0 ? sql += ` WHERE ${item} ${query[item].includes('<') || query[item].includes('>') || query[item].includes('!') ? query[item] : "= " + query[item]}` :
        sql += ` AND ${item} ${query[item].includes('<') || query[item].includes('>') || query[item].includes('!') ? query[item] : "= " + query[item]}`

      index == 0 ? countsql += ` WHERE ${item} ${query[item].includes('<') || query[item].includes('>') || query[item].includes('!') ? query[item] : "= " + query[item]}` :
        countsql += ` AND ${item} ${query[item].includes('<') || query[item].includes('>') || query[item].includes('!') ? query[item] : "= " + query[item]}`
    })
  }



  console.log(sql);
  //Sorting of query

  sql += ` ORDER BY ${query.orderBy} ${query.order}`

  //pagination of query

  if (query.limit && query.page) {
    sql += ` LIMIT ${query.limit} OFFSET ${query.page * query.limit}`
  }

  sql += `; ${countsql}`

  connectDatabase.query(sql, async (err, result) => {
    if (err) {
      console.log(err)

      return resError({
        message: "Internal Server Error",
        statusCode: 500
      }, req, res, next);

    };

    const data = {
      [type]: result[0],
      count: result[1][0]
    }

    console.log(data);

    res.status(200).json({
      success: true,
      data: data
    });



  });
}


module.exports = apiFeatures;