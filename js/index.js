const sectionContacto = document.getElementById('contactos');
const liContactlEl = document.getElementById('click-contacto');
liContactlEl.addEventListener('click', () => showContactoInputs());
function showContactoInputs() {
    sectionContacto.classList.contains('show-contacts-visible') ? 
        sectionContacto.classList.remove('show-contacts-visible')
        : sectionContacto.classList.add('show-contacts-visible');
}

document.getElementById('btn-cerrar').addEventListener('click', cambioCss)
function cambioCss() {
    sectionContacto.classList.remove('show-contacts-visible');
}

document.getElementById('menu-vertical').addEventListener('click', showMenuMobile);   
function showMenuMobile() {
    const menuVertical = document.getElementById('ul-menu');
    const visibility2 = menuVertical.style.visibility;
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

let btnEnviar = document.getElementById('form-contacto');
btnEnviar.addEventListener('submit', () => setForm());
function setForm() {
    let name = document.formContacto.Nombre;
    let apellido = document.formContacto.Apellido;
    let tel = document.formContacto.Telefono;
    let email = document.formContacto.email;
    let data = [name.value, apellido.value, tel.value, email.value]
    console.log(data);
}

