export class BookHouseServiceCardComponent {
    constructor(bookHouseServiceParent) {
        this.bookHouseServiceParent = bookHouseServiceParent;
    }

    bookHouseServiceGetHTML(bookHouseServiceData) {
        return `
            <div class="card h-100">
                <img src="${bookHouseServiceData.bookHouseServiceSrc}" class="card-img-top" alt="${bookHouseServiceData.bookHouseServiceTitle}">
                <div class="card-body">
                    <h5 class="card-title">${bookHouseServiceData.bookHouseServiceTitle}</h5>
                    <p class="card-text">${bookHouseServiceData.bookHouseServiceDescription}</p>
                    <p class="card-text"><strong>${bookHouseServiceData.bookHouseServicePrice}</strong></p>
                    <button class="btn book-house-service-custom-btn book-house-service-detail-btn" data-id="${bookHouseServiceData.bookHouseServiceId}">Подробнее</button>
                    <button class="btn book-house-service-custom-btn book-house-service-delete-btn ms-2" data-id="${bookHouseServiceData.bookHouseServiceId}">Удалить</button>
                </div>
            </div>
        `;
    }

    bookHouseServiceAddListeners(bookHouseServiceData, bookHouseServiceOnDetail, bookHouseServiceOnDelete) {
        const bookHouseServiceDetailBtn = document.querySelector(`.book-house-service-detail-btn[data-id="${bookHouseServiceData.bookHouseServiceId}"]`);
        const bookHouseServiceDeleteBtn = document.querySelector(`.book-house-service-delete-btn[data-id="${bookHouseServiceData.bookHouseServiceId}"]`);
        if (bookHouseServiceDetailBtn) bookHouseServiceDetailBtn.addEventListener("click", () => bookHouseServiceOnDetail(bookHouseServiceData.bookHouseServiceId));
        if (bookHouseServiceDeleteBtn) bookHouseServiceDeleteBtn.addEventListener("click", () => bookHouseServiceOnDelete(bookHouseServiceData.bookHouseServiceId));
    }

    bookHouseServiceRender(bookHouseServiceData, bookHouseServiceOnDetail, bookHouseServiceOnDelete) {
        const bookHouseServiceHtml = this.bookHouseServiceGetHTML(bookHouseServiceData);
        this.bookHouseServiceParent.insertAdjacentHTML('beforeend', bookHouseServiceHtml);
        this.bookHouseServiceAddListeners(bookHouseServiceData, bookHouseServiceOnDetail, bookHouseServiceOnDelete);
    }
}
