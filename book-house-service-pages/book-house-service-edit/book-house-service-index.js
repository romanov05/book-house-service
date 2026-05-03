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
                        <input type="text" id="edit-title" class="form-control" value="${data.bookHouseServiceTitle || ''}">
                    </div>
                    <div class="mb-3">
                        <label class="form-label">Краткое описание</label>
                        <textarea id="edit-description" class="form-control" rows="2">${data.bookHouseServiceDescription || ''}</textarea>
                    </div>
                    <div class="mb-3">
                        <label class="form-label">Полное описание</label>
                        <textarea id="edit-full-description" class="form-control" rows="4">${data.bookHouseServiceFullDescription || ''}</textarea>
                    </div>
                    <div class="mb-3">
                        <label class="form-label">Цена</label>
                        <input type="text" id="edit-price" class="form-control" value="${data.bookHouseServicePrice || ''}">
                    </div>
                    <div class="mb-3">
                        <label class="form-label">Картинка (src)</label>
                        <input type="text" id="edit-src" class="form-control" value="${data.bookHouseServiceSrc || ''}">
                    </div>
                    <div class="mb-3">
                        <label class="form-label">3D модель (src .glb)</label>
                        <input type="text" id="edit-model-src" class="form-control" value="${data.bookHouseServiceModelSrc || ''}">
                    </div>
                    <div id="book-house-service-edit-error" class="text-danger mb-3"></div>
                    <button type="button" id="book-house-service-save-btn" class="btn book-house-service-custom-btn">Сохранить</button>
                </form>
            </div>
        `;
    }

    bookHouseServiceGoHome() {
        const bookHouseServiceMainPage = new BookHouseServiceMainPage(this.bookHouseServiceParent);
        bookHouseServiceMainPage.bookHouseServiceRender();
    }

    async bookHouseServiceSave() {
        const errorContainer = document.getElementById("book-house-service-edit-error");

        const payload = {
            bookHouseServiceTitle: document.getElementById("edit-title").value,
            bookHouseServiceDescription: document.getElementById("edit-description").value,
            bookHouseServiceFullDescription: document.getElementById("edit-full-description").value,
            bookHouseServicePrice: document.getElementById("edit-price").value,
            bookHouseServiceSrc: document.getElementById("edit-src").value,
            bookHouseServiceModelSrc: document.getElementById("edit-model-src").value
        };

        let result;
        if (this.bookHouseServiceId) {
            result = await ajax.patch(bookHouseServiceUrls.updateServiceById(this.bookHouseServiceId), payload);
        } else {
            result = await ajax.post(bookHouseServiceUrls.createService(), payload);
        }

        if (result.status >= 200 && result.status < 300) {
            this.bookHouseServiceGoHome();
        } else {
            if (errorContainer) {
                errorContainer.innerText = `Ошибка сохранения: статус ${result.status}`;
            }
        }
    }

    bookHouseServiceAddListeners() {
        const saveBtn = document.getElementById("book-house-service-save-btn");
        if (saveBtn) {
            saveBtn.addEventListener("click", () => this.bookHouseServiceSave());
        }
    }

    async bookHouseServiceRender() {
        this.bookHouseServiceParent.innerHTML = "";
        const bookHouseServiceHomeButton = new BookHouseServiceHomeButtonComponent(this.bookHouseServiceParent);
        bookHouseServiceHomeButton.bookHouseServiceRender(this.bookHouseServiceGoHome.bind(this));

        if (this.bookHouseServiceId) {
            const { data, status } = await ajax.get(bookHouseServiceUrls.getServiceById(this.bookHouseServiceId));

            if (status >= 200 && status < 300 && data) {
                const html = this.bookHouseServiceGetHTML(data);
                this.bookHouseServiceParent.insertAdjacentHTML('beforeend', html);
            } else {
                this.bookHouseServiceParent.insertAdjacentHTML('beforeend', `<div class="container mt-3 text-danger">Ошибка загрузки данных Fetch: ${status}</div>`);
            }
        } else {
            const html = this.bookHouseServiceGetHTML();
            this.bookHouseServiceParent.insertAdjacentHTML('beforeend', html);
        }

        this.bookHouseServiceAddListeners();
    }
}
