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

ideaCount = 11507;

function counterer () {
  if (ideaCount < 35000) {
  counter.textContent = (`${ideaCount}`);
    ideaCount++;
  }
}

setInterval(counterer, 1000);

//цензура в блоке idea
ideaСensor.addEventListener ('click', () => {
  ideaСensor.classList.add('idea__button_hide'); //убрали кнопку и заменили на отправить
  ideaSend.classList.remove('idea__button_hide');
  ideaText.value = ('Здесь будет стих'); //нельзя изменить стих и он какой-то будет
  ideaText.disabled = true;

});
