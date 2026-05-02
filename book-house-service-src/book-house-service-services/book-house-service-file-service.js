const bookHouseServiceFs = require('fs');

const bookHouseServiceRead = (bookHouseServicePath) => {
    try {
        const bookHouseServiceContent = bookHouseServiceFs.readFileSync(bookHouseServicePath, 'utf8');
        return JSON.parse(bookHouseServiceContent);
    } catch (e) { return []; }
};

const bookHouseServiceWrite = (bookHouseServicePath, bookHouseServiceData) => {
    bookHouseServiceFs.writeFileSync(bookHouseServicePath, JSON.stringify(bookHouseServiceData, null, 2), 'utf8');
};

module.exports = { bookHouseServiceRead, bookHouseServiceWrite };
