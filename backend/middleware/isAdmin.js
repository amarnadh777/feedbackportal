const isAdmin = (req,res,next) =>
{
    try {


        if(!req.user)
        {
            res.status(401).json({ message: "Unauthorized: No user data" })
        }
           console.log( req.user.role !== "admin")
        if(!req.user.role == "user")
        {
            return res.status(403).json({ message: "Access denied: Admins only" });
        }

        next();
    } catch (error) {
        console.error("Admin check error:", error);
        res.status(500).json({ message: "Internal server error" });
    }
}
module.exports = isAdmin