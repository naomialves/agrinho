// main.js
document.getElementById('aumentar-fonte').addEventListener('click', function() {
    document.body.style.fontSize = '1.2em';
});

document.getElementById('diminuir-fonte').addEventListener('click', function() {
    document.body.style.fontSize = '0.9em';
});

// 🌗 Alternar Tema Claro/Escuro
const toggleThemeButton = document.querySelector('.toggle-mode');
const savedTheme = localStorage.getItem('theme');

// Aplica o tema salvo ou o padrão do sistema
if (savedTheme) {
    document.body.classList.toggle('dark-mode', savedTheme === 'dark');
    toggleThemeButton.textContent = savedTheme === 'dark' ? '☀️' : '🌙';
} else {
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    document.body.classList.toggle('dark-mode', prefersDark);
    toggleThemeButton.textContent = prefersDark ? '☀️' : '🌙';
}

toggleThemeButton.addEventListener('click', () => {
    const isDarkMode = document.body.classList.toggle('dark-mode');
    toggleThemeButton.textContent = isDarkMode ? '☀️' : '🌙';
    localStorage.setItem('theme', isDarkMode ? 'dark' : 'light');
});

// 🌐 Feedback Visual ao Interagir com o Formulário
const formInputs = document.querySelectorAll("form input, form textarea");
formInputs.forEach(input => {
    input.addEventListener("focus", () => {
        input.style.borderColor = "var(--secondary-color)";
        input.style.boxShadow = "0 0 5px var(--secondary-color)";
    });
    input.addEventListener("blur", () => {
        input.style.borderColor = "";
        input.style.boxShadow = "";
    });
});

// 🌐 Scroll Suave para Links Internos
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener("click", function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute("href"));
        if (target) {
            target.scrollIntoView({ behavior: "smooth" });
        }
    });
});

// 🌐 Rolagem Automática do Carrossel
const carousel = document.querySelector('.carousel');
let isScrolling = false;

function autoScrollCarousel() {
    if (!isScrolling) {
        carousel.scrollBy({ left: 300, behavior: 'smooth' });
        if (carousel.scrollLeft + carousel.offsetWidth >= carousel.scrollWidth) {
            carousel.scrollTo({ left: 0, behavior: 'smooth' });
        }
    }
}

let carouselInterval = setInterval(autoScrollCarousel, 3000);

carousel.addEventListener('mouseenter', () => {
    isScrolling = true;
    clearInterval(carouselInterval);
});

carousel.addEventListener('mouseleave', () => {
    isScrolling = false;
    carouselInterval = setInterval(autoScrollCarousel, 3000);
});

// Destaque automático da seção visível na tela
const sections = document.querySelectorAll('main section[id], #festejando');
const observer = new IntersectionObserver(
  entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('section-ativa');
      } else {
        entry.target.classList.remove('section-ativa');
      }
    });
  },
  {
    threshold: 0.5 // 50% da seção visível já ativa o destaque
  }
);

sections.forEach(section => observer.observe(section));
