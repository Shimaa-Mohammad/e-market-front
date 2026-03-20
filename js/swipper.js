document.addEventListener('DOMContentLoaded', function () {
  // Swiper initialization for Events section
  const swiper = new Swiper('.swiper', {
    direction: 'horizontal',
    slidesPerView: 1,
    spaceBetween: 5,
    loop: true,
    speed: 1100,
    autoplay: {
      delay: 3000,
      disableOnInteraction: false,
    },

    pagination: {
      el: '.swiper-pagination',
      clickable: true,
    },
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
    },
  });
});