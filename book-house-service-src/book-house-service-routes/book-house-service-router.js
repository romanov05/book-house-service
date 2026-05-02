const express = require('express');
const bookHouseServiceRouter = express.Router();
const bookHouseServiceCtrl = require('../book-house-service-controllers/book-house-service-controller');

bookHouseServiceRouter.get('/', bookHouseServiceCtrl.bookHouseServiceGetAll);
bookHouseServiceRouter.get('/:id', bookHouseServiceCtrl.bookHouseServiceGetOne);
bookHouseServiceRouter.post('/', bookHouseServiceCtrl.bookHouseServiceCreate);
bookHouseServiceRouter.patch('/:id', bookHouseServiceCtrl.bookHouseServiceUpdate);
bookHouseServiceRouter.delete('/:id', bookHouseServiceCtrl.bookHouseServiceDelete);

module.exports = bookHouseServiceRouter;
