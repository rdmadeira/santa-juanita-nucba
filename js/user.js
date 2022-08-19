let user = JSON.parse(localStorage.getItem('userJuanita'));
const logoutEl = document.getElementById('logout');
const spanSaludo = document.createElement('span');
spanSaludo.innerText = `Hola, ${user.name}! `
logoutEl.insertAdjacentElement('beforebegin', spanSaludo);

logoutEl.addEventListener('click', () => logoutEl(user) );

/* *************** Para Mobiles Show Menu vertical **************** */
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

/* ******************* Funcion Logout ******************************** */
function logout(user) {
    console.log(user);
}