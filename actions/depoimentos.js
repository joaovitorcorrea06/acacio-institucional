document.addEventListener('DOMContentLoaded', function () {
  // Carrossel de depoimentos
  const depoimentosContainer = document.querySelector('.depoimentos-container');
  const depoimentoCards = document.querySelectorAll('.depoimento-card');
  const prevBtn = document.querySelector('.prev-btn');
  const nextBtn = document.querySelector('.next-btn');
  const indicadores = document.querySelector('.carrossel-indicadores');

  // Criar indicadores
  depoimentoCards.forEach((_, index) => {
    const indicador = document.createElement('span');
    if (index === 0) indicador.classList.add('active');
    indicador.addEventListener('click', () => {
      scrollToDepoimento(index);
    });
    indicadores.appendChild(indicador);
  });

  let currentIndex = 0;

  function updateIndicadores() {
    document.querySelectorAll('.carrossel-indicadores span').forEach((ind, index) => {
      ind.classList.toggle('active', index === currentIndex);
    });
  }

  function scrollToDepoimento(index) {
    const cardWidth = depoimentoCards[0].offsetWidth + 32; // width + gap
    depoimentosContainer.scrollTo({
      left: index * cardWidth,
      behavior: 'smooth'
    });
    currentIndex = index;
    updateIndicadores();
  }

  prevBtn.addEventListener('click', () => {
    currentIndex = (currentIndex > 0) ? currentIndex - 1 : depoimentoCards.length - 1;
    scrollToDepoimento(currentIndex);
  });

  nextBtn.addEventListener('click', () => {
    currentIndex = (currentIndex < depoimentoCards.length - 1) ? currentIndex + 1 : 0;
    scrollToDepoimento(currentIndex);
  });

  // Atualizar indicadores no scroll
  depoimentosContainer.addEventListener('scroll', () => {
    const cardWidth = depoimentoCards[0].offsetWidth + 32;
    currentIndex = Math.round(depoimentosContainer.scrollLeft / cardWidth);
    updateIndicadores();
  });
});