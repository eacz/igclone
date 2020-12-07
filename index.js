const express = require('express');

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

//initialize app
const app = express();
app.use(express.json({ extended: true }));
//routes
const authRouter = require('./routes/auth');
const postRouter = require('./routes/post');
app.use('/auth', authRouter);
app.use('/post', postRouter);

app.listen(port, () => {
    console.log(`runninggg on ${port}`);
});
