class BookHouseServiceUrls {
    constructor() {
        this.baseUrl = 'http://localhost:3000';
    }

    getServices(title = '') {
        const url = `${this.baseUrl}/book-house-service`;

        if (title && title.trim() !== "") {
            return `${url}?title=${title}`;
        }

        return url;
    }

    getServiceById(id) {
        return `${this.baseUrl}/book-house-service/${id}`;
    }

    createService() {
        return `${this.baseUrl}/book-house-service`;
    }

    removeServiceById(id) {
        return `${this.baseUrl}/book-house-service/${id}`;
    }

    updateServiceById(id) {
        return `${this.baseUrl}/book-house-service/${id}`;
    }
}

export const bookHouseServiceUrls = new BookHouseServiceUrls();
