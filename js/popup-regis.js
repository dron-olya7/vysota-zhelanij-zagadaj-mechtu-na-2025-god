// consultation.js
class ConsultationPopup {
  constructor() {
    this.consultationPopup = null;
    this.applicationPopup = null;
    this.isInitialized = false;
    this.init();
  }

  init() {
    this.createPopups();
    if (this.consultationPopup && this.applicationPopup) {
      this.setupPopups();
      this.addEventListeners();
      this.isInitialized = true;
    }
  }

  createPopups() {
    // Создаем попап для "Зарегистрироваться"
    if (!document.getElementById("consultationPopup")) {
      const consultationHTML = `
      <div id="consultationPopup" class="popup-overlay">
        <div class="popup-content">
          <button class="popup-close">&times;</button>
          <div class="popup-header">
            <h2>Зарегистрироваться</h2>
          </div>
          <form class="popup-form" novalidate>
            <div class="form-group">
              <input type="text" name="name" placeholder="Ваше имя" required>
              <div class="error-message" data-error="name"></div>
            </div>
            <div class="form-group">
              <input type="tel" name="phone" placeholder="Ваш телефон" required>
              <div class="error-message" data-error="phone"></div>
            </div>
            <div class="form-group">
              <input type="email" name="email" placeholder="Ваш email" required>
              <div class="error-message" data-error="email"></div>
            </div>
            <button type="submit" class="btn btn-submit">Зарегистрироваться</button>
            <div class="form-agreement">
              <p>Нажимая кнопку, вы соглашаетесь с <a href="#">политикой конфиденциальности</a></p>
            </div>
          </form>
        </div>
      </div>
    `;
      document.body.insertAdjacentHTML("beforeend", consultationHTML);
    }

    // Создаем попап для "Оставить заявку" с ТАКИМИ ЖЕ классами
    if (!document.getElementById("applicationPopup")) {
      const applicationHTML = `
      <div id="applicationPopup" class="popup-overlay">
        <div class="popup-content">
          <button class="popup-close">&times;</button>
          <div class="popup-header">
            <h2>Оставить заявку</h2>
          </div>
          <form class="popup-form" novalidate>
            <div class="form-group">
              <input type="text" name="name" placeholder="Ваше имя" required>
              <div class="error-message" data-error="name"></div>
            </div>
            <div class="form-group">
              <input type="tel" name="phone" placeholder="Ваш телефон" required>
              <div class="error-message" data-error="phone"></div>
            </div>
            <div class="form-group">
              <textarea name="message" placeholder="Ваш вопрос или сообщение" rows="4"></textarea>
              <div class="error-message" data-error="message"></div>
            </div>
            <button type="submit" class="btn btn-submit">Отправить заявку</button>
            <div class="form-agreement">
              <p>Нажимая кнопку, вы соглашаетесь с <a href="#">политикой конфиденциальности</a></p>
            </div>
          </form>
        </div>
      </div>
    `;
      document.body.insertAdjacentHTML("beforeend", applicationHTML);
    }

    this.consultationPopup = document.getElementById("consultationPopup");
    this.applicationPopup = document.getElementById("applicationPopup");
  }

