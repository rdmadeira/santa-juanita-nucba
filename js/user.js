let users = JSON.parse(localStorage.getItem('usersJuanita'));

/* ******************* Funcion Logout ******************************** */

const logoutEl = document.getElementById('logout');
logoutEl.addEventListener('click', () => logout() );
function logout() {
    localStorage.removeItem('userJuanita');
    location.href = '../../index.html';
}

/* **************** Get user and ejecute Saludo *********************  */
let user = JSON.parse(localStorage.getItem('userJuanita'));
const spanSaludo = document.createElement('span');
spanSaludo.innerText = `Hola, ${user.name}! `
logoutEl.insertAdjacentElement('beforebegin', spanSaludo);


/* *************** For Mobiles Show Menu vertical **************** */

document.getElementById('menu-vertical').addEventListener('click', showMenuMobile);   
function showMenuMobile() {
    var menuVertical = document.getElementById('ul-menu');
    var visibility2 = menuVertical.style.visibility;
    var iconoOculto = document.getElementById('menu-vertical');
    var display = iconoOculto.style.display;
    
    if (visibility2 == 'hidden' && matchMedia("(max-width:520px)")) {
        menuVertical.style.visibility = 'visible';
        menuVertical.style.opacity = 1;
    } 
    else if (visibility2 == 'visible' && matchMedia("(max-width:520px)")) {
        menuVertical.style.visibility = 'hidden';
        menuVertical.style.opacity = 0;
    } 
    else {
        menuVertical.style.visibility = 'visible';
        menuVertical.style.opacity = 1;
    }
}

/* ********************************** Scrolling Header ****************************************************** */
function scrollTop() {
    const header = document.querySelector('header');
    const logoCtn =  document.querySelector('.logo');
    const divMenuTitle = document.querySelector('.title');
    const signInUp = document.querySelector('.sign-in-up');
    let position = document.documentElement.offsetTop;
    let scrolled = document.scrollingElement.scrollTop;
    
    if (scrolled > position + 120 ) {
        header.classList.add('reduced-header');
        logoCtn.classList.add('reduced-logo');
        divMenuTitle.classList.add('reduced-title');
        signInUp.classList.add('reduced-title');
    } 
    if (scrolled < position + 20) {
        header.classList.remove('reduced-header');
        logoCtn.classList.remove('reduced-logo');
        divMenuTitle.classList.remove('reduced-title');
        signInUp.classList.remove('reduced-title');
    }
}

window.addEventListener( 'scroll', (e) => {
    scrollTop(e);
})


/* *************************** Nav Menu anchors ************************ */

const cartEl = document.querySelector('#shopcart-img-ctn');
const productosMenuEl = document.getElementById('menu-productos');
const promosMenuEl = document.getElementById('menu-promos');

productosMenuEl.addEventListener( 'click', () => location.href = './userproducts.html' );
promosMenuEl.addEventListener('click', () => location.href = './promos.html' );
cartEl.addEventListener('click', () => location.href = './mycart.html');
