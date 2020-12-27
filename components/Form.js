export default class Form {
  constructor(formSelector) {
    this._form = document.querySelector(formSelector);
    this._cityInput = this._form.querySelector('.city-select');

  }

  _getRadioValue() {
    this._cardChoice = this._form.querySelectorAll('.quote__choice-btn');

    for (let i=0; i<this._cardChoice.length; i++) {
        if(this._cardChoice[i].checked) {
          this._poemText = this._cardChoice[i].closest('.quote__card').querySelector('.quote__text');
          this._cardChoice[i].value = this._poemText.textContent;
          return this._cardChoice[i].value;
        }
      }
    }

  getFormValues() {
    this._formValues = {};

    this._formValues.city = this._cityInput.value;
    this._formValues.text = this._getRadioValue();

    console.log(this._formValues)

    return this._formValues;
  }

}
