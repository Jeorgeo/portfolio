/**
*Анализирует параметры a,b и возвращает строку
* @function getMessage(a:*, b:*=):string
*/
'use strict'
  function getMessage(a, b) {
  if (typeof a === 'boolean' && a === true) {
    return ('Я попал в ' + b);
  } else if (typeof a === 'boolean' && a === false) {
    return('Я никуда не попал');
    } else if (typeof a === 'number') {
    return('Я прыгнул на ' + (a * 100) + ' сантиметров');
  } else if (typeof a === 'object' && typeof b === 'object') {
    var l = 0;
    var minLength = Math.min(a.length, b.length);
    for(var i = 0; i<minLength; i++) {
      l = l + b[i] * a[i];
    }
    return('Я прошёл ' + l + ' шагов');}
  else if (typeof a === 'object' ) {
    var sum = 0;
    for(var i = 0; i<a.length; i++) {
      sum = sum + a[i]
    }
    return('Я прошёл ' + sum + ' метров');
  }
}
