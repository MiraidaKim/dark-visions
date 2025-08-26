document.addEventListener("DOMContentLoaded", () => {
  const modal = document.getElementById("contactModal");
  const openModalBtn = document.querySelector("[data-modal]");
  const closeModalBtn = modal.querySelector(".modal_close");


  if (openModalBtn) {
    openModalBtn.addEventListener("click", (e) => {
      e.preventDefault();
      modal.style.display = "flex";
    });
  }

  if (closeModalBtn) {
    closeModalBtn.addEventListener("click", () => {
      modal.style.display = "none";
    });
  }

  modal.addEventListener("click", (e) => {
    if (e.target === modal) {
      modal.style.display = "none";
    }
  });
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && modal.style.display === "flex") {
      modal.style.display = "none";
    }
  });

  const form = modal.querySelector("form");
  const emailInput = form.querySelector("input[name='email']");
  const phoneInput = form.querySelector("input[name='phone']");

  const emailRegExp = /^[a-zA-Z0-9._]+@gmail\.com$/;

  const phoneRegExp = /^\+996\s?[2579]\d{2}(?:[\s-]?\d{2}){3}$/;

  function normalizePhone(v) {
    return v
      .replace(/\u00A0/g, ' ')        
      .replace(/[‐-–—]/g, '-')        
      .replace(/\s+/g, ' ')           
      .trim();
  }

  function formatKgPhone(v) {
    const digits = v.replace(/[^\d]/g, '');
    if (digits.startsWith('996') && digits.length === 12) {
      const r = digits.slice(3);
      return `+996 ${r.slice(0,3)} ${r.slice(3,5)}-${r.slice(5,7)}-${r.slice(7,9)}`;
    }
    return v;
  }

  form.addEventListener("submit", (e) => {
    e.preventDefault();

    let valid = true;

    const email = emailInput.value.trim();
    if (!emailRegExp.test(email)) {
      emailInput.style.border = "2px solid red";
      valid = false;
    } else {
      emailInput.style.border = "2px solid green";
    }

    const rawPhone = normalizePhone(phoneInput.value);
    if (!phoneRegExp.test(rawPhone)) {
      phoneInput.style.border = "2px solid red";
      valid = false;
    } else {
      phoneInput.style.border = "2px solid green";
      phoneInput.value = formatKgPhone(rawPhone); 
    }

    if (valid) {
      alert(" Вызов принят!");
      modal.style.display = "none";
      form.reset();
      emailInput.style.border = "";
      phoneInput.style.border = "";
    }
  });
});


document.addEventListener("DOMContentLoaded", () => {
  const modal = document.getElementById("contactModal");
  const openModalBtn = document.querySelector("[data-modal]");
  const closeModalBtn = modal.querySelector(".modal_close");

  const form = modal.querySelector("form");
  const emailInput = form.querySelector("input[name='email']");
  const phoneInput = form.querySelector("input[name='phone']");

  // ФУНКЦИИ ОТКРЫТИЯ / ЗАКРЫТИЯ 
  const openModal = () => {
    modal.style.display = "flex";
    document.body.style.overflow = "hidden";
  };

  const closeModal = () => {
    modal.style.display = "none";
    document.body.style.overflow = "";
  };

  if (openModalBtn) {
    openModalBtn.addEventListener("click", (e) => {
      e.preventDefault();
      openModal();
    });
  }

  if (closeModalBtn) {
    closeModalBtn.addEventListener("click", closeModal);
  }

  modal.addEventListener("click", (e) => {
    if (e.target === modal) closeModal();
  });

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && modal.style.display === "flex") {
      closeModal();
    }
  });

  // ВАЛИДАЦИЯ EMAIL И ТЕЛЕФОНА 
  const emailRegExp = /^[a-zA-Z0-9._]+@gmail\.com$/;
  const phoneRegExp = /^\+996\s?[2579]\d{2}(?:[\s-]?\d{2}){3}$/;

  function normalizePhone(v) {
    return v
      .replace(/\u00A0/g, " ")
      .replace(/[‐-–—]/g, "-")
      .replace(/\s+/g, " ")
      .trim();
  }

  function formatKgPhone(v) {
    const digits = v.replace(/[^\d]/g, "");
    if (digits.startsWith("996") && digits.length === 12) {
      const r = digits.slice(3);
      return `+996 ${r.slice(0, 3)} ${r.slice(3, 5)}-${r.slice(5, 7)}-${r.slice(7, 9)}`;
    }
    return v;
  }

  form.addEventListener("submit", (e) => {
    e.preventDefault();

    let valid = true;

    const email = emailInput.value.trim();
    if (!emailRegExp.test(email)) {
      emailInput.style.border = "2px solid red";
      valid = false;
    } else {
      emailInput.style.border = "2px solid green";
    }

    const rawPhone = normalizePhone(phoneInput.value);
    if (!phoneRegExp.test(rawPhone)) {
      phoneInput.style.border = "2px solid red";
      valid = false;
    } else {
      phoneInput.style.border = "2px solid green";
      phoneInput.value = formatKgPhone(rawPhone);
    }

    if (valid) {
      alert("✅ Вызов принят!");
      closeModal();
      form.reset();
      emailInput.style.border = "";
      phoneInput.style.border = "";
    }
  });

const showModalOnScroll = () => {
  if (window.innerHeight + window.scrollY >= document.body.scrollHeight) {
    openModal(); 
    window.removeEventListener("scroll", showModalOnScroll); 
  }
};

window.addEventListener("scroll", showModalOnScroll);
}); 
