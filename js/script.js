document.addEventListener('DOMContentLoaded', () => {

  // ---------- SCROLL SUAVE ----------
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e){
      e.preventDefault();
      document.querySelector(this.getAttribute('href')).scrollIntoView({
        behavior: 'smooth'
      });
    });
  });

  // ---------- LIGHTBOX ----------
  const lightboxImages = document.querySelectorAll('.lightbox-img');
  const lightboxContainer = document.getElementById('lightbox-container');
  const lightboxImage = document.getElementById('lightbox-image');

  if (lightboxImages.length > 0 && lightboxContainer && lightboxImage) {
    lightboxImages.forEach(img => {
      img.addEventListener('click', () => {
        lightboxImage.src = img.src;
        lightboxImage.classList.remove('zoomed');
        lightboxContainer.classList.add('show');
      });
    });

    // Zoom na imagem
    lightboxImage.addEventListener('click', () => {
      lightboxImage.classList.toggle('zoomed');
    });

    // Fecha ao clicar fora da imagem
    lightboxContainer.addEventListener('click', (e) => {
      if(e.target === lightboxContainer){
        lightboxContainer.classList.remove('show');
        lightboxImage.classList.remove('zoomed');
      }
    });
  }

  // ---------- ANIMAÇÃO DE ENTRADA (FADE-IN) ----------
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      }
    });
  }, { threshold: 0.15 });

  document.querySelectorAll('.card, .sobre-resumido, .hero, .projeto-hero').forEach(el => {
    el.classList.add('fade');
    observer.observe(el);
  });

  // ---------- BOTÃO DE VOLTAR AO TOPO (opcional) ----------
  const toTopBtn = document.getElementById('toTopBtn');
  if (toTopBtn) {
    window.addEventListener('scroll', () => {
      if (window.scrollY > 400) {
        toTopBtn.classList.add('show');
      } else {
        toTopBtn.classList.remove('show');
      }
    });

    toTopBtn.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

}); // fim do DOMContentLoaded

// Aparece suavemente ao rolar
const faders = document.querySelectorAll('.fade-in');
const appearOptions = { threshold: 0.2 };
const appearOnScroll = new IntersectionObserver(function(entries, observer) {
  entries.forEach(entry => {
    if (!entry.isIntersecting) return;
    entry.target.classList.add('appear');
    observer.unobserve(entry.target);
  });
}, appearOptions);

faders.forEach(fader => {
  appearOnScroll.observe(fader);
});

// portfolio.js
document.addEventListener('DOMContentLoaded', () => {
  const filterBtns = document.querySelectorAll('.filter-btn');
  const searchInput = document.getElementById('search-input');
  const cards = Array.from(document.querySelectorAll('.portfolio-grid .card'));
  const modal = document.getElementById('project-modal');
  const modalImage = document.getElementById('modal-image');
  const modalTitle = document.getElementById('modal-title');
  const modalDesc = document.getElementById('modal-desc');
  const modalDetail = document.getElementById('modal-detail');
  const modalGithub = document.getElementById('modal-github');

  // Filtrar por categoria
  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const category = btn.dataset.filter;
      filterCards({ category, query: searchInput.value.trim().toLowerCase() });
    });
  });

  // Abrir modal com dados do card
  document.querySelectorAll('.view-detail').forEach(btn => {
    btn.addEventListener('click', (e) => {
      const card = e.target.closest('.card');
      if (!card) return;
      const img = card.querySelector('img')?.src || '';
      const title = card.querySelector('h3')?.textContent || '';
      const desc = card.querySelector('p')?.textContent || '';
      const detail = card.dataset.detail || '#';
      const github = card.dataset.github || '#';

      modalImage.src = img;
      modalTitle.textContent = title;
      modalDesc.textContent = desc;
      modalDetail.href = detail;
      modalGithub.href = github;

      openModal();
    });
  });

  // abrir/fechar modal
  function openModal() {
    modal.classList.add('show');
    modal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
  }

  function closeModal() {
    modal.classList.remove('show');
    modal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  }

  // fechar clicando no backdrop ou no botão
  document.querySelectorAll('[data-action="close"]').forEach(el => {
    el.addEventListener('click', closeModal);
  });

  // fechar com Esc
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal.classList.contains('show')) closeModal();
  });

  // acessibilidade: abrir detalhe com Enter na seleção do cartão
  cards.forEach(card => {
    card.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') {
        card.querySelector('.view-detail')?.click();
      }
    });
    // tornamos os cards focáveis
    card.tabIndex = 0;
  });
});
