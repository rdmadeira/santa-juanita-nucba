window.onload = function () {
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




    document.getElementById('sign-up-in').addEventListener('click', showLogin);
    function showLogin () {
    let sectionLogin = document.getElementById('section-login');
    if (sectionLogin.classList.contains('none-display' && 'bounce-out-top')) {
        sectionLogin.classList.toggle('none-display');
        sectionLogin.classList.toggle('bounce-in-top');
        sectionLogin.classList.toggle('bounce-out-top');
    } else {
        sectionLogin.classList.toggle('bounce-in-top');
        sectionLogin.classList.toggle('bounce-out-top');
        sectionLogin.addEventListener('animationend', 
        () => {
            sectionLogin.classList.add('none-display');
        }, 
        {once: true});
    }
}
}