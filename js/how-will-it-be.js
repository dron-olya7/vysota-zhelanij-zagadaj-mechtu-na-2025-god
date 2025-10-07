document.addEventListener("DOMContentLoaded", function () {
  let swiper = new Swiper(".mySwiper", {
    effect: "coverflow",
    grabCursor: true,
    centeredSlides: true,
    slidesPerView: "auto",
    loop: true,
    coverflowEffect: {
      rotate: 0,
      stretch: 0,
      depth: 100,
      modifier: 4.3,
      slideShadows: false,
    },
    navigation: {
      nextEl: ".s-button-next",
      prevEl: ".s-button-prev",
    },
    breakpoints: {
      320: {
        coverflowEffect: {
          depth: 50,
          modifier: 3,
        },
      },
      768: {
        coverflowEffect: {
          depth: 100,
          modifier: 4.3,
        },
      },
    },
  });
});
