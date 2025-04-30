const express = require('express')
const app = express()
const cors = require('cors')
const authRoutes = require("./routes/authRoutes")
const admintRoutes = require("./routes/adminRoutes")
const feddbackRoutes = require("./routes/feebackRoutes")
const productRoutes = require("./routes/productRoutes")
const dotenv = require("dotenv");

dotenv.config();
const connectDb = require("./config/connectDb")

connectDb()
app.use(express.json());
app.use(cors())
app.use("/auth", authRoutes)
app.use("/admin",admintRoutes)
app.use("/feeback",feddbackRoutes)
app.use("/product",productRoutes)




app.listen(process.env.PORT || 5000,() =>
{
    console.log("Port is running at 3000")
})