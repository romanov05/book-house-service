class BookHouseServiceUrls {
    constructor() {
        this.baseUrl = 'http://localhost:3000';
    }

    getServices(title = '') {
        const url = `${this.baseUrl}/services`;

        if (title && title.trim() !== "") {
            return `${url}?title=${title}`;
        }

        return url;
    }

    getServiceById(id) {
        return `${this.baseUrl}/services/${id}`;
    }

    createService() {
        return `${this.baseUrl}/services`;
    }

    removeServiceById(id) {
        return `${this.baseUrl}/services/${id}`;
    }

    updateServiceById(id) {
        return `${this.baseUrl}/services/${id}`;
    }
}

export const bookHouseServiceUrls = new BookHouseServiceUrls();
