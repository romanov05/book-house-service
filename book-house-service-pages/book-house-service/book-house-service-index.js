import { BookHouseServiceHomeButtonComponent } from "../../book-house-service-components/book-house-service-home-button/book-house-service-index.js";
import { BookHouseServiceDetailComponent } from "../../book-house-service-components/book-house-service-detail/book-house-service-index.js";
import { BookHouseServiceMainPage } from "../book-house-service-main/book-house-service-index.js";
import { ajax } from "../../book-house-service-modules/book-house-service-ajax.js";
import { bookHouseServiceUrls } from "../../book-house-service-modules/book-house-service-urls.js";

export class BookHouseServicePage {
    constructor(bookHouseServiceParent, bookHouseServiceId) {
        this.bookHouseServiceParent = bookHouseServiceParent;
        this.bookHouseServiceId = bookHouseServiceId;
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

    bookHouseServiceGetData() {
        ajax.get(bookHouseServiceUrls.getServiceById(this.bookHouseServiceId), (data, status) => {
            if (status >= 200 && status < 300 && data) {
                const bookHouseServiceDetail = new BookHouseServiceDetailComponent(this.bookHouseServicePageRoot);
                bookHouseServiceDetail.bookHouseServiceRender(data);
            } else {
                if (this.bookHouseServicePageRoot) {
                    this.bookHouseServicePageRoot.innerHTML = `<p class="text-danger">Ошибка XHR: не удалось получить данные карточки.</p>`;
                }
            }
        });
    }

    bookHouseServiceRender() {
        this.bookHouseServiceParent.innerHTML = "";
        const bookHouseServiceHomeButton = new BookHouseServiceHomeButtonComponent(this.bookHouseServiceParent);
        bookHouseServiceHomeButton.bookHouseServiceRender(this.bookHouseServiceGoHome.bind(this));

        const bookHouseServiceHtml = this.bookHouseServiceGetHTML();
        this.bookHouseServiceParent.insertAdjacentHTML('beforeend', bookHouseServiceHtml);

        this.bookHouseServiceGetData();
    }
}
