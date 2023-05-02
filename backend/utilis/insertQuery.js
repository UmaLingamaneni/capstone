const insertData = (table, data) => {
    return (

        `; INSERT INTO ${table} (${Object.keys(
            data
        ).toString()} ) VALUES (${Object.values(data).map(
            (item) => "'" + item + "'"
        )})`
    )
}

module.exports=insertData;