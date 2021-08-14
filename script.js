const selectors = {
  menuItemText: '.menu-item__text',
  subMenu: '.menu-item__submenu',
  subMenuItem: '.menu-item__submenu-item',
}

function addKeyboardEventListeners() {
  document.addEventListener('keyup', function (keyboardEvent) {
    if(keyboardEvent.key === 'Enter' || keyboardEvent.code === 'Space') {
      handleEnterAndSpaceKey(keyboardEvent);
    } else if(keyboardEvent.key === 'Tab') {
      handleTabKey(keyboardEvent);
    }
  })
}

function handleEnterAndSpaceKey (keyboardEvent) {
  const activeElement = document.activeElement;
  if(activeElement.getAttribute('tabindex') === '0') {
    activeElement.dispatchEvent(new Event('click'));
  }
}

function handleTabKey (keyboardEvent) {
  console.log(document.activeElement.classList)
  if(document.activeElement.classList.contains('menu-item__text')
    && !document.activeElement.classList.contains('menu-item__text--first')
  ) {
    closeOpenSubMenus();
  }
}

function addClickListenersToSubMenuItems () {
  const subMenuItems = document.querySelectorAll(selectors.subMenuItem);
  subMenuItems.forEach(subMenuItem => {
    subMenuItem.addEventListener('click', alertOnSubMenuItemClick)
  })
}

function alertOnSubMenuItemClick (clickEvent) {
  const subMenuItem = clickEvent.target;
  alert(subMenuItem.innerText);
}

function addClickListenersToMenuItems() {
  const menuItems = document.querySelectorAll(selectors.menuItemText);
  menuItems.forEach(menuItem => {
    menuItem.addEventListener('click', toggleSubmenu);
  })
}

function toggleSubmenu (clickEvent) {
  const spanElement = clickEvent.target;
  const menuItem = spanElement.parentElement;
  const subMenu = menuItem.querySelector(selectors.subMenu);

  if(subMenu.hasAttribute('hidden')) {
    closeOpenSubMenus();
    openSubMenu(subMenu)
  } else {
    closeSubMenu(subMenu)
  }
}

function closeOpenSubMenus () {
  const openSubMenus = document.querySelectorAll('.menu-item__submenu:not([hidden])');
  openSubMenus.forEach(closeSubMenu);
}

function openSubMenu (subMenu) {
  subMenu.removeAttribute('hidden');
  subMenu.removeAttribute('aria-hidden');
  addSubMenuItemTabIndices(subMenu);
}

function closeSubMenu (subMenu) {
  subMenu.setAttribute('hidden', '');
  subMenu.setAttribute('aria-hidden', 'true');
  removeSubMenuItemTabIndices(subMenu);
}

function removeSubMenuItemTabIndices (htmlElement) {
  const subMenuItems = htmlElement.querySelectorAll(selectors.subMenuItem);
  subMenuItems.forEach((subMenuItem) => subMenuItem.setAttribute('tabindex', '-1'));
}

function addSubMenuItemTabIndices (htmlElement) {
  const subMenuItems = htmlElement.querySelectorAll(selectors.subMenuItem);
  subMenuItems.forEach((subMenuItem) => subMenuItem.setAttribute('tabindex', '0'));
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

(function () {
  addKeyboardEventListeners();
  addClickListenersToSubMenuItems();
  addClickListenersToMenuItems();
  // normally we would clean up any event listeners to prevent mem leaks
  // but closing the page will take care of that for us
})();
