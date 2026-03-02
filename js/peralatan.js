// Filter tabs
const filterBtns = document.querySelectorAll('.filter-btn');

filterBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    filterBtns.forEach(b => b.classList.remove('filter-btn--active'));
    btn.classList.add('filter-btn--active');

    const selected = btn.textContent.trim();
    const cards    = document.querySelectorAll('.equip-card');

    cards.forEach(card => {
      const category = card.querySelector('.equip-card__category')?.textContent.trim() ?? '';
      if (selected === 'Semua' || category === selected) {
        card.style.display = '';
      } else {
        card.style.display = 'none';
      }
    });
  });
});
