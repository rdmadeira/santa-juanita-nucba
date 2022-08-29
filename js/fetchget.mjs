import {setUserAndUsers} from "./functions.mjs";
let user = JSON.parse(localStorage.getItem('userJuanita'));
let users = JSON.parse(localStorage.getItem('usersJuanita'));

/* ******************* Get Products ********************************* */

const myPromise =  new Promise (( resolve, reject ) => {
    setTimeout( () => resolve( JSON.parse(localStorage.getItem('productos')) ), 2000);
});
export const getProductos = async () => {
    /* console.log(await myPromise); */
    return await myPromise;
}

/* *********************** Load Products ****************************** */

const productsCtnEl =  document.getElementById('products-ctn');
const loadCtn = document.getElementById('loading-ctn');

function loadProducts(array) {
    loadCtn && (loadCtn.style.display = 'none');
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
            });
        } else {
            newP2.innerText = price.format(item.price);                
        }
        newCtn.insertAdjacentElement('beforeend', newBtn);
        newCtn.insertAdjacentElement('beforeend', newP2);
    });
}
async function asignProductos () {
    const productos = await getProductos();
    await productos && loadProducts(productos.todoslosproductos);    
}

window.addEventListener('load', () => asignProductos());


/* *************************** Funcion addToCart  ******************************************* */

const cartNumber = document.querySelector('#shopcart-img-ctn > span');
const cartEl = document.querySelector('#shopcart-img-ctn');

export function addToCart(obj, index) {
    const productCtnEl = document.getElementById('product-ctn-'+index);
    cartNumber.innerText = Number(cartNumber.innerText) + 1;
    productCtnEl.style.transform = 'scale(1.05) ';
    setTimeout( ()=>productCtnEl.removeAttribute('style'), 400 );
    cartEl.style.transform = 'scale(1.3)';
    setTimeout( ()=>cartEl.removeAttribute('style'), 1000 );
    
    if (obj.type === 'vela') {
        let size = document.querySelector('#product-ctn-'+ index + ' select').value;
        size === 'medium' && (obj.price = obj.content.medium.price) && (obj.stock = obj.content.medium.stock);

        size === 'big' && (obj.price = obj.content.big.price) && (obj.stock = obj.content.big.stock);
        obj.size = size;
    }
    let productExists = user.myproducts.some( item => item.name === obj.name && item.size === obj.size);
    !productExists ? (obj.quantity = 1) && user.myproducts.push(obj) : 
        user.myproducts.forEach( item => item.name === obj.name && item.quantity++ );
    users.forEach( (item, index) => item.email === user.email && (users[index] = user) );
    users.splice( users.indexOf(user.email) , 1, user);
    setUserAndUsers(users, user);
    console.log(user, users);
}


/* ********************************************* Search Products *************************************** */

const searchForm = document.getElementById('search-products-form');
searchForm.addEventListener('submit', (e) => findProducts(e));

async function findProducts(e) {
    e.preventDefault();
    const productos = await getProductos();
    const searchString = searchForm.search.value;
    let findedProducts = productos.todoslosproductos.filter( item => item.keywords.includes(searchString) );
    productsCtnEl.innerHTML = '';
    loadCtn.removeAttribute('style');
    setTimeout( ()=> loadProducts(findedProducts), 1000 );
}