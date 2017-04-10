'use strict';

(function() {
  /**
  * Подключаем browser-cookies в зависимость;
  */
/*  var browserCookies = require('browser-cookies');
*/
  var MIN_MARK = 3;
  var isDisabled = false;
  var isEnabled = true;

  var formContainer = document.querySelector('.overlay-container');
  var formOpenButton = document.querySelector('.reviews-controls-new');
  var formCloseButton = document.querySelector('.review-form-close');

  formOpenButton.onclick = function(evt) {
    evt.preventDefault();
    formContainer.classList.remove('invisible');
  };

  formCloseButton.onclick = function(evt) {
    evt.preventDefault();
    formContainer.classList.add('invisible');
  };

  var formNameInput = document.querySelector('#review-name');
  var formReviewText = document.querySelector('#review-text');
  var formNameIndicator = document.querySelector('.review-fields-name');
  var formTextIndicator = document.querySelector('.review-fields-text');
  var formSubmitButton = document.querySelector('button.review-submit');
  var reviewMarks = document.querySelectorAll('input[name=review-mark]');
  var reviewFields = document.querySelector('.review-fields');
  var reviewRating = document.querySelector('[name="review-mark"]:checked').value;

/*  function setCookie(Rating, Name) {
    browserCookies.set('review-mark', Rating, { expires: expiresDay });
    browserCookies.set('review-name', Name, { expires: expiresDay });
  }

  var DateNow = new Date();
  var DateMyBirthdayInThisYear = new Date(DateNow.getFullYear(), 3, 25);
  var MS_IN_DAY = 1000 * 60 * 60 * 24;

  if(DateMyBirthdayInThisYear < DateNow) {
    expiresDay = (DateNow - DateMyBirthdayInThisYear) / MS_IN_DAY;
  } else {
    var expiresDay = (DateNow - new Date((DateNow.getFullYear() - 1), 3, 25)) / MS_IN_DAY;
  }
*/
  function getMark() {

    return parseInt(document.querySelector('[name=review-mark]:checked').value, 10);
  }

  function getName() {
    formNameInput = document.querySelector('#review-name');

//Удаляем лишние пробелы

    return formNameInput.value.replace(/\s+/g, '');
  }

  function getReviewText() {
    formReviewText = document.querySelector('#review-text');

//Удаляем лишние пробелы

    return formReviewText.value.replace(/\s+/g, '');
  }

  for (var i = 0; i < reviewMarks.length; i++) {
    reviewMarks[i].onchange = checkSubmitButton;
  }

  formNameInput.oninput = checkSubmitButton;
  formReviewText.oninput = checkSubmitButton;

  formSubmitButton.onclick = function(evt) {
    evt.preventDefault();
/*    setCookie(reviewRating, formNameInput.value);
*/
    document.querySelector('form.review-form').submit();
  };

  function checkSubmitButton() {
    reviewRating = document.querySelector('[name="review-mark"]:checked').value;
//Чтобы не делать вложенные If, каждый раз при вызове
//функции добавляем эти классы, а потом уже идет проверка

    formNameIndicator.classList.remove('invisible');
    formTextIndicator.classList.remove('invisible');

    if(getMark() >= MIN_MARK) {
      formTextIndicator.classList.add('invisible');
    }
    if (getName() !== '') {
      formNameIndicator.classList.add('invisible');
    }
    if (getReviewText() !== '') {
      formTextIndicator.classList.add('invisible');
    }
    if (formNameIndicator.classList.contains('invisible') &&
          formTextIndicator.classList.contains('invisible')) {
      formSubmitButton.disabled = isDisabled;
      reviewFields.classList.add('invisible');
    } else {
      formSubmitButton.disabled = isEnabled;
      reviewFields.classList.remove('invisible');
    }
  }

//Это чтобы при загрузке формы убрать указатель
//для поля 'отзыв'

  if (getMark() === MIN_MARK) {
    formTextIndicator.classList.add('invisible');
  }
/*
  formNameInput.value = browserCookies.get('review-name') || '';
  if(browserCookies.get('review-mark') !== '') {
    for (i = 0; i < reviewMarks.length; ++i) {
      if(reviewMarks[i].value === browserCookies.get('review-mark')) {
        reviewMarks[i].checked = true;
      } else {
        reviewMarks[i].checked = false;
      }
    }
  }
  */
})();
