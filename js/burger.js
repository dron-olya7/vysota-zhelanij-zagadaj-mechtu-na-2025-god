document.addEventListener('DOMContentLoaded', function() {
  const burgerMenu = document.querySelector('.burger-menu');
  const navItems = document.querySelector('.nav-items');
  const body = document.body;

  burgerMenu.addEventListener('click', function() {
    // Переключаем классы
    this.classList.toggle('active');
    navItems.classList.toggle('active');
    body.classList.toggle('menu-open');
  });

  // Закрытие меню при клике на ссылку
  const navLinks = document.querySelectorAll('.nav-items a');
  navLinks.forEach(link => {
    link.addEventListener('click', function() {
      burgerMenu.classList.remove('active');
      navItems.classList.remove('active');
      body.classList.remove('menu-open');
    });
  });

  // Закрытие меню при ресайзе окна (если нужно)
  window.addEventListener('resize', function() {
    if (window.innerWidth > 1100) {
      burgerMenu.classList.remove('active');
      navItems.classList.remove('active');
      body.classList.remove('menu-open');
    }
  });
});
