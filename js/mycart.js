import { setUserAndUsers } from "./functions.mjs";

let user = JSON.parse(localStorage.getItem('userJuanita'));
let users = JSON.parse(localStorage.getItem('usersJuanita'));
let productos = JSON.parse(localStorage.getItem('productos'));

/* ******************* Reset Cart ********************* */

const resetCartBtn = document.getElementById('reset-cart-btn');
resetCartBtn.addEventListener('click', () => resetCart());
function resetCart() {
    user.myproducts.splice(0, user.myproducts.length);
    users.forEach( (item, index) => { item.email === user.email && (users[index] = user) });
    setUserAndUsers(users, user);
    location.href = './mycart.html';
}

/* ****************** Funcion inicial crear tabla o show no items ********************* */

const noItemsDiv = document.querySelector('.no-items');
let myProducts = user.myproducts;
const formatPesosArg = Intl.NumberFormat('es-AR', {
    style: "currency",
    currency: "ARS",
});
myProducts.length === 0 && (noItemsDiv.style.display = 'block');
myProducts.length > 0 && createTable();

function createTable() {
    console.log(myProducts);
    const tableCtn = document.querySelector('.table-ctn');
    myProducts.forEach( (item, index) => {
        const newCheckboxLi = document.createElement('li');
        const newCheckbox = document.createElement('input');
        const newName =  document.createElement('li');
        const newQty = document.createElement('li');
        const newPrice = document.createElement('li');
        const newSubTotal = document.createElement('li');
        
        newCheckbox.setAttribute('id', 'checkbox-'+index);
        newCheckbox.setAttribute('type', 'checkbox');
        newCheckbox.addEventListener('change', () => sumAmountsAndShow(index));
        newCheckboxLi.setAttribute('class', 'table-cell');
        newName.setAttribute('class', 'table-cell');
        newQty.setAttribute('class', 'table-cell');
        newPrice.setAttribute('class', 'table-cell');
        newSubTotal.setAttribute('class', 'table-cell');
        newCheckboxLi.appendChild(newCheckbox);
        newName.innerText = item.type.toUpperCase() + ' - ' + item.name;
        item.type === 'vela' && (newName.innerText = newName.innerText.concat(' - ', item.size));
        newQty.innerText = item.quantity;
        newPrice.innerText = formatPesosArg.format(item.price);
        newSubTotal.innerText = formatPesosArg.format( Number(item.price) * Number(item.quantity) );
        item.amount = () => {
            return (Number(newCheckbox.checked) * item.quantity * item.price);
        };
        tableCtn.append(newCheckboxLi, newName, newQty, newPrice, newSubTotal);
    })
}

/* ******************* Show Results ******************* */

const totalResultEl = document.getElementById('total-result');
const purchaseVerifyForm = document.getElementById('purchase-verify-user-form');

function sumAmountsAndShow(index) {
    let sumAmount = 0;
    myProducts.forEach( item => {
        sumAmount += item.amount();
    });
    totalResultEl.innerText = formatPesosArg.format(sumAmount);
    myProducts[index].addToPay = document.getElementById('checkbox-'+ index).checked;
    purchaseVerifyForm.classList.replace('show-purchase-form', 'hidden');
}

/* ******************* Submit Purchase ****************** */

const myproductsForm = document.getElementById('myproducts-form');

myproductsForm.addEventListener('submit', (e) => submitPurchase(e));

function submitPurchase(e) {
    e.preventDefault();
    let purchasedItems = myProducts.filter( item => item.addToPay === true );
    
    purchaseVerifyForm.classList.replace('hidden', 'show-purchase-form');
    purchaseVerifyForm.addEventListener('submit', (e) => verifyPasswordToPay(e));

    function verifyPasswordToPay(e) {
        e.preventDefault();
        let password = purchaseVerifyForm.password.value;
        const errorSpan = document.getElementById('show-error');
        password === '' && showError('Completá el campo.');
        password !== '' && password !== user.password && showError('Dato incorrecto!');
        password === user.password && payCart();
        purchaseVerifyForm.password.addEventListener('input', ()=> cleanSpanError());
        
        function showError(string) {
            purchaseVerifyForm.password.style.outline = '2px red solid';
            errorSpan.innerText = string;
            errorSpan.style.visibility = 'visible';
        }
        function cleanSpanError() {
            errorSpan.removeAttribute('style');
            purchaseVerifyForm.password.removeAttribute('style');
        }
        function payCart() {
            productos.todoslosproductos.forEach( (item, index) => {
                if (item.type === 'vela') {
                    purchasedItems.forEach( (el) => {
                        if (el.name === item.name) {
                            console.log(typeof el.quantity, item);
                            el.size === 'medium' && (item.content.medium.stock -= el.quantity);
                            el.size === 'big' && (item.content.big.stock -= el.quantity);
                        } 
                    })
                } else {
                    purchasedItems.forEach( el => el.name === item.name && (productos.todoslosproductos[index].stock -= el.quantity ));
                }
            });
            myProducts.forEach( (item, index) => purchasedItems.forEach(el => el.name === item.name && myProducts.splice(index, 1)));
            user.myproducts = myProducts;
            users.forEach( (item, index) => item.email === user.email && (users.splice(index, 1, user)));
            console.log(users, user);
            localStorage.setItem('productos', JSON.stringify(productos));
            setUserAndUsers(users, user);
            //location.href = './mycart.html';
        }
    }
}