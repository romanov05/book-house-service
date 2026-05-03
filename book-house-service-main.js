import { BookHouseServiceMainPage } from "./book-house-service-pages/book-house-service-main/book-house-service-index.js";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';

const bookHouseServiceRoot = document.getElementById('book-house-service-root');
const bookHouseServiceMainPageInstance = new BookHouseServiceMainPage(bookHouseServiceRoot);
bookHouseServiceMainPageInstance.bookHouseServiceRender();
