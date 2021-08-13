(function () {
  addClickListenersToMenuItems();
  // normally we would clean up any event listeners to prevent mem leaks
  // but closing the page will take care of that for us
})();

function toggleSubmenu (clickEvent) {
  const spanElement = clickEvent.target;
  const menuItem = spanElement.parentElement;
  const subMenu = menuItem.querySelector('.menu-item__submenu');

  if(subMenu.hasAttribute('hidden')) {
    subMenu.removeAttribute('hidden');
    subMenu.removeAttribute('aria-hidden');
  } else {
    subMenu.setAttribute('hidden', '');
    subMenu.setAttribute('aria-hidden', 'true');
  }
}

function addClickListenersToMenuItems() {
  const menuItems = document.querySelectorAll('.menu-item__text');
  menuItems.forEach(menuItem => {
    menuItem.addEventListener('click', toggleSubmenu);
  })
}

function toggleCssTheme (newTheme) {
  const body = document.body;
  const toggleLightModeButton = document.querySelector('#toggle-light-mode');
  const toggleDarkModeButton = document.querySelector('#toggle-dark-mode');

  if(newTheme === 'light') {
    body.removeAttribute('dark');
    toggleLightModeButton.setAttribute('hidden', '');
    toggleDarkModeButton.removeAttribute('hidden');
  } else {
    body.setAttribute('dark', 'true');
    toggleLightModeButton.removeAttribute('hidden');
    toggleDarkModeButton.setAttribute('hidden', '')
  }
}

