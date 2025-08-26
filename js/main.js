
// RANDOM COLOR GENERATOR
const buttonsColor = document.querySelectorAll('.btn-color')
const quote = document.querySelector('#quote')

const generateRandomColor = () => {
    const hexCodes = '0123456789ABCDEF'
    let color = ''
    for (let i = 0; i < 6; i++) {
        color += hexCodes[Math.floor(Math.random() * hexCodes.length)]
    }
    return '#' + color
}

const setRandomColors = () => {
    const colors = Array.from({length: buttonsColor.length}, generateRandomColor)
    buttonsColor.forEach((button, i) => {
        button.textContent = colors[i]  
        button.onclick = () => {
            quote.style.color = colors[i]  
        }
    })
}

window.onload = () => setRandomColors()
window.onkeydown = (event) => {
    if (event.code.toLowerCase() === 'space') {
        event.preventDefault()
        setRandomColors()
    }
}

// SLIDER

let currentSlide = 0;

const slides = document.querySelectorAll(".slide");
const indicators = document.querySelectorAll(".nav-item");
const leftArrow = document.querySelector(".left-arrow");
const rightArrow = document.querySelector(".right-arrow");


function showSlide(index) {
  slides.forEach((slide, i) => {
    slide.classList.toggle("active", i === index);
  });

  indicators.forEach((dot, i) => {
    dot.classList.toggle("active", i === index);
  });
}

function nextSlide() {
  currentSlide = (currentSlide + 1) % slides.length;
  showSlide(currentSlide);
}

function prevSlide() {
  currentSlide = (currentSlide - 1 + slides.length) % slides.length;
  showSlide(currentSlide);
}

rightArrow.addEventListener("click", nextSlide);
leftArrow.addEventListener("click", prevSlide);

indicators.forEach((dot, i) => {
  dot.addEventListener("click", () => {
    currentSlide = i;
    showSlide(currentSlide);
  });
});

showSlide(currentSlide);

setInterval(nextSlide, 5000);