  setupPopups() {
    // Настройка попапа "Зарегистрироваться"
    if (this.consultationPopup) {
      const closeBtn = this.consultationPopup.querySelector(".popup-close");
      const form = this.consultationPopup.querySelector(".popup-form");

      closeBtn.addEventListener("click", () =>
        this.closePopup(this.consultationPopup)
      );

      this.consultationPopup.addEventListener("click", (e) => {
        if (e.target === this.consultationPopup) {
          this.closePopup(this.consultationPopup);
        }
      });

      if (form) {
        form.addEventListener("submit", (e) =>
          this.handleConsultationSubmit(e)
        );
        this.setupFormValidation(form);
      }
    }

    // Настройка попапа "Оставить заявку"
    if (this.applicationPopup) {
      const closeBtn = this.applicationPopup.querySelector(".popup-close");
      const form = this.applicationPopup.querySelector(".popup-form");

      closeBtn.addEventListener("click", () =>
        this.closePopup(this.applicationPopup)
      );

      this.applicationPopup.addEventListener("click", (e) => {
        if (e.target === this.applicationPopup) {
          this.closePopup(this.applicationPopup);
        }
      });

      if (form) {
        form.addEventListener("submit", (e) => this.handleApplicationSubmit(e));
        this.setupFormValidation(form);
      }
    }

    // Общий обработчик ESC
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape") {
        this.closeAllPopups();
      }
    });
  }

  setupFormValidation(form) {
    const inputs = form.querySelectorAll("input, textarea");

    inputs.forEach((input) => {
      input.addEventListener("blur", (e) => this.validateField(e.target));
      input.addEventListener("input", (e) => this.clearError(e.target));
    });

    const phoneInput = form.querySelector('input[name="phone"]');
    if (phoneInput) {
      phoneInput.addEventListener("input", (e) =>
        this.formatPhoneInput(e.target)
      );
      phoneInput.addEventListener("keypress", (e) =>
        this.restrictPhoneInput(e)
      );
    }
  }

  addEventListeners() {
    // Делегирование событий для всех кнопок
    document.addEventListener("click", (e) => {
      // Кнопки для попапа "Зарегистрироваться"
      const consultationButton = e.target.closest(
        '[data-target="order_widget_mdl_popup"]'
      );

      // Кнопки для попапа "Оставить заявку"
      const applicationButton =
        e.target.closest('[data-target="order_widget_mdl"]') ||
        e.target.closest('.btn-sbm[href="#order"]');

      if (consultationButton) {
        e.preventDefault();
        e.stopPropagation();
        this.openPopup(this.consultationPopup);
      }

      if (applicationButton) {
        e.preventDefault();
        e.stopPropagation();
        this.openPopup(this.applicationPopup);
      }
    });
  }

  openPopup(popup) {
    if (!popup) {
      console.error("Popup not found");
      return;
    }

    // Закрываем все другие попапы
    this.closeAllPopups();

    document.documentElement.style.overflow = "hidden";
    document.body.style.overflow = "hidden";
    popup.classList.add("active");

    const firstInput = popup.querySelector("input");
    if (firstInput) {
      setTimeout(() => firstInput.focus(), 300);
    }
  }

  closePopup(popup) {
    if (!popup) return;

    document.documentElement.style.overflow = "auto";
    document.body.style.overflow = "auto";
    popup.classList.remove("active");

    const form = popup.querySelector("form");
    if (form) {
      form.reset();
      this.clearAllErrors(form);
    }
  }

  closeAllPopups() {
    if (this.consultationPopup)
      this.consultationPopup.classList.remove("active");
    if (this.applicationPopup) this.applicationPopup.classList.remove("active");
    document.documentElement.style.overflow = "auto";
    document.body.style.overflow = "auto";
  }

  // Обработчики для разных форм
  handleConsultationSubmit(e) {
    e.preventDefault();
    const form = e.target;

    if (!this.validateForm(form)) {
      const firstErrorField = form.querySelector(".error");
      if (firstErrorField) firstErrorField.focus();
      return;
    }

    const formData = new FormData(form);
    const data = {
      type: "consultation",
      name: formData.get("name").trim(),
      phone: formData.get("phone").trim(),
      email: formData.get("email").trim(),
    };

    this.showLoading(form);

    setTimeout(() => {
      console.log("Данные регистрации:", data);
      this.showSuccessMessage(form, "Регистрация завершена!");
    }, 1500);
  }

  handleApplicationSubmit(e) {
    e.preventDefault();
    const form = e.target;

    if (!this.validateForm(form)) {
      const firstErrorField = form.querySelector(".error");
      if (firstErrorField) firstErrorField.focus();
      return;
    }

    const formData = new FormData(form);
    const data = {
      type: "application",
      name: formData.get("name").trim(),
      phone: formData.get("phone").trim(),
      message: formData.get("message").trim(),
    };

    this.showLoading(form);

    setTimeout(() => {
      console.log("Данные заявки:", data);
      this.showSuccessMessage(form, "Заявка отправлена!");
    }, 1500);
  }

  // Общие методы валидации и утилиты (остаются без изменений)
  restrictPhoneInput(e) {
    const allowedKeys = [
      "0",
      "1",
      "2",
      "3",
      "4",
      "5",
      "6",
      "7",
      "8",
      "9",
      "+",
      "-",
      " ",
      "(",
      ")",
      "Backspace",
      "Delete",
      "ArrowLeft",
      "ArrowRight",
      "Tab",
    ];
    if (!allowedKeys.includes(e.key) && !e.ctrlKey && !e.metaKey) {
      e.preventDefault();
    }
  }

  formatPhoneInput(input) {
    let value = input.value.replace(/[^\d+]/g, "");
    if (value.startsWith("7") && !value.startsWith("+7")) {
      value = "+7" + value.slice(1);
    } else if (value.startsWith("8") && value.length === 1) {
      value = "+7";
    }

    if (value.startsWith("+7")) {
      let formattedValue = "+7";
      const numbers = value.slice(2).replace(/\D/g, "");
      if (numbers.length > 0) formattedValue += " (" + numbers.slice(0, 3);
      if (numbers.length > 3) formattedValue += ") " + numbers.slice(3, 6);
      if (numbers.length > 6) formattedValue += "-" + numbers.slice(6, 8);
      if (numbers.length > 8) formattedValue += "-" + numbers.slice(8, 10);
      input.value = formattedValue;
    } else {
      input.value = value;
    }
  }

  validateField(field) {
    const value = field.value.trim();
    const fieldName = field.name;
    let isValid = true;
    let errorMessage = "";

    switch (fieldName) {
      case "name":
        if (!value) {
          errorMessage = "Пожалуйста, введите ваше имя";
          isValid = false;
        } else if (value.length < 2) {
          errorMessage = "Имя должно содержать минимум 2 символа";
          isValid = false;
        } else if (!/^[a-zA-Zа-яА-ЯёЁ\s\-]+$/.test(value)) {
          errorMessage = "Имя может содержать только буквы, пробелы и дефисы";
          isValid = false;
        }
        break;

      case "phone":
        if (!value) {
          errorMessage = "Пожалуйста, введите ваш телефон";
          isValid = false;
        } else {
          const cleanPhone = value.replace(/\D/g, "");
          if (cleanPhone.startsWith("7") || cleanPhone.startsWith("8")) {
            if (cleanPhone.length !== 11) {
              errorMessage = "Номер телефона должен содержать 11 цифр";
              isValid = false;
            }
          } else if (cleanPhone.startsWith("+7")) {
            const digitsAfterPlus = cleanPhone.slice(1);
            if (digitsAfterPlus.length !== 11) {
              errorMessage = "Номер телефона должен содержать 11 цифр";
              isValid = false;
            }
          } else {
            if (cleanPhone.length < 10) {
              errorMessage = "Номер телефона должен содержать не менее 10 цифр";
              isValid = false;
            }
          }
        }
        break;

      case "email":
        if (!value) {
          errorMessage = "Пожалуйста, введите ваш email";
          isValid = false;
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
          errorMessage = "Введите корректный email адрес";
          isValid = false;
        }
        break;

      case "message":
        if (value.length > 500) {
          errorMessage = "Сообщение не должно превышать 500 символов";
          isValid = false;
        }
        break;
    }

    if (!isValid) {
      this.showError(field, errorMessage);
    } else {
      this.clearError(field);
    }

    return isValid;
  }

  validateForm(form) {
    const inputs = form.querySelectorAll("input[required], textarea[required]");
    let isValid = true;

    this.clearAllErrors(form);

    inputs.forEach((input) => {
      const fieldValue = input.value.trim();
      if (!fieldValue) {
        this.validateField(input);
        isValid = false;
      } else {
        if (!this.validateField(input)) {
          isValid = false;
        }
      }
    });

    return isValid;
  }

  showError(field, message) {
    field.classList.add("error");
    const errorElement = field.parentNode.querySelector(".error-message");
    if (errorElement) {
      errorElement.textContent = message;
      errorElement.style.display = "block";
    }
  }

  clearError(field) {
    field.classList.remove("error");
    const errorElement = field.parentNode.querySelector(".error-message");
    if (errorElement) {
      errorElement.textContent = "";
      errorElement.style.display = "none";
    }
  }

  clearAllErrors(form) {
    const inputs = form.querySelectorAll("input, textarea");
    inputs.forEach((input) => this.clearError(input));
  }

  showLoading(form) {
    const submitBtn = form.querySelector(".btn-submit");
    if (!submitBtn) return;

    const originalText = submitBtn.textContent;
    submitBtn.textContent = "Отправка...";
    submitBtn.disabled = true;
    submitBtn.setAttribute("data-original-text", originalText);
  }

  hideLoading(form) {
    const submitBtn = form.querySelector(".btn-submit");
    if (!submitBtn) return;

    const originalText = submitBtn.getAttribute("data-original-text");
    if (originalText) submitBtn.textContent = originalText;
    submitBtn.disabled = false;
  }

  showSuccessMessage(form, message) {
    this.hideLoading(form);
    const popup = form.closest(".popup-overlay");
    const popupContent = form.closest(".popup-content");

    if (!popup || !popupContent) return;

    const originalContent = popupContent.innerHTML;

    popupContent.innerHTML = `
    <button class="popup-close">&times;</button>
    <div class="success-message">
      <div class="success-icon">✓</div>
      <h3>${message}</h3>
      <p>Мы свяжемся с вами в ближайшее время</p>
      <button class="btn btn-submit success-close">Закрыть</button>
    </div>
  `;

    popup.querySelector(".popup-close").addEventListener("click", () => {
      this.closePopup(popup);
      this.restoreOriginalContent(popupContent, originalContent);
    });

    popup.querySelector(".success-close").addEventListener("click", () => {
      this.closePopup(popup);
      this.restoreOriginalContent(popupContent, originalContent);
    });
  }

  restoreOriginalContent(popupContent, originalContent) {
    setTimeout(() => {
      if (popupContent) {
        popupContent.innerHTML = originalContent;

        const form = popupContent.querySelector(".popup-form");
        if (form) {
          const popup = popupContent.closest(".popup-overlay");

          // Определяем тип формы по ID попапа
          if (popup.id === "applicationPopup") {
            form.addEventListener("submit", (e) =>
              this.handleApplicationSubmit(e)
            );
          } else {
            form.addEventListener("submit", (e) =>
              this.handleConsultationSubmit(e)
            );
          }

          this.setupFormValidation(form);

          // Настраиваем кнопку закрытия
          const closeBtn = popupContent.querySelector(".popup-close");
          if (closeBtn) {
            closeBtn.addEventListener("click", () => this.closePopup(popup));
          }
        }
      }
    }, 300);
  }
}

// Инициализация
document.addEventListener("DOMContentLoaded", () => {
  new ConsultationPopup();
});
