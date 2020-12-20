//пройти цензуру
const censorCards = document.querySelector('.quote');
reportCensor.addEventListener ('click', () => {
  reportCensor.classList.add('report__button_hide'); //убрали кнопку и заменили на отправить
  reportSend.classList.remove('report__button_hide');
  reportText.value = ('Ваш текст'); //нельзя изменить стих и он какой-то будет
  reportText.disabled = true;
  censorCards.classList.remove('quote_hide');
});

//выбор карточки

const cardQuote = document.querySelector(".quote__card");
document.addEventListener('click', evt => {
  evt.target.closest('.quote__card')?.classList.toggle('quote__card_focus');

});
