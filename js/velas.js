import {setUserAndUsers, loadProducts, addToCart, getProductos} from "./functions.mjs";
import {showLogin} from './login-register.js'

/* ******************* Get Products ********************************* */

window.addEventListener('load', async () => {
    const productos = await getProductos();
    const velas = productos.velas;
    console.log(velas);
    await productos && loadProducts(velas);
    const addToCartButtonsEls = document.querySelectorAll('.product-ctn button');
    addToCartButtonsEls.forEach( item => item.addEventListener('click', ()=> {
        showLogin();
        location.href = '#section-login'
    }) );
});