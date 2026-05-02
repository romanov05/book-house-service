export class BookHouseServiceHomeButtonComponent {
    constructor(bookHouseServiceParent) {
        this.bookHouseServiceParent = bookHouseServiceParent;
    }

    bookHouseServiceGetHTML() {
        return `
            <header class="book-house-service-app-header">
                <div class="container book-house-service-app-header__container">
                    <span class="book-house-service-app-header__title">Книжное издательство</span>
                    <button id="book-house-service-home-button" class="btn book-house-service-app-header__home-btn">Домой</button>
                </div>
            </header>
        `;
    }

    bookHouseServiceAddListeners(bookHouseServiceListener) {
        const bookHouseServiceBtn = document.getElementById("book-house-service-home-button");
        if (bookHouseServiceBtn) bookHouseServiceBtn.addEventListener("click", bookHouseServiceListener);
    }

    bookHouseServiceRender(bookHouseServiceListener) {
        const bookHouseServiceHtml = this.bookHouseServiceGetHTML();
        this.bookHouseServiceParent.insertAdjacentHTML('beforeend', bookHouseServiceHtml);
        this.bookHouseServiceAddListeners(bookHouseServiceListener);
    }
}
