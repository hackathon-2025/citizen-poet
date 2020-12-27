import Api from '../components/Api.js';

const api = new Api();

// Получаем массив ключевых слов из текста жалобы
api.getAllQuotes()
  .then((res) => {
    console.log(res);
    const quotes = res;

    const reportText = document.querySelector('.idea__text');

    function getKeywords() {
      const wordsArr = reportText.value.split(/[-\.,\s!]+/);
      const keywords = wordsArr.filter(word => word.length > 4)
      console.log(keywords)
      const poems = [];
      keywords.map((word) => {
        const filteredQuotes = quotes.filter((quote) => quote.fields.text.includes(word));

        const poem = filteredQuotes[Math.floor(Math.random()*filteredQuotes.length)]
        console.log(poem);
        if(poem){
        poems.push(poem);
        }
      })
      console.log(poems);

        const cardTemplate = document.querySelector('.quote__template').content.querySelector('.quote__card');
        const list = document.querySelector('.quote');

        function createCard(data) {
          const cardElement = cardTemplate.cloneNode(true);

          const poemText = cardElement.querySelector('.quote__text');
          const poemAuthor = cardElement.querySelector('.quote__author');

          cardElement.addEventListener('click', evt => {
           evt.target.closest('.quote__card')?.classList.toggle('quote__card_focus');
          });

          poemText.textContent = data.fields.text;
          poemAuthor.textContent = data.fields.author;

          return cardElement;
        }

        function renderCards(data) {
          list.prepend(createCard(data))
        }


        poems.forEach((data) => {
          renderCards(data)
        })
      }

      //пройти цензуру
      // const censorCards = document.querySelector('.quote');
      reportCensor.addEventListener ('click', () => {
        reportCensor.classList.add('report__button_hide'); //убрали кнопку и заменили на отправить
        reportSend.classList.remove('report__button_hide');
        getKeywords();
        reportText.value = ('Выберите стих на карточке'); //нельзя изменить стих и он какой-то будет
        reportText.disabled = true;

        // censorCards.classList.remove('quote_hide');
      });

})




// //пройти цензуру
// const censorCards = document.querySelector('.quote');
// reportCensor.addEventListener ('click', () => {
//   reportCensor.classList.add('report__button_hide'); //убрали кнопку и заменили на отправить
//   reportSend.classList.remove('report__button_hide');
//   reportText.value = ('Ваш текст'); //нельзя изменить стих и он какой-то будет
//   reportText.disabled = true;
//   censorCards.classList.remove('quote_hide');
// });

// //выбор карточки

// const cardQuote = document.querySelector(".quote__card");
// document.addEventListener('click', evt => {
//   evt.target.closest('.quote__card')?.classList.toggle('quote__card_focus');

// });
