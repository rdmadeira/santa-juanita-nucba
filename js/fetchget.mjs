import {setUserAndUsers, loadProducts, addToCart, findProducts} from "./functions.mjs";
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



async function asignProductos () {
    const productos = await getProductos();
    await productos && loadProducts(productos.todoslosproductos);    
}
window.addEventListener('load', () => asignProductos());




/* *************************** Funcion addToCart  ******************************************* */





/* ********************************************* Search Products *************************************** */

const searchForm = document.getElementById('search-products-form');
searchForm.addEventListener('submit', (e) => findProducts(e));

