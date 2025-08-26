document.addEventListener("DOMContentLoaded", () => {
  const filmsContainer = document.querySelector(".films-container");
  const modal = document.getElementById("filmModal");
  const modalTitle = document.getElementById("modalTitle");
  const modalDescription = document.getElementById("modalDescription");
  const modalTrailer = document.getElementById("modalTrailer");
  const modalClose = document.querySelector(".film-modal-close");

  if (!filmsContainer) {
    console.error("  не найден ");
    return;
  }

  fetch("../data/films.json")
    .then((res) => res.json())
    .then((films) => {
      filmsContainer.innerHTML = ""; 

      films.forEach((film, i) => {
        const card = document.createElement("div");
        card.classList.add("film-card");
        card.style.animationDelay = `${i * 0.1}s`;

        card.innerHTML = `
          <img src="${film.poster || "https://via.placeholder.com/300x400"}" alt="${film.title}">
          <h3>${film.title || "Без названия"} (${film.year || "—"})</h3>
          <p>${film.description || "Описание скоро ."}</p>
          <button class="details-btn" type="button">Подробнее</button>
        `;

        filmsContainer.appendChild(card);

        // кнопка "Подробнее"
        card.querySelector(".details-btn").addEventListener("click", () => {
          modalTitle.textContent = `${film.title || "Без названия"} (${film.year || "—"})`;

          modalDescription.innerHTML = `
            <p><b>Жанр:</b> ${film.genre || "—"}</p>
            <p><b>Рейтинг:</b> ⭐ ${film.rating || "—"}/10</p>
            <p>${film.fullDescription || film.description || "Подробное описание появится."}</p>
          `;

          modalTrailer.src = film.trailer || "";

          modal.style.display = "flex";
          document.body.style.overflow = "hidden";
        });
      });
    })
    .catch((err) => {
      console.error("Ошибка загрузки", err);
      filmsContainer.innerHTML = `<p style="color:#fff">Не удалось загрузить .</p>`;
    });

  function closeModal() {
    modal.style.display = "none";
    document.body.style.overflow = "";
    modalTrailer.src = ""; 
  }

  modalClose.addEventListener("click", closeModal);
  modal.addEventListener("click", (e) => {
    if (e.target === modal) closeModal();
  });
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && modal.style.display === "flex") closeModal();
  });
});


// TAB SLIDER
const tabContentBlocks = document.querySelectorAll('.tab_content_block')
const tabs = document.querySelectorAll('.tab_content_item')
const tabsParent = document.querySelector('.tab_content_items') 

let currentIndex = 0

const hideTabContent = () => {
    tabContentBlocks.forEach(block => block.style.display = 'none')
    tabs.forEach(tab => tab.classList.remove('tab_content_item_active'))
} 

const showTabContent = (index = 0) => {
    tabContentBlocks[index].style.display = 'block'
    tabs[index].classList.add('tab_content_item_active')
}   

hideTabContent()
showTabContent(currentIndex)

tabsParent.onclick = (event) => {
    if (event.target.classList.contains('tab_content_item')) {
        tabs.forEach((tab, tabIndex) => {
            if (event.target === tab) {
                currentIndex = tabIndex 
                hideTabContent()
                showTabContent(currentIndex)
            }
        })
    }
}

setInterval(() => {
    currentIndex++
    if (currentIndex >= tabs.length) {
        currentIndex = 0 
    }
    hideTabContent()
    showTabContent(currentIndex)
}, 10000) 
