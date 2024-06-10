const express =require("express");
const errorHandler = require("./middleware/errorhandler");
const connectDb = require("./config/dbConnection");
const expressAsyncHandler = require("express-async-handler");



connectDb();
const dotenv=require('dotenv').config();
const expressLayout= require("express-ejs-layouts")


const app=express();

const port= process.env.PORT || 5000;

// template engine
app.use(expressLayout);
app.set('layout','./layouts/main');
app.set('view engine','ejs');
// app.set('views', path.join(__dirname, 'views'));

// app.get('',(req,res)=>{
//     res.send("Welcome to the Host Site")
// })

app.use(express.static('public'));

app.use("/",require('./routes/main'))

app.use(express.json());
app.use("/api/contacts",require("./routes/contactRoutes"));
app.use("/api/users",require("./routes/userRoutes"));
app.use(errorHandler);

app.listen(port, () => {
    console.log('Server running on port '+ port);
})