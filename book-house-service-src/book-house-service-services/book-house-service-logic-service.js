const bookHouseServiceFile = require('./book-house-service-file-service');
let bookHouseServicePath;

const bookHouseServiceInit = (path) => { bookHouseServicePath = path; };

const bookHouseServiceFindAll = (bookHouseServiceTitle) => {
    const bookHouseServiceData = bookHouseServiceFile.bookHouseServiceRead(bookHouseServicePath);
    return bookHouseServiceTitle
        ? bookHouseServiceData.filter(i => i.bookHouseServiceTitle.toLowerCase().includes(bookHouseServiceTitle.toLowerCase()))
        : bookHouseServiceData;
};

const bookHouseServiceFindOne = (bookHouseServiceId) => {
    return bookHouseServiceFile.bookHouseServiceRead(bookHouseServicePath)
        .find(i => i.bookHouseServiceId === bookHouseServiceId);
};

const bookHouseServiceCreate = (bookHouseServicePayload) => {
    const bookHouseServiceData = bookHouseServiceFile.bookHouseServiceRead(bookHouseServicePath);
    const bookHouseServiceId = bookHouseServiceData.length > 0 ? Math.max(...bookHouseServiceData.map(i => i.bookHouseServiceId)) + 1 : 1;
    const bookHouseServiceNew = { bookHouseServiceId, ...bookHouseServicePayload };
    bookHouseServiceData.push(bookHouseServiceNew);
    bookHouseServiceFile.bookHouseServiceWrite(bookHouseServicePath, bookHouseServiceData);
    return bookHouseServiceNew;
};

const bookHouseServiceUpdate = (bookHouseServiceId, bookHouseServicePayload) => {
    const bookHouseServiceData = bookHouseServiceFile.bookHouseServiceRead(bookHouseServicePath);
    const bookHouseServiceIdx = bookHouseServiceData.findIndex(i => i.bookHouseServiceId === bookHouseServiceId);
    if (bookHouseServiceIdx === -1) return null;
    bookHouseServiceData[bookHouseServiceIdx] = { ...bookHouseServiceData[bookHouseServiceIdx], ...bookHouseServicePayload };
    bookHouseServiceFile.bookHouseServiceWrite(bookHouseServicePath, bookHouseServiceData);
    return bookHouseServiceData[bookHouseServiceIdx];
};

const bookHouseServiceRemove = (bookHouseServiceId) => {
    const bookHouseServiceData = bookHouseServiceFile.bookHouseServiceRead(bookHouseServicePath);
    const bookHouseServiceNewData = bookHouseServiceData.filter(i => i.bookHouseServiceId !== bookHouseServiceId);
    if (bookHouseServiceData.length === bookHouseServiceNewData.length) return false;
    bookHouseServiceFile.bookHouseServiceWrite(bookHouseServicePath, bookHouseServiceNewData);
    return true;
};

module.exports = { bookHouseServiceInit, bookHouseServiceFindAll, bookHouseServiceFindOne, bookHouseServiceCreate, bookHouseServiceUpdate, bookHouseServiceRemove };
