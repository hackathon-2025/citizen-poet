export default class Card {
  constructor() {

  }
  // Создаем карточки с отобранными стихами

  createCard(data) {
    const cardTemplate = document.querySelector('.quote__template').content.querySelector('.quote__card');

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

}
