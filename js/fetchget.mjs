import {setUserAndUsers, loadProducts, addToCart, getProductos} from "./functions.mjs";
let user = JSON.parse(localStorage.getItem('userJuanita'));
let users = JSON.parse(localStorage.getItem('usersJuanita'));

/* ******************* Get Products ********************************* */

const myPromise =  new Promise (( resolve, reject ) => {
    setTimeout( () => resolve( JSON.parse(localStorage.getItem('productos')) ), 2000);
});
const getProductos = async () => {
    /* console.log(await myPromise); */
    return await myPromise;
}

/* *********************** Load Products ****************************** */

window.addEventListener('load', async () => {
    const productos = await getProductos();
    const velas = productos.velas;
    console.log(velas);
    await productos && loadProducts(productos.todoslosproductos);
});

/* ********************************************* Search Products *************************************** */

const searchForm = document.getElementById('search-products-form');
searchForm && searchForm.addEventListener('submit', (e) => findProducts(e));

export async function findProducts(e) {
    e.preventDefault();
    const productos = await getProductos();
    const loadCtn = document.getElementById('loading-ctn');
    const searchString = searchForm.search.value;
    const productsCtnEl =  document.getElementById('products-ctn');
    let findedProducts = productos.todoslosproductos.filter( item => item.keywords.includes(searchString) );
    productsCtnEl.innerHTML = '';
    loadCtn.removeAttribute('style');
    setTimeout( ()=> loadProducts(findedProducts), 1000 );
}