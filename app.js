const express = require("express");
require("dotenv").config();
const mongoose = require("mongoose");
const morgan = require('morgan');
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const cors = require('cors');
const { use } = require("./routes/auth");
const expressValidator = require("express-validator");

//import routes
const authRoutes=require('./routes/auth')
const userRoutes=require('./routes/user')
const categoryRoutes=require('./routes/category')
const productRoutes=require('./routes/product')
//app
const app = express();

//db connection
mongoose
  .connect(process.env.DATABASE, {
    useNewUrlParser: true,
    useCreateIndex: true,
  })
  .then(() => console.log("DB connected"));
//Middlewares

app.use(morgan('dev'));
app.use(bodyParser.json());
//recommended
// app.use(express.urlencoded({ extended: true }))
//or
// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(expressValidator()); // v 5.3.1 express-validator is only stable
//routes middleware, prepended with /api
app.use(cors());
app.use('/api',authRoutes);
app.use('/api',userRoutes);
app.use("/api",categoryRoutes);
app.use("/api",productRoutes);

const port = process.env.PORT || 8000;

app.listen(port, () => {
  console.log(`server is running on ${port}`);
});
