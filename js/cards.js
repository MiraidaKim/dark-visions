const cardsContainer = document.getElementById('cardsContainer');

async function loadCards() {
  try {
    const response = await fetch('https://jsonplaceholder.typicode.com/posts');
    if (!response.ok) {
      throw new Error(`Ошибка загрузки: ${response.status}`);
    }
    const data = await response.json();

    const slicedData = data.slice(0, 12);

    slicedData.forEach(({ title, body }) => {
      const card = document.createElement('div');
      card.classList.add('card-item');
      card.innerHTML = `
        <img src="https://www.iphones.ru/wp-content/uploads/2023/10/IMG_1176.jpeg" alt="card image">
        <div class="card-content">
          <h3>${title}</h3>
          <p>${body}</p>
        </div>
      `;
      cardsContainer.appendChild(card);
    });
  } catch (error) {
    console.error("Ошибка:", error);
    cardsContainer.innerHTML = `<p style="color:red;">Не удалось загрузить карточки</p>`;
  }
}

loadCards();
