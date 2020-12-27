
import Api from '../components/Api.js';

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

          const radioBtn = cardElement.querySelector('.quote__choice-btn');
          const radioLabel = cardElement.querySelector('.quote__radio-label');

          radioBtn.id = data.pk;
          radioLabel.setAttribute('for', data.pk);


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


//цензура в блоке idea
ideaСensor.addEventListener ('click', () => {
  ideaСensor.classList.add('idea__button_hide'); //убрали кнопку и заменили на отправить
  ideaSend.classList.remove('idea__button_hide');
  getKeywords()
  ideaText.value = ('Выберите стих на карточке'); //нельзя изменить стих и он какой-то будет
  ideaText.disabled = true;
  // censorCards.classList.remove('quote_hide');
});

});
