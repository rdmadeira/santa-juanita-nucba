//var sectionContacto = document.getElementById('contactos');
document.getElementById('click-contacto').addEventListener('click', showContactoInputs);
function showContactoInputs() {
    var sectionContacto = document.getElementById('contactos');
    var visibility = sectionContacto.style.visibility; 
    if (visibility =='hidden') {
        sectionContacto.style.visibility = 'visible';
        sectionContacto.style.opacity = 1;
        sectionContacto.style.width = '100%';
        sectionContacto.style.maxWidth = '850px';
        
    } else if (visibility == 'visible') {
        sectionContacto.style.visibility = 'hidden';
        sectionContacto.style.opacity = 0;
        sectionContacto.style.width = 0;
        }
    else {
        sectionContacto.style.visibility = 'visible';
        sectionContacto.style.opacity = 1;
        sectionContacto.style.width = '100%';
        sectionContacto.style.maxWidth = '850px';
    }    
}
document.getElementById('btn-cerrar').addEventListener('click', cambioCss)
function cambioCss() {
    sectionContacto.style.visibility = 'hidden';
    sectionContacto.style.opacity = 0;
    sectionContacto.style.width = 0;
}
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

