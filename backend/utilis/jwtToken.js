// Create,Send and Save the Token in Cookie
const jwt = require('jsonwebtoken');

const sendToken = (user, statusCode, res) => {

    //Create JWT Token

    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
        expiresIn: "7d"
    })

    

    res.status(statusCode).json({
        success:true,
        token,
        user
    })
}

module.exports = sendToken;