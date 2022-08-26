/* **************** Get user and ejecute Saludo *********************  */

let user = JSON.parse(localStorage.getItem('userJuanita'));
const logoutEl = document.getElementById('logout');
const spanSaludo = document.createElement('span');

spanSaludo.innerText = `Hola, ${user.name}! `
logoutEl.insertAdjacentElement('beforebegin', spanSaludo);
logoutEl.addEventListener('click', () => logout() );


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

/* ******************* Funcion Logout ******************************** */

function logout() {
    localStorage.removeItem('userJuanita');
    location.href = '../../index.html';
}

/* ******************* Show Products ********************************* */

const myPromise =  new Promise (( resolve, reject ) => {
    setTimeout( () => resolve( JSON.parse(localStorage.getItem('productos')) ), 2000);
})
const getProductos = async () => {
    /* console.log(await myPromise); */
    return await myPromise;
}
async function asignProductos () {
    const productos = await getProductos();
    const productsCtnEl =  document.getElementById('products-ctn');

    await productos && loadProducts(productos.todoslosproductos);
    
    function loadProducts(array) {
        const loadCtn = document.getElementById('loading-ctn');
        loadCtn.style.display = 'none';
        array.forEach((item, index) => {
            let newCtn = document.createElement('div');
            let newH3 = document.createElement('h3');
            let newP1 = document.createElement('p');
            let newP2 = document.createElement('p');
            let newImg = document.createElement('img');
            let newBtn = document.createElement('button');
            let price = Intl.NumberFormat('es-AR', {style: "currency", currency: "ARG"});
            newCtn.classList.add('product-ctn');
            newCtn.setAttribute('id', `product-ctn-${index}`);
            newH3.innerText = item.name;
            newP1.innerText = item.description;
            newImg.src = item.img;
            newBtn.innerHTML = 'Agregar al Carrito';
            newBtn.addEventListener('click', () => addToCart(item, index));
            newCtn.append(newImg, newH3, newP1);
            productsCtnEl.appendChild(newCtn);
            newP1.classList.add('products-text-p');
            newP2.classList.add('precio-p');
            
            if (item.type === 'vela') {
                let newSelect = document.createElement('select');
                let size;

                newSelect.innerHTML = '<option value="medium">Mediano</option><option value="big">Grande</option>';
                newCtn.insertAdjacentElement("beforeend", newSelect);
                newP2.innerText = price.format(item.content.medium.price);
                newSelect.addEventListener('change', () => {
                    size = newSelect.value;
                    size === 'medium' && (newP2.innerText = price.format(item.content.medium.price));
                    size === 'big' && (newP2.innerText = price.format(item.content.big.price));
                })        
            } else {
                newP2.innerText = price.format(item.price);                
            }
            newCtn.insertAdjacentElement('beforeend', newBtn);
            newCtn.insertAdjacentElement('beforeend', newP2);
        });
    }
}
function addToCart(obj, index) {
    const cartNumber = document.querySelector('#shopcart-img-ctn > span');
    const cartEl = document.querySelector('#shopcart-img-ctn');
    const productCtnEl = document.getElementById('product-ctn-'+index);
    
    cartNumber.innerText = Number(cartNumber.innerText) + 1;
    productCtnEl.style.transform = 'scale(1.05) ';
    setTimeout( ()=>productCtnEl.removeAttribute('style'), 1000 );
    cartEl.style.transform = 'scale(1.3)';
    setTimeout( ()=>cartEl.removeAttribute('style'), 1000 );
    
    if (obj.type === 'vela') {
        let size = document.querySelector('#product-ctn-'+ index + ' select').value;
        size === 'medium' && (obj.price = obj.content.medium.price) && (obj.stock = obj.content.medium.stock);

        size === 'big' && (obj.price = obj.content.big.price) && (obj.stock = obj.content.big.stock);
    }
    let productExists = user.myproducts.some( item => item.name === obj.name );
    !productExists ? (obj.quantity = 1) && user.myproducts.push(obj) : 
        user.myproducts.forEach( item => item.name === obj.name && item.quantity++ );
    console.log(productExists, obj, user);
    
}

/* ********************************** Scrolling Header ****************************************************** */
function scrollTop() {
    const header = document.querySelector('header');
    const logoCtn =  document.querySelector('.logo');
    const divMenuTitle = document.querySelector('.title');
    const signInUp = document.querySelector('.sign-in-up');
    let position = document.documentElement.offsetTop;
    let scrolled = document.scrollingElement.scrollTop;
    
    console.log(position, scrolled);
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
window.addEventListener('load', () => asignProductos());
window.addEventListener( 'scroll', (e) => {
    scrollTop(e);
})
