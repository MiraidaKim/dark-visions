document.addEventListener("DOMContentLoaded", () => {
  const slides = document.querySelectorAll(".hero-slide");
  let current = 0;

  function showSlide(index) {
    slides.forEach((slide, i) => {
      slide.classList.toggle("active", i === index);
    });
  }

  setInterval(() => {
    current = (current + 1) % slides.length;
    showSlide(current);
  }, 5000);
});

document.addEventListener("DOMContentLoaded", () => {
  const slides = document.querySelectorAll(".hero-slide");
  let current = 0;

  function showSlide(index) {
    slides.forEach((slide, i) => {
      slide.classList.toggle("active", i === index);
    });
  }

  setInterval(() => {
    current = (current + 1) % slides.length;
    showSlide(current);
  }, 5000);

  window.addEventListener("scroll", () => {
    const offset = window.scrollY * 0.3;
    slides.forEach((slide) => {
      if (slide.classList.contains("active")) {
        slide.style.transform = `translateY(${offset}px)`;
      }
    });
  });
});

document.addEventListener("DOMContentLoaded", () => {
  const svg = document.getElementById("nonagonSvg");
  const polygon = document.getElementById("deca");
  const path = document.getElementById("nonagonPath");
  const labelsGroup = document.getElementById("labels");

  const films = [
    "Проклятие монахини (2018)",
    "Аннабель: Зарождение зла (2017)",
    "Проклятие монахини 2 (2023)",
    "Проклятие Аннабель (2014)",
    "Заклятие (2013)",
    "Аннабель 3 (2019)",
    "Проклятие плачущей (2018)",
    "Заклятие 2 (2016)",
    "Заклятие 3: По воле дьявола (2021)",
    "Заклятие 4: Последний обряд (2025)"
  ];

  const cx = 400, cy = 400, r = 300;
  const sides = 10;
  const points = [];

  for (let i = 0; i < sides; i++) {
    const angle = (2 * Math.PI * i) / sides - Math.PI / 2;
    const x = cx + r * Math.cos(angle);
    const y = cy + r * Math.sin(angle);
    points.push([x, y, angle]);
  }

  polygon.setAttribute("points", points.map(p => `${p[0]},${p[1]}`).join(" "));
  path.setAttribute("d", `M${points.map(p => `${p[0]},${p[1]}`).join("L")}Z`);

  points.forEach(([x, y, angle], i) => {
    const offset = 40;
    const lx = cx + (r + offset) * Math.cos(angle);
    const ly = cy + (r + offset) * Math.sin(angle);
    const label = document.createElementNS("http://www.w3.org/2000/svg", "text");
    label.setAttribute("x", lx);
    label.setAttribute("y", ly);
    label.setAttribute("text-anchor", "middle");
    label.setAttribute("alignment-baseline", "middle");
    label.textContent = films[i];
    labelsGroup.appendChild(label);
  });

  const clipPolygon = document.getElementById("deca-inner");
  if (clipPolygon) {
    const innerR = r - 20;
    const innerPoints = [];
    for (let i = 0; i < sides; i++) {
      const angle = (2 * Math.PI * i) / sides - Math.PI / 2;
      const x = cx + innerR * Math.cos(angle);
      const y = cy + innerR * Math.sin(angle);
      innerPoints.push([x, y]);
    }
    clipPolygon.setAttribute("points", innerPoints.map(p => `${p[0]},${p[1]}`).join(" "));
  }
});




document.addEventListener("DOMContentLoaded", () => {
  const ticketPopup = document.getElementById("ticket-popup");
  const openTicketBtn = document.querySelector(".buy-ticket-btn"); 
  const closeTicketBtn = ticketPopup.querySelector(".ticket-popup__close");
  const ticketForm = document.getElementById("ticket-form");

  openTicketBtn.addEventListener("click", (e) => {
    e.preventDefault();
    ticketPopup.style.display = "flex";
  });

  closeTicketBtn.addEventListener("click", () => {
    ticketPopup.style.display = "none";
  });

  ticketPopup.addEventListener("click", (e) => {
    if (e.target === ticketPopup) {
      ticketPopup.style.display = "none";
    }
  });

  ticketForm.addEventListener("submit", (e) => {
    e.preventDefault();
    alert("🎟 Билет(ы) успешно куплены!");
    ticketPopup.style.display = "none";
    ticketForm.reset();
  });
});

