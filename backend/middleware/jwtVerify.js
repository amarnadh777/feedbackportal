const jwt = require('jsonwebtoken')
const jwtVerify = (req,res,next) =>
{
    const authHeader = req.headers['authorization'];
    if(!authHeader) 
    {
        return res.status(401).json({
            message: 'Access denied. No token provided.'
          });
    }

    const token = authHeader.split(" ")[1];
    try {
        const decode = jwt.verify(token,"secret")

        req.user = decode
    
        next()
    } catch (error) {
        return res.status(401).json({
            message: 'Invalid or expired token.'
          });
    }

}

module.exports = jwtVerify