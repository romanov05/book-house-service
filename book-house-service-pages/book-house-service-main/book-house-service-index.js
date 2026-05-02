import { BookHouseServiceHomeButtonComponent } from "../../book-house-service-components/book-house-service-home-button/book-house-service-index.js";
import { BookHouseServiceCardComponent } from "../../book-house-service-components/book-house-service-card/book-house-service-index.js";
import { BookHouseServicePage } from "../book-house-service/book-house-service-index.js";
import { bookHouseServiceMock } from "../../book-house-service-data/book-house-service.js";

export class BookHouseServiceMainPage {
    constructor(bookHouseServiceParent) {
        this.bookHouseServiceParent = bookHouseServiceParent;
        this.bookHouseServiceList = [...bookHouseServiceMock];
        this.bookHouseServiceFilteredList = [...this.bookHouseServiceList];
        this.bookHouseServiceCurrentFilter = "";
    }

    get bookHouseServicePageRoot() {
        return document.getElementById("book-house-service-main-page");
    }

    bookHouseServiceGetHTML() {
        return `
            <div id="book-house-service-main-page">
                <div class="container">
                    <div class="book-house-service-filter-input">
                        <input type="text" id="book-house-service-filter-input-id" class="form-control" placeholder="Фильтр по названию услуги">
                    </div>
                    <button id="book-house-service-add-btn" class="btn book-house-service-custom-btn mb-3">Добавить (копия первой)</button>
                    <div id="book-house-service-grid" class="book-house-service-grid"></div>
                </div>
            </div>
        `;
    }

    bookHouseServiceApplyFilter() {
        this.bookHouseServiceFilteredList = this.bookHouseServiceList.filter(bookHouseServiceItem =>
            bookHouseServiceItem.bookHouseServiceTitle.toLowerCase().includes(this.bookHouseServiceCurrentFilter.toLowerCase())
        );
        this.bookHouseServiceRenderServices();
    }

    bookHouseServiceRenderServices() {
        const bookHouseServiceGridContainer = document.getElementById("book-house-service-grid");
        if (!bookHouseServiceGridContainer) return;
        bookHouseServiceGridContainer.innerHTML = "";
        this.bookHouseServiceFilteredList.forEach(bookHouseServiceItem => {
            const bookHouseServiceCard = new BookHouseServiceCardComponent(bookHouseServiceGridContainer);
            bookHouseServiceCard.bookHouseServiceRender(bookHouseServiceItem, this.bookHouseServiceShowDetail.bind(this), this.bookHouseServiceDeleteService.bind(this));
        });
    }

    bookHouseServiceShowDetail(bookHouseServiceId) {
        const bookHouseServicePage = new BookHouseServicePage(this.bookHouseServiceParent, bookHouseServiceId, this.bookHouseServiceList);
        bookHouseServicePage.bookHouseServiceRender();
    }

    bookHouseServiceDeleteService(bookHouseServiceId) {
        this.bookHouseServiceList = this.bookHouseServiceList.filter(bookHouseServiceItem => bookHouseServiceItem.bookHouseServiceId !== bookHouseServiceId);
        this.bookHouseServiceApplyFilter();
    }

    bookHouseServiceAddService() {
        if (this.bookHouseServiceList.length === 0) return;
        const bookHouseServiceFirst = this.bookHouseServiceList[0];
        const bookHouseServiceNewId = Math.max(...this.bookHouseServiceList.map(bookHouseServiceItem => bookHouseServiceItem.bookHouseServiceId), 0) + 1;
        const bookHouseServiceNew = {
            ...bookHouseServiceFirst,
            bookHouseServiceId: bookHouseServiceNewId
        };
        this.bookHouseServiceList.push(bookHouseServiceNew);
        this.bookHouseServiceApplyFilter();
    }

    bookHouseServiceRender() {
        this.bookHouseServiceParent.innerHTML = "";
        const bookHouseServiceHomeButton = new BookHouseServiceHomeButtonComponent(this.bookHouseServiceParent);
        bookHouseServiceHomeButton.bookHouseServiceRender(() => {
            this.bookHouseServiceRender();
        });

        const bookHouseServiceHtml = this.bookHouseServiceGetHTML();
        this.bookHouseServiceParent.insertAdjacentHTML('beforeend', bookHouseServiceHtml);

        const bookHouseServiceFilterInput = document.getElementById("book-house-service-filter-input-id");
        if (bookHouseServiceFilterInput) {
            bookHouseServiceFilterInput.addEventListener("input", (bookHouseServiceEvent) => {
                this.bookHouseServiceCurrentFilter = bookHouseServiceEvent.target.value;
                this.bookHouseServiceApplyFilter();
            });
        }

        const bookHouseServiceAddBtn = document.getElementById("book-house-service-add-btn");
        if (bookHouseServiceAddBtn) {
            bookHouseServiceAddBtn.addEventListener("click", this.bookHouseServiceAddService.bind(this));
        }

        this.bookHouseServiceApplyFilter();
    }
}
