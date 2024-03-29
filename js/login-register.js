import { setUserAndUsers } from "./functions.mjs";

/* ************************************* Login/SignUp Section *************************************** */
const signUpInEl = document.getElementById('sign-up-in');
signUpInEl.addEventListener('click', () => showLogin());    

export function showLogin () {
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

let user;
let users = JSON.parse(localStorage.getItem('usersJuanita'));
if (users === null) {
    users = [];
}

/* **************** Verify Email Functions and Listeners **************** */

const verifyEmailForm = document.getElementById('verify-email-form');
const signInForm =  document.getElementById('sign-in-form');
const signUpForm = document.getElementById('sign-up-form');
const submitErrorSpam = document.querySelectorAll('.submit-error');
verifyEmailForm.addEventListener('submit', (e)=> verifyUser(e));
verifyEmailForm.addEventListener('input', () => cleanOutline(verifyEmailForm.email));

function verifyUser(e) {
    e.preventDefault();
    let email = verifyEmailForm.email.value;
    const spanVolver = document.querySelectorAll('.span-volver');
    spanVolver.forEach(item => {
        item.addEventListener('click', () => backVerifyUser(item));
    });
    if (checkEmail(email)) {
        showNext(signInForm);
        signInForm.email.value = email;
        signInForm.email.readOnly = true;
    } else if (!checkEmail(email) && email !== '') {
        showNext(signUpForm);
        signUpForm.email.value = email;
        signUpForm.email.readOnly = true;
    } else if (email === '') {
        showSpamMensaje('Completá todos los campos!');
        verifyEmailForm.email.style.outline = 'red 2px solid';                
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
function cleanOutline(element) {
    element.removeAttribute('style');
    submitErrorSpam.forEach( item => item.classList.remove('visible') );
}
function showSpamMensaje(string) {
    submitErrorSpam.forEach( item => {
        console.log(item);
        item.classList.add('visible'); 
        item.innerHTML = string;
        setTimeout( () => item.classList.remove('visible'), 4000 );
    });
}

/* ************************ Login Functions and Listeners *********************** */

signInForm.addEventListener('submit', e => checkLogin(e));
function checkLogin (e) {
    e.preventDefault();
    let email = signInForm.email.value;
    let password = signInForm.password.value;
    user = users.find(item => item.email === email && item.password === password);
    signInForm.addEventListener('input', () => {
        cleanOutline(signInForm.email); 
        cleanOutline(signInForm.password);
    });
    
    if (email === '' || password === '') {
        showSpamMensaje('Completá todos los campos');
        email === '' && (signInForm.email.style.outline = 'red 2px solid');
        password === '' && (signInForm.password.style.outline = 'red 2px solid');
    } else if (user){
        loginUser(user)
    } else {
        showSpamMensaje('Datos Incorrectos!')
    }
    
    function loginUser(user) {
        localStorage.setItem('userJuanita', JSON.stringify(user));
        setTimeout( ()=> location.href = '../public/user/userproducts.html', 1000 );
        console.log(user);;
    }
}

/* ************************ Register Functions and Listeners *********************** */

signUpForm.addEventListener('submit', e => checkRegister(e));
signUpForm.addEventListener('input', () => {
    cleanOutline(signUpForm.name);
    cleanOutline(signUpForm.lastname);
    cleanOutline(signUpForm.email);
    cleanOutline(signUpForm.password);
});
function checkRegister(e) {
    e.preventDefault();
    let name = signUpForm.name.value;
    let lastname = signUpForm.lastname.value;
    let email = signUpForm.email.value;
    let password = signUpForm.password.value; console.log(password.length);
    class User {
        constructor (name, lastname, email, password) {
            this.name = name;
            this.lastname = lastname;
            this.email = email;
            this.password = password;
            this.myproducts = [];
        }
        bienvenida () {
            return `Bienvenid@ ${this.name}!`;
        }
        misProductos () {
            return `Sus productos elejidos son:`
        }
    }
    if (name === '' || lastname === '' || email === '' || password === '') {
        showSpamMensaje('Completá todos los campos!');
        name === '' && (signUpForm.name.style.outline = 'solid 2px red');
        lastname === '' && (signUpForm.lastname.style.outline = 'solid 2px red');
        email === '' && (signUpForm.email.style.outline = 'solid 2px red');
        password === '' && (signUpForm.password.style.outline = 'solid 2px red');
    } else if (password.length < 6 ) {
        showSpamMensaje('Elija contraseña con 6 o más caracteres');
        signUpForm.password.style.outline = 'solid 2px red';
    } else {
        user = new User (name, lastname, email, password);
        createNewUser(user);
        signUpForm.classList.remove('fade-in-right');
        signUpForm.classList.replace('display-flex', 'none-display');
        signInForm.classList.add('hidden');
        signInForm.firstElementChild.style.display = 'none';
        signInForm.email.value = user.email;
        signInForm.classList.replace('none-display', 'display-flex');
        setTimeout( ()=>{
            signInForm.classList.replace('hidden', 'visible')
        }, 1000 );
        return user
    }
}
function createNewUser(user) {
    users.push(user);
    setUserAndUsers(users, user);
}
