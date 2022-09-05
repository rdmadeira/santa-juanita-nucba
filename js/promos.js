import {setUserAndUsers, loadProducts, addToCart} from './functions.mjs';

let user = JSON.parse(localStorage.getItem('userJuanita'));
let users = JSON.parse(localStorage.getItem('usersJuanita'));

/* ************************* Get Prtoducts *************************************************** */

const myPromise =  new Promise (( resolve, reject ) => {
    setTimeout( () => resolve( JSON.parse(localStorage.getItem('productos')) ), 2000);
});
const getProductos = async () => {
    /* console.log(await myPromise); */
    return await myPromise;
}
async function asignProductos () {
    const productos = await getProductos();
    const productosPromo = productos.todoslosproductos.filter(item => item.promo === true);
    console.log(productosPromo);
    productos && loadProducts(productosPromo);    
}


/* ************************* Show Prtoducts *************************************************** */

window.addEventListener('load', () => asignProductos());

/* *************************** Funcion find Products  ******************************************* */

const searchForm = document.getElementById('search-products-form');
searchForm.addEventListener('submit', (e) => findProducts(e));