import { BookHouseServiceHomeButtonComponent } from "../../book-house-service-components/book-house-service-home-button/book-house-service-index.js";
import { BookHouseServiceCardComponent } from "../../book-house-service-components/book-house-service-card/book-house-service-index.js";
import { BookHouseServicePage } from "../book-house-service/book-house-service-index.js";
import { BookHouseServiceEditPage } from "../book-house-service-edit/book-house-service-index.js";
import { ajax } from "../../book-house-service-modules/book-house-service-ajax.js";
import { bookHouseServiceUrls } from "../../book-house-service-modules/book-house-service-urls.js";

export class BookHouseServiceMainPage {
    constructor(bookHouseServiceParent) {
        this.bookHouseServiceParent = bookHouseServiceParent;
    }

    bookHouseServiceGetHTML() {
        return `
            <div id="book-house-service-main-page">
                <div class="container">
                    <div class="book-house-service-filter-input">
                        <input type="text" id="book-house-service-filter-input-id" class="form-control" placeholder="Фильтр">
                    </div>
                    <button id="book-house-service-add-btn" class="btn book-house-service-custom-btn mb-3">Добавить услугу</button>
                    <div id="book-house-service-error" class="text-danger mb-2"></div>
                    <div id="book-house-service-grid" class="book-house-service-grid"></div>
                </div>
            </div>
        `;
    }

    bookHouseServiceGetData(searchQuery = "") {
        const errorContainer = document.getElementById("book-house-service-error");

        ajax.get(bookHouseServiceUrls.getServices(searchQuery), (data, status) => {
            if (status >= 200 && status < 300 && data) {
                if (errorContainer) errorContainer.innerText = "";

                let filteredData = data;
                if (searchQuery.trim() !== "") {
                    filteredData = data.filter(item =>
                        item.bookHouseServiceTitle.toLowerCase().includes(searchQuery.toLowerCase())
                    );
                }

                this.bookHouseServiceRenderServices(filteredData);
            } else {
                if (errorContainer) errorContainer.innerText = `Ошибка XHR. Статус: ${status}`;
                this.bookHouseServiceRenderServices([]);
            }
        });
    }

    bookHouseServiceDelete(id) {
        const errorContainer = document.getElementById("book-house-service-error");

        ajax.delete(bookHouseServiceUrls.getServiceById(id), (data, status) => {
            if (status >= 200 && status < 300) {
                if (errorContainer) errorContainer.innerText = "";
                this.bookHouseServiceGetData();
            } else {
                if (errorContainer) {
                    errorContainer.innerText = `Ошибка при удалении: статус ${status}`;
                }
                console.error(`Ошибка удаления: ${status}`);
            }
        });
    }

    bookHouseServiceRenderServices(items) {
        const bookHouseServiceGridContainer = document.getElementById("book-house-service-grid");
        if (!bookHouseServiceGridContainer) return;
        bookHouseServiceGridContainer.innerHTML = "";

        items.forEach((item) => {
            const bookHouseServiceCard = new BookHouseServiceCardComponent(bookHouseServiceGridContainer);
            bookHouseServiceCard.bookHouseServiceRender(
                item,
                this.bookHouseServiceShowDetail.bind(this),
                this.bookHouseServiceDelete.bind(this),
                this.bookHouseServiceShowEdit.bind(this)
            );
        });
    }

    bookHouseServiceShowDetail(bookHouseServiceId) {
        const bookHouseServicePage = new BookHouseServicePage(this.bookHouseServiceParent, bookHouseServiceId);
        bookHouseServicePage.bookHouseServiceRender();
    }

    bookHouseServiceShowEdit(bookHouseServiceId) {
        const editPage = new BookHouseServiceEditPage(this.bookHouseServiceParent, bookHouseServiceId);
        editPage.bookHouseServiceRender();
    }

    bookHouseServiceShowAdd() {
        const editPage = new BookHouseServiceEditPage(this.bookHouseServiceParent, null);
        editPage.bookHouseServiceRender();
    }

    bookHouseServiceRender() {
        this.bookHouseServiceParent.innerHTML = "";
        const bookHouseServiceHomeButton = new BookHouseServiceHomeButtonComponent(this.bookHouseServiceParent);
        bookHouseServiceHomeButton.bookHouseServiceRender(() => this.bookHouseServiceRender());

        const bookHouseServiceHtml = this.bookHouseServiceGetHTML();
        this.bookHouseServiceParent.insertAdjacentHTML('beforeend', bookHouseServiceHtml);

        const filterInput = document.getElementById("book-house-service-filter-input-id");
        if (filterInput) {
            filterInput.addEventListener("input", (e) => {
                this.bookHouseServiceGetData(e.target.value);
            });
        }

        const addBtn = document.getElementById("book-house-service-add-btn");
        if (addBtn) addBtn.addEventListener("click", this.bookHouseServiceShowAdd.bind(this));

        this.bookHouseServiceGetData();
    }
}
