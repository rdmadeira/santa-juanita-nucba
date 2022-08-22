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
        array.forEach(item => {
            let newCtn = document.createElement('div');
            let newH3 = document.createElement('h3');
            let newP1 = document.createElement('p');
            let newP2 = document.createElement('p');
            let newImg = document.createElement('img');
    
            newCtn.classList.add('product-ctn');
            newH3.innerText = item.name;
            newP1.innerText = item.description;
            if (item.type = 'vela') {
                newP2.innerText = item.price;
                
            }
            newImg.src = item.img;
    
            newCtn.append(newImg, newH3, newP1);
            productsCtnEl.appendChild(newCtn);
        });
    }

}
window.addEventListener('load', () => asignProductos());