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


/* ************************************* Login/SignUp Section *************************************** */

document.getElementById('sign-up-in').addEventListener('click', () => showLogin());
function showLogin () {
    let sectionLogin = document.getElementById('section-login');
    if (sectionLogin.classList.contains('none-display')) {
        sectionLogin.classList.replace('none-display', 'bounce-in-top');
        //sectionLogin.classList.add('bounce-in-top');
        return console.log(sectionLogin.classList);
        //sectionLogin.classList.toggle('slide-out-top');
    } 
    if (sectionLogin.classList.contains('bounce-in-top')) {
        sectionLogin.classList.replace('bounce-in-top', 'slide-out-top');
        sectionLogin.addEventListener('animationend', 
        () => {
            sectionLogin.classList.add('none-display');
            sectionLogin.classList.remove('slide-out-top');
        }, {once:true});
        return console.log(sectionLogin.classList);
    }
}


/* **************** Users declaration ***************** */

let users = JSON.parse(localStorage.getItem('usersJuanita'));
if (users === null) {
    users = [];
}

const verifyEmailForm = document.getElementById('verify-email-form');
const signInForm =  document.getElementById('sign-in-form');
const signUpForm = document.getElementById('sign-up-form');
const submitErrorSpam = document.querySelector('.submit-error');
verifyEmailForm.addEventListener('submit', (e)=> verifyUser(e));
function verifyUser(e) {
    e.preventDefault();
    let email = verifyEmailForm.email.value;
    const spanVolver = document.querySelectorAll('.span-volver');
    spanVolver.forEach(item => {
        item.addEventListener('click', () => backVerifyUser(item));
    });
    if (checkEmail(email)) {
        showNext(signInForm);

    } else {
        showNext(signUpForm);
        signUpForm.email.value = email;
    }
    function showNext(element) {
        verifyEmailForm.classList.contains('fade-in-left') && verifyEmailForm.classList.replace('fade-in-left', 'fade-out-left');
        !verifyEmailForm.classList.contains('fade-in-left') && verifyEmailForm.classList.add('fade-out-left');
        verifyEmailForm.addEventListener('animationend', ()=> {
            verifyEmailForm.classList.replace('display-flex', 'none-display');
            element.classList.replace('none-display', 'fade-in-right');
            element.classList.add('display-flex');
        }, {once: true});        
    }
    function backVerifyUser(item) {
        item.parentNode.classList.replace('fade-in-right', 'fade-out-right');
        item.parentNode.addEventListener('animationend', ()=> {
            item.parentNode.classList.replace('display-flex', 'none-display');
            item.parentNode.classList.remove('fade-out-right');
            verifyEmailForm.classList.replace('none-display', 'display-flex');
            verifyEmailForm.classList.replace('fade-out-left', 'fade-in-left');
        }, {once: true});
    }
    function checkEmail(string) {
        console.log(string);
        return users.some(item => item.email === string);
    }
}

