const express = require("express");
const app = express();
const path = require("path");
const userRoutes = require('./routes/userRoutes');
const transferRoutes = require("./routes/transferRoutes")
const acountRoutes = require("./routes/acountTransfer")
const  mongoose = require("mongoose");
const connectDB = require('./config/database');
const cookieParser = require("cookie-parser")
const cors = require("cors")
connectDB()
// middleware
app.use(cookieParser())
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));
/**
 * ! database connections
 */
mongoose.connect(process.env.MONGODB_URI)

app.use('/user',userRoutes)
app.use('/transfer',transferRoutes)
app.use('/acount',acountRoutes)

const port = process.env.PORT || 8000
app.listen(port, () => console.log(` app listening on ${port} port `));
