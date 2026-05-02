export class BookHouseServiceCardComponent {
    constructor(bookHouseServiceParent) {
        this.bookHouseServiceParent = bookHouseServiceParent;
        // Массив для поиска префиксов
        this.bookHouseServiceWordsArray = ["п", "печ", "печать", "брош", "лам", "пере", "тис", "рез", "а", "b", "c"];
    }

    // Подсчет префиксов
    bookHouseServiceCountPrefixes(bookHouseServiceWords, bookHouseServiceStr) {
        let bookHouseServiceCount = 0;
        const bookHouseServiceLowerStr = bookHouseServiceStr.toLowerCase();
        for (const bookHouseServiceWord of bookHouseServiceWords) {
            if (bookHouseServiceLowerStr.startsWith(bookHouseServiceWord.toLowerCase())) {
                bookHouseServiceCount++;
            }
        }
        return bookHouseServiceCount;
    }

    // Проверка на палиндром
    bookHouseServiceCheckPalindrome(bookHouseServiceStr) {
        const bookHouseServiceCleaned = bookHouseServiceStr.toLowerCase().replace(/[^а-яёa-z0-9]/g, '');
        if (!bookHouseServiceCleaned) return false;
        const bookHouseServiceReversed = bookHouseServiceCleaned.split('').reverse().join('');
        return bookHouseServiceCleaned === bookHouseServiceReversed;
    }

    bookHouseServiceGetHTML(bookHouseServiceData) {
        const bookHouseServicePrefixCount = this.bookHouseServiceCountPrefixes(
            this.bookHouseServiceWordsArray,
            bookHouseServiceData.bookHouseServiceTitle
        );

        const bookHouseServiceIsPalindrome = this.bookHouseServiceCheckPalindrome(bookHouseServiceData.bookHouseServiceTitle);
        const bookHouseServicePalindromeEmoji = bookHouseServiceIsPalindrome ? '✅' : '❌';

        return `
            <div class="card h-100">
                <img src="${bookHouseServiceData.bookHouseServiceSrc}" class="card-img-top" alt="${bookHouseServiceData.bookHouseServiceTitle}">
                <div class="card-body">
                    <h5 class="card-title">${bookHouseServiceData.bookHouseServiceTitle}</h5>
                    <p class="card-text">${bookHouseServiceData.bookHouseServiceDescription}</p>
                    <p class="card-text"><strong>${bookHouseServiceData.bookHouseServicePrice}</strong></p>

                    <p class="card-text">Слов-префиксов: ${bookHouseServicePrefixCount}</p>
                    <p class="card-text">Палиндром: ${bookHouseServicePalindromeEmoji}</p>

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
