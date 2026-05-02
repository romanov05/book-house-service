export class BookHouseServiceDetailComponent {
    constructor(bookHouseServiceParent) {
        this.bookHouseServiceParent = bookHouseServiceParent;
    }

    bookHouseServiceGetHTML(bookHouseServiceData) {
        return `
            <div class="card">
                <img src="${bookHouseServiceData.bookHouseServiceSrc}" class="card-img-top book-house-service-detail__image" alt="${bookHouseServiceData.bookHouseServiceTitle}">
                <div class="card-body">
                    <h2 class="card-title">${bookHouseServiceData.bookHouseServiceTitle}</h2>
                    <p class="card-text"><strong>Цена:</strong> ${bookHouseServiceData.bookHouseServicePrice}</p>
                    <p class="card-text">${bookHouseServiceData.bookHouseServiceFullDescription || bookHouseServiceData.bookHouseServiceDescription}</p>
                </div>
            </div>
        `;
    }

    bookHouseServiceRender(bookHouseServiceData) {
        const bookHouseServiceHtml = this.bookHouseServiceGetHTML(bookHouseServiceData);
        this.bookHouseServiceParent.insertAdjacentHTML('beforeend', bookHouseServiceHtml);
    }
}
