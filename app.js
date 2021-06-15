const express = require("express");
require("dotenv").config();
const mongoose = require("mongoose");
//import routes
const userRoutes=require('./routes/user')
const morgan = require('morgan');
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const { use } = require("./routes/user");
const expressValidator = require("express-validator");

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
//routes niddleware, prepended with /api
app.use('/api',userRoutes);


const port = process.env.PORT || 8000;

app.listen(port, () => {
  console.log(`server is running on ${port}`);
});
