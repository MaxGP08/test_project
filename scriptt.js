const loadDataButton = document.getElementById('loadData');

loadDataButton.addEventListener('click', function() {
    const url = 'https://www.cbr-xml-daily.ru/daily_json.js'; // URL для получения данных

    fetch(url)
        .then(response => {
            if (!response.ok) {
                throw new Error('Сеть не ответила, статус: ' + response.status);
            }
            return response.json(); // Преобразуем ответ в JSON
        })
        .then(data => {
            displayData(data); // Отображаем полученные данные
        })
        .catch(error => {
            console.error('Ошибка: ', error); // Обработка ошибок
        });
});

// Функция для отображения данных о курсах валют
function displayData(data) {
    const output = document.getElementById('output');
    output.innerHTML = ''; // Очищаем предыдущие данные

    const currencies = data.Valute; // Получаем список валют

    Object.keys(currencies).forEach(key => {
        const currency = currencies[key];
        const currencyElement = document.createElement('div');
        currencyElement.innerHTML = `<strong>${currency.Name}</strong>: ${currency.Value.toFixed(2)} руб. (Курс за ${currency.Previous.toFixed(2)} руб.)`;
        output.appendChild(currencyElement); // Добавляем новый элемент на страницу
    });
}
