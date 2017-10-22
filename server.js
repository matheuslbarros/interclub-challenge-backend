const express = require('express');
const path = require('path');
const mongoose = require('mongoose');

const app = express();

const indexRoutes = require('./routes/api');
const { db } = require('./config');

mongoose.Promise = Promise;
mongoose.connect(db, { useMongoClient: true });

app.use('/api', indexRoutes);

app.use('*', (req, res) => {
    res.status(404).send('Not Found');
});

const PORT = 4000;
app.listen(PORT, function () {
    console.log(`Server listening on Port ${PORT}`);
});
