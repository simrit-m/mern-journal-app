require('dotenv').config();
const mongoose = require('mongoose');

mongoose.set('strictQuery', false);
mongoose.connect(process.env.DB_URL)
    .then(() => console.log('Connected MongoDB')).catch((e) => console.log(e));