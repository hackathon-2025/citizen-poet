import Api from '../components/Api.js';
import Card from '../components/Card.js';
import Form from '../components/Form.js';

const api = new Api();

// Получаем массив ключевых слов из текста жалобы
api.getAllQuotes()
  .then((res) => {
    console.log(res);
    const quotes = res;

    const reportText = document.querySelector('.idea__text');

    // Получаем из жалобы массив ключевых слов и с помощью него фильтруем стихи

    function getKeywords() {
      const wordsArr = reportText.value.split(/[-\.,\s!]+/);
      const keywords = wordsArr.filter(word => word.length > 4)
      console.log(keywords);

      //Получаем массив отобранных с помощью ключевых слов стихов

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

      // Создаем карточки с отобранными стихами

      const list = document.querySelector('.quote');
      const card = new Card();

      function renderCards(data) {
          list.prepend(card.createCard(data))
        }

      poems.forEach((data) => {
          renderCards(data)
        })
      }

      // Слушатели событий для цензуры и отправки формы

      const form = document.querySelector('.report__form');
      const censorCards = document.querySelector('.quote');
      const succesMessage = document.querySelector('.idea__success-message');

      const reportForm = new Form('.report__form');

      //пройти цензуру
      // const censorCards = document.querySelector('.quote');
      reportCensor.addEventListener ('click', () => {
        reportCensor.classList.add('report__button_hide'); //убрали кнопку и заменили на отправить
        reportSend.classList.remove('report__button_hide');
        getKeywords();
        reportText.value = ('Выберите стих на карточке'); //нельзя изменить стих и он какой-то будет
        reportText.disabled = true;
        censorCards.classList.remove('quote_hide');
        succesMessage.classList.remove('idea__success-message_visible');
      });

      form.addEventListener('submit', (evt) => {
        evt.preventDefault();
        reportForm.getFormValues();
        // api.submitForm(getFormValues());

       censorCards.classList.add('quote_hide');
       succesMessage.classList.add('idea__success-message_visible');
       ideaСensor.classList.remove('report_button_hide');
       ideaSend.classList.add('report__button_hide');
       ideaText.disabled = false;
       ideaText.value = ('');
      })

});




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
