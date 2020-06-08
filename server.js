const express = require("express");
const mongoose = require("mongoose");

const cors = require("cors");

require("dotenv").config();
const { errorHandler } = require("./middleware");
const infantRouter = require("./api/infantRouter");
const authRouter = require("./api/authRouter");

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cors());

//init body-parser

mongoose.connect(process.env.DB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).catch(err => {
    console.log(err);
});
mongoose.set("useCreateIndex", true);
mongoose.set("useFindAndModify", false);

mongoose.connection.once("open", () => {
    console.log("Connected to database");
});


app.use("/api/auth", authRouter);
app.use("/api/infants", infantRouter);
app.use(errorHandler);

app.listen(process.env.PORT || 5000, () => console.log("Now listening for requests on port 5000"));
