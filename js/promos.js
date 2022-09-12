import {setUserAndUsers, loadProducts, findProducts, getProductos, searchForm} from './functions.mjs';

let user = JSON.parse(localStorage.getItem('userJuanita'));
let users = JSON.parse(localStorage.getItem('usersJuanita'));

/* ************************* Get Prtoducts *************************************************** */


async function asignProductos () {
    const productos = await getProductos();
    const productosPromo = productos.todoslosproductos.filter(item => item.promo === true);
    console.log(productosPromo);
    productos && loadProducts(productosPromo);    
}


/* ************************* Show Prtoducts *************************************************** */

window.addEventListener('load', () => asignProductos());

/* *************************** Funcion find Products  ******************************************* */

searchForm.addEventListener('submit', (e) => findProducts(e));

