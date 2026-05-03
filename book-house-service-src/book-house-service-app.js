const express = require('express');
const path = require('path');
const bookHouseServiceRouter = require('./book-house-service-routes/book-house-service-router');
const bookHouseServiceLogic = require('./book-house-service-services/book-house-service-logic-service');

const bookHouseServiceApp = express();
const bookHouseServicePort = 3000;

const bookHouseServiceDataPath = path.join(__dirname, 'book-house-service-data/book-house-service-data.json');
bookHouseServiceLogic.bookHouseServiceInit(bookHouseServiceDataPath);

bookHouseServiceApp.use(express.json());

bookHouseServiceApp.use((req, res, next) => {
    const bookHouseServiceTimestamp = new Date().toISOString();
    const decodedUrl = decodeURI(req.url);
    console.log(`[${bookHouseServiceTimestamp}] ${req.method} ${decodedUrl}`);
    next();
});

bookHouseServiceApp.use(express.static(path.join(__dirname, '../public')));

bookHouseServiceApp.use('/services', bookHouseServiceRouter);

bookHouseServiceApp.get(/.*/, (req, res) => {
    res.sendFile(path.join(__dirname, '../public', 'index.html'));
});

bookHouseServiceApp.listen(bookHouseServicePort, () => {
    console.log(`[BOOK-HOUSE-SERVICE] Running on http://localhost:${bookHouseServicePort}`);
});
