import {setUserAndUsers, loadProducts, findProducts, getProductos, searchForm} from "./functions.mjs";

let user = JSON.parse(localStorage.getItem('userJuanita'));
let users = JSON.parse(localStorage.getItem('usersJuanita'));

/* *********************** Load Products ****************************** */

window.addEventListener('load', async () => {
    const productos = await getProductos()
    await productos && loadProducts(productos.todoslosproductos);
});

/* ********************************************* Search Products *************************************** */

searchForm && searchForm.addEventListener('submit', (e) => findProducts(e));

