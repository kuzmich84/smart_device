let btnHeader = document.querySelector('.btn-header');
let popupBtn = document.querySelector('.call-popup__btn');
let popup = document.querySelector('.call-popup');
let overlay = document.querySelector('.overlay');


try {
  storageName = localStorage.getItem("yourName");
  storageEmail = localStorage.getItem("email");
} catch (err) {
  isStorageSupport = false;
}

btnHeader.addEventListener('click', function (e) {
  e.preventDefault();
  popup.classList.add('call-popup-show');
  overlay.classList.add("overlay-show");
});
