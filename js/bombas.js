import {setUserAndUsers, loadProducts, addToCart, getProductos} from "./functions.mjs";
import {showLogin} from './login-register.js'

/* ******************* Get Products ********************************* */

window.addEventListener('load', async () => {
    const productos = await getProductos();
    const bombas = productos.bombas;
    console.log(bombas);
    await productos && loadProducts(bombas);
    const addToCartButtonsEls = document.querySelectorAll('.product-ctn button');
    addToCartButtonsEls.forEach( item => item.addEventListener('click', ()=> {
        showLogin();
        location.href = '#section-login'
    }) );
});