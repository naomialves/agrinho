// =========================
// ACESSIBILIDADE: TAMANHO DA FONTE
// =========================
const aumentarFonteBtn = document.getElementById('aumentar-fonte');
const diminuirFonteBtn = document.getElementById('diminuir-fonte');

aumentarFonteBtn.addEventListener('click', () => {
    document.body.style.fontSize = '1.2em';
});

diminuirFonteBtn.addEventListener('click', () => {
    document.body.style.fontSize = '0.9em';
});

// =========================
// TEMA CLARO/ESCURO
// =========================
const toggleThemeButton = document.querySelector('.toggle-mode');
const savedTheme = localStorage.getItem('theme');

function setTheme(isDark) {
    document.body.classList.toggle('dark-mode', isDark);
    toggleThemeButton.textContent = isDark ? '☀️' : '🌙';
    localStorage.setItem('theme', isDark ? 'dark' : 'light');
}

// Aplica o tema salvo ou o padrão do sistema
if (savedTheme) {
    setTheme(savedTheme === 'dark');
} else {
    setTheme(window.matchMedia('(prefers-color-scheme: dark)').matches);
}

toggleThemeButton.addEventListener('click', () => {
    const isDarkMode = !document.body.classList.contains('dark-mode');
    setTheme(isDarkMode);
});

// =========================
// FEEDBACK VISUAL FORMULÁRIO
// =========================
document.querySelectorAll("form input, form textarea").forEach(input => {
    input.addEventListener("focus", () => {
        input.style.borderColor = "var(--secondary-color)";
        input.style.boxShadow = "0 0 5px var(--secondary-color)";
    });
    input.addEventListener("blur", () => {
        input.style.borderColor = "";
        input.style.boxShadow = "";
    });
});

// =========================
// SCROLL SUAVE PARA LINKS INTERNOS
// =========================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener("click", function (e) {
        const target = document.querySelector(this.getAttribute("href"));
        if (target) {
            e.preventDefault();
            target.scrollIntoView({ behavior: "smooth" });
        }
    });
});

// =========================
// CARROSSEL AUTOMÁTICO
// =========================
const carousel = document.querySelector('.carousel');
let isScrolling = false;

function autoScrollCarousel() {
    if (!isScrolling && carousel) {
        carousel.scrollBy({ left: 300, behavior: 'smooth' });
        if (carousel.scrollLeft + carousel.offsetWidth >= carousel.scrollWidth) {
            carousel.scrollTo({ left: 0, behavior: 'smooth' });
        }
    }
}

let carouselInterval = setInterval(autoScrollCarousel, 3000);

if (carousel) {
    carousel.addEventListener('mouseenter', () => {
        isScrolling = true;
        clearInterval(carouselInterval);
    });

    carousel.addEventListener('mouseleave', () => {
        isScrolling = false;
        carouselInterval = setInterval(autoScrollCarousel, 3000);
    });
}

// =========================
// DESTAQUE DE SEÇÃO VISÍVEL
// =========================
const sections = document.querySelectorAll('main section[id], #festejando');
const observer = new IntersectionObserver(
    entries => {
        entries.forEach(entry => {
            entry.target.classList.toggle('section-ativa', entry.isIntersecting);
        });
    },
    { threshold: 0.5 }
);

sections.forEach(section => observer.observe(section));

// =========================
// LIGHTBOX DE IMAGEM E ORIGEM NO HOVER
// =========================
function criarLightbox(src, alt, origem) {
    // Remove qualquer lightbox existente
    document.querySelectorAll('.img-lightbox-overlay').forEach(el => el.remove());

    const overlay = document.createElement('div');
    overlay.className = 'img-lightbox-overlay';
    overlay.tabIndex = 0;

    const img = document.createElement('img');
    img.src = src;
    img.alt = alt || '';
    overlay.appendChild(img);

    if (origem) {
        const caption = document.createElement('div');
        caption.className = 'img-lightbox-caption';
        caption.textContent = origem;
        overlay.appendChild(caption);
    }

    overlay.addEventListener('click', (e) => {
        if (e.target === overlay) overlay.remove();
    });
    overlay.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') overlay.remove();
    });

    document.body.appendChild(overlay);
    overlay.focus();
}

// Adiciona classe e atributo de origem nas imagens relevantes
document.querySelectorAll('img[data-origem]').forEach(img => {
    img.classList.add('img-origem-hover');
    img.setAttribute('tabindex', '0');
    img.addEventListener('click', function () {
        criarLightbox(this.src, this.alt, this.getAttribute('data-origem'));
    });
    img.addEventListener('keydown', function (e) {
        if (e.key === 'Enter' || e.key === ' ') {
            criarLightbox(this.src, this.alt, this.getAttribute('data-origem'));
        }
    });
});
