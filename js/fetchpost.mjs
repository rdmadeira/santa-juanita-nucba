import {productos} from './products.mjs'

if (!localStorage.getItem('productos')) {
    window.addEventListener('load', ()=>sendData(productos));
}

function sendData(data) {
    localStorage.setItem('productos', JSON.stringify(data));
    return data;
}