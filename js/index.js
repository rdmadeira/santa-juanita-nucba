window.onload = function (){
    var sectionContacto = document.getElementById('contactos');
    
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


var btnEnviar = document.getElementById('buton-enviar');
btnEnviar.addEventListener('click',setForm);
function setForm() {
    var name = document.formContacto.Nombre;
    var apellido = document.formContacto.Apellido;
    var tel = document.formContacto.Telefono;
    var email = document.formContacto.email;
    var data = [name.value, apellido.value, tel.value, email.value]
    console.log(data);
}

showSlides();
}
let slideIndex = 0;

function showSlides() {
  let i;
  let slides = document.getElementsByClassName("mySlides");
  for (i = 0; i < slides.length; i++) {
    slides[i].style.display = "none";
  }
  slideIndex++;
  if (slideIndex > slides.length) {
    slideIndex = 1
  }
  slides[slideIndex-1].style.display = "block";
  setTimeout(showSlides, 10000); // Change image every 10 seconds
}