/* 


function verifyUser(e) {
    e.preventDefault();
    const email = signInUpForm.email.value;
    const spanVolver = document.createElement('span');
    const newPasswordLabel = document.createElement('label');
    const newPasswordInput = document.createElement('input');
    const btnSubmit = document.getElementById('btn-mail-submit');
    let user = users.find(item => item.email === email);
    function createPasswordInput() {
        spanVolver.classList.add('span-volver');
        spanVolver.innerText = '<<';
        signInUpForm.insertAdjacentElement('afterbegin', spanVolver);
        newPasswordLabel.innerText = 'Password';
        newPasswordLabel.setAttribute('for', 'sign-in-input-password');
        newPasswordInput.setAttribute('type', 'password');
        newPasswordInput.setAttribute('id', 'sign-in-input-password');
        newPasswordInput.setAttribute('name', 'password');
        signInUpForm.email.readOnly = true;
        titleForm.innerText = 'Ingresá A Su Cuenta:'
        btnSubmit.insertAdjacentElement("beforebegin", newPasswordLabel);
        btnSubmit.insertAdjacentElement("beforebegin", newPasswordInput);
        btnSubmit.innerHTML = 'Ingresá';
        spanVolver.addEventListener('click', ()=> removePasswordInput());
        signInUpForm.addEventListener('submit', (e)=>{
            e.preventDefault();
            let password = newPasswordInput.value;
            // console.log(password);
            if (user.email === email && user.password === password) {
                localStorage.setItem('userJuanita', JSON.stringify(user));
                return location.href = './pagina-user';
            }
            if (user.email !== email || user.password !== password) {
                submitErrorSpam.classList.add('visible');
                setTimeout( ()=>{
                    submitErrorSpam.classList.remove('visible');
                }, 4000);
            }
        });
    }
    function removePasswordInput() {
        spanVolver.remove();
        newPasswordLabel.remove();
        newPasswordInput.remove();
        btnSubmit.innerText = 'SIGUIENTE';
        titleForm.innerText = 'INGRESÁ O CREÁ SU CUENTA'
        signInUpForm.email.readOnly = false;
        signInUpForm.addEventListener('submit', (e)=> verifyUser(e), {once: true});
    }
    if (checkEmail(email)) {
        createPasswordInput();        
    }

    if (!checkEmail(email)) {
        addRegisterInputs();
        signInUpForm.addEventListener('submit', (e) => registerNewUser(e));
    }
}


let titleForm = document.querySelector('#form-sign-in-up h3');
function addRegisterInputs() {
    titleForm.innerHTML = 'CREÁ SU CUENTA: ';
    const newInputName = document.createElement('input');
    const newInputLastname = document.createElement('input');
    const newLabelName = document.createElement('label');
    const newLabelLastname = document.createElement('label');
    const newPasswordLabel = document.createElement('label');
    const newPasswordInput = document.createElement('input');
    const btnSubmit = document.getElementById('btn-mail-submit');
    newLabelName.innerText = 'Name:';
    newLabelLastname.innerText = 'Lastname:';
    newInputName.setAttribute('type', 'text');
    newInputName.setAttribute('name', 'name');
    newInputLastname.setAttribute('type', 'text');
    newInputLastname.setAttribute('name', 'lastname');
    newPasswordLabel.innerText = 'Password';
    newPasswordLabel.setAttribute('for', 'sign-in-input-password');
    newPasswordInput.setAttribute('type', 'password');
    newPasswordInput.setAttribute('id', 'sign-in-input-password');
    newPasswordInput.setAttribute('name', 'password');
    titleForm.insertAdjacentElement('afterend', newInputLastname);
    titleForm.insertAdjacentElement('afterend', newInputName);
    newInputLastname.insertAdjacentElement('beforebegin', newLabelLastname);
    newInputName.insertAdjacentElement('beforebegin', newLabelName);
    btnSubmit.insertAdjacentElement("beforebegin", newPasswordLabel);
    btnSubmit.insertAdjacentElement("beforebegin", newPasswordInput);
    btnSubmit.innerHTML = 'Registrá';
}
function registerNewUser(e) {
    e.preventDefault();
    const name = signInUpForm.name.value;
    const lastname = signInUpForm.lastname.value;
    const email = signInUpForm.email.value;
    const password = signInUpForm.password.value;
    class User {
        constructor (name, lastname, email, password) {
            this.name = name;
            this.lastname = lastname;
            this.email = email;
            this.password = password;
            this.myproducts = [];
        }
    }
    console.log(name, lastname, email, password);
    if (name !=='' && lastname !== '' && email !== '' && password !== '') {
        const newUser =  new User (name, lastname, email, password);
        users.push(newUser);
        setUserAndUsers(users, newUser);
        //verifyUser();
        //location.href = '#section-login';
    }
}
function setUserAndUsers(users, user) {
    localStorage.setItem('usersJuanita', JSON.stringify(users));
    localStorage.setItem('userJuanita', JSON.stringify(user));
}
function checkEmail(string) {
    return (users.some( item => item.email === string))
} */
}



