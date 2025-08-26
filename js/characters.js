document.addEventListener("DOMContentLoaded", () => {
    const characters = [
        { name: "Анабель", img: "link.jpg", role: "Проклятая кукла" },
        { name: "Валлак", img: "link.jpg", role: "Демон в облике монашки" },
        { name: "Лоррейн Уоррен", img: "link.jpg", role: "Исследователь паранормального" },
        { name: "Эд Уоррен", img: "link.jpg", role: "Охотник за привидениями" }
    ];

    const container = document.getElementById("characters-container");
    characters.forEach(ch => {
        const card = document.createElement("div");
        card.classList.add("character-card");
        card.innerHTML = `
            <img src="${ch.img}" alt="${ch.name}">
            <h3>${ch.name}</h3>
            <p>${ch.role}</p>
        `;
        container.appendChild(card);
    });
});

const container = document.querySelector('#characters-container')
const filterButtons = document.querySelectorAll('.filter button')

let charactersData = []

fetch('../data/characters.json')
  .then(res => res.json())
  .then(data => {
    charactersData = data
    renderCharacters(data)
  })

// Функция рендера
function renderCharacters(data) {
  container.innerHTML = ''
  data.forEach((char, index) => {
    const card = document.createElement('div')
    card.classList.add('character-card')

    card.style.animationDelay = `${index * 0.1}s`

    card.innerHTML = `
      <img src="${char.image}" alt="${char.name}">
      <h3>${char.name}</h3>
      <p>${char.description}</p>
    `
    container.appendChild(card)
  })
}

// Фильтр
filterButtons.forEach(btn => {
  btn.addEventListener('click', () => {
    document.querySelector('.filter button.active')?.classList.remove('active')
    btn.classList.add('active')

    const filter = btn.dataset.filter
    if (filter === 'all') {
      renderCharacters(charactersData)
    } else {
      const filtered = charactersData.filter(c => c.category === filter)
      renderCharacters(filtered)
    }
  })
})





// Card Switcher ///////////////////////////////////////////

const card = document.getElementById("card")
const btnNext = document.querySelector(".btn_next")
const btnPrev = document.querySelector(".btn_prev")

let cardId = 1
const maxCards = 200

// универсальная функция загрузки
const loadCard = async (id) => {
    try {
        const response = await fetch(`https://jsonplaceholder.typicode.com/todos/${id}`)
        if (!response.ok) throw new Error("Ошибка загрузки данных")

        const data = await response.json()
        const { title, id: todoId, completed } = data

        card.style.border = `2px solid ${completed ? "green" : "red"}`
        card.innerHTML = `
            <h3>${title}</h3>
            <p style="color:${completed ? "green" : "red"}">
                ${completed ? "Выполнено" : "Не выполнено"}
            </p>
            <span>ID: ${todoId}</span>
        `
    } catch (error) {
        card.innerHTML = `<p style="color:red;">Ошибка загрузки</p>`
    }
}

// первая загрузка
loadCard(cardId)

// обработчики кнопок
btnNext.onclick = () => {
    cardId++
    if (cardId > maxCards) cardId = 1
    loadCard(cardId)
}

btnPrev.onclick = () => {
    cardId--
    if (cardId < 1) cardId = maxCards
    loadCard(cardId)
}
