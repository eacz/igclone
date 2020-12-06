const express = require('express');
const app = express();
app.use(express.json({ extended: true }));
const mongoose = require('mongoose');
require('dotenv').config({ path: 'vars.env' });
const port = process.env.PORT || 4000;

//connect db
mongoose.connect(process.env.MONGO_DB, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: true,
});
mongoose.connection.on('connected', () => console.log('DB connecteddd'));
mongoose.connection.on('error', () => {
    console.log('DB not connected :(');
    process.exit();
});

//routes
const authRouter = require('./routes/auth');
app.use('/auth', authRouter);

app.listen(port, () => {
    console.log(`runninggg on ${port}`);
});
