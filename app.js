const express = require('express');
const dotenv = require('dotenv');
const app = express();
const port = process.env.PORT || 3000;
const morgan = require('morgan');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const userRoute = require('./route/route.user');

dotenv.config();
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan("dev"));



mongoose.connect(process.env.MONGODB_URI, {
    useUnifiedTopology: true,
    useNewUrlParser: true
}).then(() => {
    console.log("Connected Successfully!");
}).catch((err) => {
    console.log(err)
})


app.use('/api', userRoute);





app.listen(port, () => { console.log(`Server started on port ${port}`); });