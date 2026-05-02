const bookHouseServiceLogic = require('../book-house-service-services/book-house-service-logic-service');

exports.bookHouseServiceGetAll = (req, res) => res.json(bookHouseServiceLogic.bookHouseServiceFindAll(req.query.title));

exports.bookHouseServiceGetOne = (req, res) => {
    const item = bookHouseServiceLogic.bookHouseServiceFindOne(parseInt(req.params.id));
    item ? res.json(item) : res.status(404).json({ error: 'Not Found' });
};

exports.bookHouseServiceCreate = (req, res) => res.status(201).json(bookHouseServiceLogic.bookHouseServiceCreate(req.body));

exports.bookHouseServiceUpdate = (req, res) => {
    const item = bookHouseServiceLogic.bookHouseServiceUpdate(parseInt(req.params.id), req.body);
    item ? res.json(item) : res.status(404).json({ error: 'Not Found' });
};

exports.bookHouseServiceDelete = (req, res) => {
    bookHouseServiceLogic.bookHouseServiceRemove(parseInt(req.params.id)) ? res.status(204).send() : res.status(404).json({ error: 'Not Found' });
};
