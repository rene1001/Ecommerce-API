const express = require('express');
const mongoose = require("mongoose"); 
const dotenv = require('dotenv');   
const authRoute = require("./routes/auth")
const userRoute = require("./routes/user")
const productRoute = require("./routes/product")

const app = express();
dotenv.config();

//Mongodb connection
mongoose
        .connect(process.env.MONGO_URL)
        .then(() => console.log("connected successfully to Mongodb"))
        .catch((error) => console.log(error));

//middlewares
app.use(express.json());
app.use("/api/auth", authRoute);
app.use("/api/users", userRoute);
app.use("/api/product", productRoute);


//port for listenig
const PORT = process.env.PORT || 8000;

app.listen(PORT, ()=>console.log(`Running on port ${PORT}`) );
