'use strict';

(function() {

  var reviewsFilter = document.querySelector('.reviews-filter');
  reviewsFilter.classList.add('invisible');

  var reviewsList = document.querySelector('.reviews-list');
  var templateElement = document.querySelector('#review-template');
  var elementToClone;

  /** @constant {number} */
  var PHOTO_LOAD_TIMEOUT = 10000;


/** @constant {Date}*/
  var TODAY = new Date();

/** @constant {number}*/
  var TWO_WEEKS = 14 * 24 * 60 * 60 * 1000;

  /** @type {Array.<Object>} */
  var reviews = [];

  if ('content' in templateElement) {
    elementToClone = templateElement.content.querySelector('.review');
  } else {
    elementToClone = templateElement.querySelector('.review');
  }

  /**
  * @param {object} data
  * @return {HTMLElement} review
  */
  function renderReview(data) {
    var review = elementToClone.cloneNode(true);
    var reviewImg = review.querySelector('.review-author');
    var reviewImgSrc = data.author.picture;
    var rating = review.querySelector('.review-rating');

    review.querySelector('.review-text').textContent = data.description;
    reviewImg.alt = data.author.name;
    reviewImg.title = data.author.name;
    var stars = data.rating;

    switch (stars) {
      case 2:
        rating.classList.add('review-rating-two');
        break;
      case 3:
        rating.classList.add('review-rating-three');
        break;
      case 4:
        rating.classList.add('review-rating-four');
        break;
      case 5:
        rating.classList.add('review-rating-five');
        break;
    }


    renderImg(review, reviewImg, reviewImgSrc);

    reviewsList.appendChild(review);

    return review;

  }

  /**
  * @param {HTMLElement} review
  * @param {HTMLElement} reviewImg
  * @param {String} reviewImgSrc
  */
  function renderImg(review, reviewImg, reviewImgSrc) {
    var avatarImage = new Image(124, 124);
    var imageLoadTimeout;

    avatarImage.onload = function() {
      clearTimeout(imageLoadTimeout);
      reviewImg.src = reviewImgSrc;
      reviewImg.width = avatarImage.width;
      reviewImg.height = avatarImage.height;
    };

    avatarImage.onerror = function() {
      review.classList.add('review-load-failure');
    };

    imageLoadTimeout = setTimeout(function() {
      avatarImage.src = '';
      review.classList.add('review-load-failure');
    }, PHOTO_LOAD_TIMEOUT);

    avatarImage.src = reviewImgSrc;
  }

  /** @param {function(Array.<Object>)} callback */
  function getReviews(callback) {
    var xhr = new XMLHttpRequest();
    var reviewsBlock = document.querySelector('.reviews');
    reviewsBlock.classList.add('reviews-list-loading');

    xhr.onload = function(evt) {
      reviewsBlock.classList.remove('reviews-list-loading');
      var requestObj = evt.target;
      var response = requestObj.response;
      reviews = JSON.parse(response);
      callback(reviews);
    };

    xhr.onerror = function() {
      reviewsBlock.classList.remove('reviews-list-loading');
      reviewsBlock.classList.add('review-load-failure');
    };

    xhr.timiout = PHOTO_LOAD_TIMEOUT;
    xhr.ontimeout = function() {
      reviewsBlock.classList.remove('reviews-list-loading');
      reviewsBlock.classList.add('review-load-failure');
    };

    xhr.open('GET', '../json/reviews.json');
    xhr.send();
  }

  /** @param {function(Array.<Object>)} filteredReviews */
  function renderReviews(filteredReviews) {
    reviewsList.innerHTML = '';
    filteredReviews.forEach(renderReview);
  }

/** @param {boolean} enabled */
  function setFiltrationEnabled() {
    var filters = reviewsFilter.querySelectorAll('.reviews-filter-item');
    for (var i = 0; i < filters.length; i++) {
      filters[i].onclick = function() {
        setFilterEnabled(this.htmlFor);
      };
    }
  }

  /** @param {string} filter */
  function setFilterEnabled(filter) {
    var filtredReviews = getFilteredListRewiews(filter);
    renderReviews(filtredReviews);

    var activeFilter = reviewsFilter.querySelector('input[name="reviews"][checked]');
    if (activeFilter) {
      activeFilter.removeAttribute('checked');
    }

    var filterToActivate = document.getElementById(filter);
    filterToActivate.setAttribute('checked', null);
  }

  /** @param {string} filter */
  function getFilteredListRewiews(filter) {
    var reviewsToFilter = reviews.slice(0);

    switch (filter) {
      case 'reviews-recent':
        reviewsToFilter = reviewsToFilter.filter(function(Recent) {
          var lastDate = Math.floor(TODAY.valueOf() - TWO_WEEKS);
          var RecentDate = new Date(Recent.date);

          return RecentDate >= new Date(lastDate);

        });
        reviewsToFilter.sort(function(a, b) {
          if (a.date > b.date) {
            return -1;
          }
          if (a.date < b.date) {
            return 1;
          }
          return 0;
        });
        break;
      case 'reviews-good':
        reviewsToFilter = reviewsToFilter.filter(function(mark) {
          return mark.rating > 2;
        });
        reviewsToFilter.sort(function(a, b) {
          return b.rating - a.rating;
        });
        break;
      case 'reviews-bad':
        reviewsToFilter = reviewsToFilter.filter(function(mark) {
          return mark.rating < 3;
        });
        reviewsToFilter.sort(function(a, b) {
          return a.rating - b.rating;
        });
        break;
      case 'reviews-popular':
        reviewsToFilter.sort(function(a, b) {
          return b.review_usefulness - a.review_usefulness;
        });
        break;
    }

    return reviewsToFilter;
  }

  getReviews(function(loadedReviews) {
    reviews = loadedReviews;
    setFiltrationEnabled();
    renderReviews(reviews);
  });

  reviewsFilter.classList.remove('invisible');
})();
