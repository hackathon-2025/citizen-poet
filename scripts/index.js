import '../pages/index.css';
import './gallery.js';

import Api from '../components/Api.js';
import Card from '../components/Card.js';
import Form from '../components/Form.js';

const api = new Api();

//кнопки лайков
const likeHeart = document.querySelector('.leader-like__heart');
const likeThumb = document.querySelector('.leader-like__thumb');
const buttonLikes = document.querySelector('.leader-like');

buttonLikes.addEventListener ('click', (evt) => {
  if (evt.target === likeThumb) {
    likeThumb.classList.toggle('leader-like__thumb_active');
  } else if (evt.target === likeHeart) {
    likeHeart.classList.toggle('leader-like__heart_active');
    counterer();
  }
});


//счётчик idea
const counter = document.querySelector('.about__counter');

let ideaCount = 11507;

function counterer () {
  if (ideaCount < 35000) {
  counter.textContent = (`${ideaCount}`);
    ideaCount++;
  }
}

setInterval(counterer, 1000);

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

      const form = document.querySelector('.idea__container');
      const censorCards = document.querySelector('.quote');
      const succesMessage = document.querySelector('.idea__success-message');

      const ideaForm = new Form('.idea__container');

      // цензура в блоке idea

      ideaСensor.addEventListener ('click', () => {
        ideaСensor.classList.add('idea__button_hide'); //убрали кнопку и заменили на отправить
        ideaSend.classList.remove('idea__button_hide');
        getKeywords()
        ideaText.value = ('Выберите стих на карточке'); //нельзя изменить стих и он какой-то будет
        ideaText.disabled = true;
        censorCards.classList.remove('quote_hide');
        succesMessage.classList.remove('idea__success-message_visible');
      });

      form.addEventListener('submit', (evt) => {
        evt.preventDefault();
        ideaForm.getFormValues();
        // api.submitForm(getFormValues());

       censorCards.classList.add('quote_hide');
       succesMessage.classList.add('idea__success-message_visible');
       ideaСensor.classList.remove('idea__button_hide');
       ideaSend.classList.add('idea__button_hide');
       ideaText.disabled = false;
       ideaText.value = ('');
      })
});
