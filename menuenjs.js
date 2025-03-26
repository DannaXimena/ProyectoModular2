// JavaScript para manejar el cambio de visibilidad del menú en dispositivos móviles
const menuToggle = document.getElementById('menu-toggle');
const menu = document.querySelector('.menu');

menuToggle.addEventListener('click', () => {
    menu.classList.toggle('active');
});