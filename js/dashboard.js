const tabs   = document.querySelectorAll('.dash-tab');
const panels = document.querySelectorAll('.dash-panel');

function activateTab(tabName) {
  tabs.forEach(t => {
    const isActive = t.dataset.tab === tabName;
    t.classList.toggle('dash-tab--active', isActive);
    t.setAttribute('aria-selected', isActive);
  });
  panels.forEach(p => {
    p.classList.toggle('dash-panel--visible', p.id === 'tab-' + tabName);
  });
}

tabs.forEach(tab => {
  tab.addEventListener('click', () => activateTab(tab.dataset.tab));
});

// Default active tab
activateTab('penyewaan');
