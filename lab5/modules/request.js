export const request = async (url) => {
    try { 
        //Делаем GET запрос на указанный урл
        console.log('Отправляем запрос...', url)
        const response = await fetch(url);
        console.log('Полученные данные: ', response)
        const data = response.json()
        // возвращаем результат в случае успеха
        return data;
    } catch (err) {
        console.log(err);
    }
}