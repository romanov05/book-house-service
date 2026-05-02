import { BookHouseServiceHomeButtonComponent } from "../../book-house-service-components/book-house-service-home-button/book-house-service-index.js";
import { BookHouseServiceMainPage } from "../book-house-service-main/book-house-service-index.js";
import { ajax } from "../../book-house-service-modules/book-house-service-ajax.js";
import { bookHouseServiceUrls } from "../../book-house-service-modules/book-house-service-urls.js";

export class BookHouseServiceEditPage {
    constructor(bookHouseServiceParent, bookHouseServiceId = null) {
        this.bookHouseServiceParent = bookHouseServiceParent;
        this.bookHouseServiceId = bookHouseServiceId;
    }

    get bookHouseServicePageRoot() {
        return document.getElementById("book-house-service-edit-page");
    }

    bookHouseServiceGetHTML(data = {}) {
        const title = this.bookHouseServiceId ? "Редактирование услуги" : "Добавление новой услуги";
        return `
            <div id="book-house-service-edit-page" class="container mt-3">
                <h2 class="mb-4">${title}</h2>
                <form id="book-house-service-form">
                    <div class="mb-3">
                        <label class="form-label">Название</label>
                        <input type="text" class="form-control" value="${data.bookHouseServiceTitle || ''}">
                    </div>
                    <div class="mb-3">
                        <label class="form-label">Краткое описание</label>
                        <textarea class="form-control" rows="2">${data.bookHouseServiceDescription || ''}</textarea>
                    </div>
                    <div class="mb-3">
                        <label class="form-label">Полное описание</label>
                        <textarea class="form-control" rows="4">${data.bookHouseServiceFullDescription || ''}</textarea>
                    </div>
                    <div class="mb-3">
                        <label class="form-label">Цена</label>
                        <input type="text" class="form-control" value="${data.bookHouseServicePrice || ''}">
                    </div>
                    <div class="mb-3">
                        <label class="form-label">Картинка (src)</label>
                        <input type="text" class="form-control" value="${data.bookHouseServiceSrc || ''}">
                    </div>
                </form>
            </div>
        `;
    }

    bookHouseServiceGoHome() {
        const bookHouseServiceMainPage = new BookHouseServiceMainPage(this.bookHouseServiceParent);
        bookHouseServiceMainPage.bookHouseServiceRender();
    }

    bookHouseServiceRender() {
        this.bookHouseServiceParent.innerHTML = "";
        const bookHouseServiceHomeButton = new BookHouseServiceHomeButtonComponent(this.bookHouseServiceParent);
        bookHouseServiceHomeButton.bookHouseServiceRender(this.bookHouseServiceGoHome.bind(this));

        if (this.bookHouseServiceId) {
            ajax.get(bookHouseServiceUrls.getServiceById(this.bookHouseServiceId), (data, status) => {
                if (status >= 200 && status < 300 && data) {
                    const html = this.bookHouseServiceGetHTML(data);
                    this.bookHouseServiceParent.insertAdjacentHTML('beforeend', html);
                } else {
                    this.bookHouseServiceParent.insertAdjacentHTML('beforeend', `<div class="container mt-3 text-danger">Ошибка загрузки данных XHR: ${status}</div>`);
                }
            });
        } else {
            const html = this.bookHouseServiceGetHTML();
            this.bookHouseServiceParent.insertAdjacentHTML('beforeend', html);
        }
    }
}
