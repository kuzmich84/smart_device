'use strict';

(function () {
  var btnHeader = document.querySelector('.btn-header');
  var popupBtn = document.querySelector('.call-popup__btn');
  var popup = document.querySelector('.call-popup');
  var overlay = document.querySelector('.overlay');
  var name = popup.querySelector('#call-name');
  var text = popup.querySelector('#call-message');
  var phone = popup.querySelector('#call-phone');
  var storageName = '';
  var storagePhone = '';
  var storageMessage = '';
  var form = popup.querySelector('.form');
  var isStorageSupport = true;
  var body = document.querySelector('body');

  // no-JS для webP
  body.classList.remove('no-js');

  // модальное окно

  try {
    storageName = localStorage.getItem('yourName');
    storagePhone = localStorage.getItem('phone');
    storageMessage = localStorage.getItem('message');

  } catch (err) {
    isStorageSupport = false;
  }

  function closePopup() {
    popup.classList.remove('call-popup-show');
    overlay.classList.remove('overlay-show');
    body.classList.remove('body-lock');
  }

  function existVerticalScroll() {
    return document.body.offsetHeight > window.innerHeight;
  }

  function getBodyScrollTop() {
    return self.pageYOffset || (document.documentElement && document.documentElement.scrollTop || (document.body && document.body.scrollTop));
  }

  btnHeader.addEventListener('click', function (evt) {
    evt.preventDefault();
    body.dataset.scrollY = getBodyScrollTop(); // сохраним значение скролла

    popup.classList.add('call-popup-show');
    overlay.classList.add('overlay-show');
    if (storageName) {
      name.value = storageName;
      phone.focus();
      if (storagePhone) {
        phone.value = storagePhone;
        text.focus();
      }
      if (storageMessage) {
        text.value = storageMessage;
      }
    } else {
      name.focus();
    }
    if (existVerticalScroll()) {
      body.classList.add('body-lock');
    }

  });


  popupBtn.addEventListener('click', function (evt) {
    evt.preventDefault();
    closePopup();

  });

  overlay.addEventListener('click', function (evt) {
    evt.preventDefault();
    closePopup();
  });

  window.addEventListener('keydown', function (evt) {
    if (evt.keyCode === 27) {
      if (popup.classList.contains('call-popup-show')) {
        evt.preventDefault();
        closePopup();
      }
    }
  });

  form.addEventListener('submit', function (evt) {
    evt.preventDefault();
    if (isStorageSupport) {
      localStorage.setItem('yourName', name.value);
      localStorage.setItem('phone', phone.value);
      localStorage.setItem('message', text.value);
    }
    closePopup();
  });
  // Плавный скролл

  // собираем все якоря; устанавливаем время анимации и количество кадров

  var anchors = [].slice.call(document.querySelectorAll('a[href*="#"]'));
  var animationTime = 300;
  var framesCount = 60;

  anchors.forEach(function (item) {
    // каждому якорю присваиваем обработчик события
    item.addEventListener('click', function (e) {
      // убираем стандартное поведение
      e.preventDefault();

      // для каждого якоря берем соответствующий ему элемент и определяем его координату Y
      var coordY = document.querySelector(item.getAttribute('href')).getBoundingClientRect().top + window.pageYOffset;

      // запускаем интервал, в котором
      var scroller = setInterval(function () {
        // считаем на сколько скроллить за 1 такт
        var scrollBy = coordY / framesCount;

        // если к-во пикселей для скролла за 1 такт больше расстояния до элемента
        // и дно страницы не достигнуто
        if (scrollBy > window.pageYOffset - coordY && window.innerHeight + window.pageYOffset < document.body.offsetHeight) {
          // то скроллим на к-во пикселей, которое соответствует одному такту
          window.scrollBy(0, scrollBy);
        } else {
          // иначе добираемся до элемента и выходим из интервала
          window.scrollTo(0, coordY);
          clearInterval(scroller);
        }
        // время интервала равняется частному от времени анимации и к-ва кадров
      }, animationTime / framesCount);
    });
  });
  // аккордеон

  var footerBtn = document.querySelectorAll('.page-footer__btn-wrapper');
  for (var i = 0; i < footerBtn.length; i++) {
    footerBtn[i].addEventListener('click', function () {
      var footerNav = this.parentElement;
      footerNav.classList.toggle('nav-footer-active');
    });
  }

  var phoneFeedback = document.querySelector('#phone');

  var maskOptions = {
    mask: '+{7}(000)000-00-00',
  };

  window.IMask(phone, maskOptions);
  window.IMask(phoneFeedback, maskOptions);
})();
