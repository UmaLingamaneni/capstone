
module.exports = (err, req, res, next) => {


    return res.status(err.statusCode).json({
        success: false,
        error: {
            message: err.message
        }
    })



}