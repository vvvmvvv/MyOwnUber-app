const express = require('express');
const app = express();
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const cors = require('cors');

const PORT = 5000;

const authRoute = require('./routes/api/auth');
const truckRoute = require('./routes/api/trucks');
const loadRoute = require('./routes/api/loads');
const userRoute = require('./routes/api/user');

dotenv.config();

mongoose.connect(process.env.DB_CONNECT, { useFindAndModify: false, useNewUrlParser: true, useUnifiedTopology: true}, () => 
    console.log("Database connected!")
);

app.use(express.json({ extended: false }))
app.use(cors());

app.use('/api/user', userRoute);
app.use('/api/trucks', truckRoute);
app.use('/api/loads', loadRoute);
app.use('/api/auth', authRoute);

app.listen(PORT, () => {
    console.log(`server listenin at ${PORT}`);
});