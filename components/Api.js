export default class Api {
  constructor() {
      // this._url = options.url;
      // this._headers = options.headers;
  }

  _getResponseData(res) {
         if(res.ok) {
             return res.json();
         }
         return Promise.reject(new Error(`Ошибка: ${res.status}`));
     }

     getAllQuotes() {
      return fetch(`https://www.buymebuyme.xyz`, {
          headers: this._headers,
      }).then(res => this._getResponseData(res));
    }

     getQuotesByKeyword(word) {
      return fetch(`https://www.buymebuyme.xyz?q=${word}`, {
          headers: this._headers,
      }).then(res => this._getResponseData(res));
  }

  // Заготовка для отправки данных формы на сервер

  submitForm(formData) {
    return fetch(`${this._url}`, {
        method: 'POST',
        headers:  this._headers,
        body: JSON.stringify({
          city: formData.city,
          text: formData.text,
        })
    }).then(res => this._getResponseData(res));

}
}

