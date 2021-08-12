(function () {
  addClickListenersToMenuItems();
  // normally we would clean up any event listeners to prevent mem leaks
  // but closing the page will take care of that for us
})();

function toggleSubmenu (clickEvent) {
  const spanElement = clickEvent.target;
  const menuItem = spanElement.parentElement;
  const subMenu = menuItem.querySelector('.nav-item__submenu');

  if(subMenu.hasAttribute('hidden')) {
    subMenu.removeAttribute('hidden');
    subMenu.removeAttribute('aria-hidden');
  } else {
    subMenu.setAttribute('hidden', '');
    subMenu.setAttribute('aria-hidden', 'true');
  }
}

function addClickListenersToMenuItems() {
  const menuItems = document.querySelectorAll('.nav-item__text');
  menuItems.forEach(menuItem => {
    menuItem.addEventListener('click', toggleSubmenu);
  })
}

