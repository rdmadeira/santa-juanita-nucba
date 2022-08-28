import {productos} from './products.mjs'

window.addEventListener('load', ()=>sendData(productos));

function sendData(data) {
    localStorage.setItem('productos', JSON.stringify(data));
    return data;
}