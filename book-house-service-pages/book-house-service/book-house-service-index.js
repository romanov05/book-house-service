import { BookHouseServiceHomeButtonComponent } from "../../book-house-service-components/book-house-service-home-button/book-house-service-index.js";
import { BookHouseServiceDetailComponent } from "../../book-house-service-components/book-house-service-detail/book-house-service-index.js";
import { BookHouseServiceMainPage } from "../book-house-service-main/book-house-service-index.js";

export class BookHouseServicePage {
    constructor(bookHouseServiceParent, bookHouseServiceId, bookHouseServiceAllServices) {
        this.bookHouseServiceParent = bookHouseServiceParent;
        this.bookHouseServiceId = bookHouseServiceId;
        this.bookHouseServiceAllServices = bookHouseServiceAllServices;
    }

    bookHouseServiceGetData() {
        return this.bookHouseServiceAllServices.find(bookHouseServiceItem => bookHouseServiceItem.bookHouseServiceId === this.bookHouseServiceId) || this.bookHouseServiceAllServices[0];
    }

    get bookHouseServicePageRoot() {
        return document.getElementById("book-house-service-page");
    }

    bookHouseServiceGetHTML() {
        return `<div id="book-house-service-page" class="container mt-3"></div>`;
    }

    bookHouseServiceGoHome() {
        const bookHouseServiceMainPage = new BookHouseServiceMainPage(this.bookHouseServiceParent);
        bookHouseServiceMainPage.bookHouseServiceRender();
    }

    bookHouseServiceRender() {
        this.bookHouseServiceParent.innerHTML = "";
        const bookHouseServiceHomeButton = new BookHouseServiceHomeButtonComponent(this.bookHouseServiceParent);
        bookHouseServiceHomeButton.bookHouseServiceRender(this.bookHouseServiceGoHome.bind(this));

        const bookHouseServiceHtml = this.bookHouseServiceGetHTML();
        this.bookHouseServiceParent.insertAdjacentHTML('beforeend', bookHouseServiceHtml);

        const bookHouseServiceData = this.bookHouseServiceGetData();
        const bookHouseServiceDetail = new BookHouseServiceDetailComponent(this.bookHouseServicePageRoot);
        bookHouseServiceDetail.bookHouseServiceRender(bookHouseServiceData);
    }
}
