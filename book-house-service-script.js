window.onload = function(){
    // Переменные для хранения чисел и операций
    let bookHouseServiceA = ''                      // Первое число
    let bookHouseServiceB = ''                      // Второе число
    let bookHouseServiceExpressionResult = ''       // Результат вычисления
    let bookHouseServiceSelectedOperation = null    // Выбранная операция

    // Получаем доступ к экрану калькулятора в поле вывода
    const bookHouseServiceOutputElement = document.getElementById("result")

    // Получаем все кнопки с цифрами
    const bookHouseServiceDigitButtons = document.querySelectorAll('[id ^= "btn_digit_"]')

    function bookHouseServiceOnDigitButtonClicked(bookHouseServiceDigit) {
        // Если операция не выбрана, работаем с первым числом
        if (!bookHouseServiceSelectedOperation) {
            if ((bookHouseServiceDigit != '.') || (bookHouseServiceDigit == '.' && !bookHouseServiceA.includes(bookHouseServiceDigit))) {
                bookHouseServiceA += bookHouseServiceDigit;
            }
            bookHouseServiceOutputElement.innerHTML = bookHouseServiceA;
        }
        // Если операция выбрана, работаем со вторым числом
        else {
            if ((bookHouseServiceDigit != '.') || (bookHouseServiceDigit == '.' && !bookHouseServiceB.includes(bookHouseServiceDigit))) {
                bookHouseServiceB += bookHouseServiceDigit;
                bookHouseServiceOutputElement.innerHTML = bookHouseServiceB;
            }
        }
    }

    // Настраиваем обработчики для цифровых кнопок
    bookHouseServiceDigitButtons.forEach(bookHouseServiceButton => {
        bookHouseServiceButton.onclick = function() {
            const bookHouseServiceDigitValue = bookHouseServiceButton.innerHTML;
            bookHouseServiceOnDigitButtonClicked(bookHouseServiceDigitValue);
        }
    });

    // Операции
    document.getElementById("btn_op_mult").onclick = function() {
        if (bookHouseServiceA === '') return;
        bookHouseServiceSelectedOperation = 'x';
    }

    document.getElementById("btn_op_plus").onclick = function() {
        if (bookHouseServiceA === '') return;
        if (bookHouseServiceB !== '') {
            if (bookHouseServiceSelectedOperation === 'x') bookHouseServiceA = (+bookHouseServiceA * +bookHouseServiceB).toString();
            if (bookHouseServiceSelectedOperation === '+') bookHouseServiceA = (+bookHouseServiceA + +bookHouseServiceB).toString();
            if (bookHouseServiceSelectedOperation === '-') bookHouseServiceA = (+bookHouseServiceA - +bookHouseServiceB).toString();
            if (bookHouseServiceSelectedOperation === '/') bookHouseServiceA = (+bookHouseServiceA / +bookHouseServiceB).toString();
            bookHouseServiceB = '';
            bookHouseServiceOutputElement.innerHTML = bookHouseServiceA;
        }
        bookHouseServiceSelectedOperation = '+';
    }

    document.getElementById("btn_op_minus").onclick = function() {
        if (bookHouseServiceA === '') return;
        if (bookHouseServiceB !== '') {
            if (bookHouseServiceSelectedOperation === 'x') bookHouseServiceA = (+bookHouseServiceA * +bookHouseServiceB).toString();
            if (bookHouseServiceSelectedOperation === '+') bookHouseServiceA = (+bookHouseServiceA + +bookHouseServiceB).toString();
            if (bookHouseServiceSelectedOperation === '-') bookHouseServiceA = (+bookHouseServiceA - +bookHouseServiceB).toString();
            if (bookHouseServiceSelectedOperation === '/') bookHouseServiceA = (+bookHouseServiceA / +bookHouseServiceB).toString();
            bookHouseServiceB = '';
            bookHouseServiceOutputElement.innerHTML = bookHouseServiceA;
        }
        bookHouseServiceSelectedOperation = '-';
    }

    document.getElementById("btn_op_div").onclick = function() {
        if (bookHouseServiceA === '') return;
        bookHouseServiceSelectedOperation = '/';
    }

    // Очистка всех значений
    document.getElementById("btn_op_clear").onclick = function() {
        bookHouseServiceA = ''
        bookHouseServiceB = ''
        bookHouseServiceSelectedOperation = ''
        bookHouseServiceExpressionResult = ''
        bookHouseServiceOutputElement.innerHTML = 0
    }

    // Вычисление результата
    document.getElementById("btn_op_equal").onclick = function() {
        if (bookHouseServiceA === '' || bookHouseServiceB === '' || !bookHouseServiceSelectedOperation)
            return

        switch(bookHouseServiceSelectedOperation) {
            case 'x':
                bookHouseServiceExpressionResult = (+bookHouseServiceA) * (+bookHouseServiceB)
                break;
            case '+':
                bookHouseServiceExpressionResult = (+bookHouseServiceA) + (+bookHouseServiceB)
                break;
            case '-':
                bookHouseServiceExpressionResult = (+bookHouseServiceA) - (+bookHouseServiceB)
                break;
            case '/':
                bookHouseServiceExpressionResult = (+bookHouseServiceA) / (+bookHouseServiceB)
                break;
        }

        bookHouseServiceA = bookHouseServiceExpressionResult.toString()
        bookHouseServiceB = ''
        bookHouseServiceSelectedOperation = null
        bookHouseServiceOutputElement.innerHTML = bookHouseServiceA
    }

    // Смена знака
    document.getElementById("btn_op_sign").onclick = function() {
        if (!bookHouseServiceSelectedOperation) {
            if (bookHouseServiceA !== '') {
                bookHouseServiceA = (parseFloat(bookHouseServiceA) * -1).toString();
                bookHouseServiceOutputElement.innerHTML = bookHouseServiceA;
            }
        } else {
            if (bookHouseServiceB !== '') {
                bookHouseServiceB = (parseFloat(bookHouseServiceB) * -1).toString();
                bookHouseServiceOutputElement.innerHTML = bookHouseServiceB;
            }
        }
    }

    // Проценты
    document.getElementById("btn_op_percent").onclick = function() {
        if (!bookHouseServiceSelectedOperation) {
            if (bookHouseServiceA !== '') {
                bookHouseServiceA = (parseFloat(bookHouseServiceA) / 100).toString();
                bookHouseServiceOutputElement.innerHTML = bookHouseServiceA;
            }
        } else {
            if (bookHouseServiceB !== '') {
                bookHouseServiceB = (parseFloat(bookHouseServiceB) / 100).toString();
                bookHouseServiceOutputElement.innerHTML = bookHouseServiceB;
            }
        }
    }

    // Backspace
    document.getElementById("btn_op_backspace").onclick = function() {
        if (!bookHouseServiceSelectedOperation) {
            if (bookHouseServiceA.length > 0) {
                bookHouseServiceA = bookHouseServiceA.slice(0, -1);
                bookHouseServiceOutputElement.innerHTML = bookHouseServiceA || '0';
            }
        } else {
            if (bookHouseServiceB.length > 0) {
                bookHouseServiceB = bookHouseServiceB.slice(0, -1);
                bookHouseServiceOutputElement.innerHTML = bookHouseServiceB || '0';
            }
        }
    }

    // Квадратный корень
    document.getElementById("btn_op_sqrt").onclick = function() {
        if (!bookHouseServiceSelectedOperation) {
            if (bookHouseServiceA !== '') {
                bookHouseServiceA = Math.sqrt(Number(bookHouseServiceA)).toString();
                bookHouseServiceOutputElement.innerHTML = bookHouseServiceA;
            }
        } else {
            if (bookHouseServiceB !== '') {
                bookHouseServiceB = Math.sqrt(Number(bookHouseServiceB)).toString();
                bookHouseServiceOutputElement.innerHTML = bookHouseServiceB;
            }
        }
    }

    // Квадрат
    document.getElementById("btn_op_square").onclick = function() {
        if (!bookHouseServiceSelectedOperation) {
            if (bookHouseServiceA !== '') {
                bookHouseServiceA = (bookHouseServiceA ** 2).toString();
                bookHouseServiceOutputElement.innerHTML = bookHouseServiceA;
            }
        } else {
            if (bookHouseServiceB !== '') {
                bookHouseServiceB = (bookHouseServiceB ** 2).toString();
                bookHouseServiceOutputElement.innerHTML = bookHouseServiceB;
            }
        }
    }

    // Факториал
    document.getElementById("btn_op_factorial").onclick = function() {
        function bookHouseServiceFactorial(bookHouseServiceN) {
            bookHouseServiceN = Number(bookHouseServiceN);
            if ((bookHouseServiceN < 0) || (!Number.isInteger(bookHouseServiceN))) return NaN;
            if (bookHouseServiceN === 0) return 1;
            let bookHouseServiceRes = 1;
            for (let i = 2; i <= bookHouseServiceN; i++) bookHouseServiceRes *= i;
            return bookHouseServiceRes;
        }
        if (!bookHouseServiceSelectedOperation) {
            if (bookHouseServiceA !== '') {
                bookHouseServiceA = bookHouseServiceFactorial(bookHouseServiceA).toString();
                bookHouseServiceOutputElement.innerHTML = bookHouseServiceA;
            }
        } else {
            if (bookHouseServiceB !== '') {
                bookHouseServiceB = bookHouseServiceFactorial(bookHouseServiceB).toString();
                bookHouseServiceOutputElement.innerHTML = bookHouseServiceB;
            }
        }
    }

    // Кнопка 000
    document.getElementById("btn_digit_000").onclick = function() {
        if (!bookHouseServiceSelectedOperation) {
            if (bookHouseServiceA !== '') {
                bookHouseServiceA += '000';
                bookHouseServiceOutputElement.innerHTML = bookHouseServiceA;
            }
        } else {
            if (bookHouseServiceB !== '') {
                bookHouseServiceB += '000';
                bookHouseServiceOutputElement.innerHTML = bookHouseServiceB;
            }
        }
    }

    // Авторские листы
    document.getElementById("btn_op_author_sheets").onclick = function() {
        const bookHouseServiceCalcSheets = (bookHouseServiceVal) => {
            const bookHouseServiceNum = parseFloat(bookHouseServiceVal);
            if (bookHouseServiceNum >= 0 && Number.isInteger(bookHouseServiceNum)) {
                return (bookHouseServiceNum / 40000).toFixed(2);
            }
            return "Ошибка: целые ≥ 0";
        };

        if (!bookHouseServiceSelectedOperation) {
            if (bookHouseServiceA !== '') {
                bookHouseServiceA = bookHouseServiceCalcSheets(bookHouseServiceA);
                bookHouseServiceOutputElement.innerHTML = bookHouseServiceA;
            }
        } else {
            if (bookHouseServiceB !== '') {
                bookHouseServiceB = bookHouseServiceCalcSheets(bookHouseServiceB);
                bookHouseServiceOutputElement.innerHTML = bookHouseServiceB;
            }
        }
    }
};
