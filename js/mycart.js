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
        item.addToPay = false;

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
const checkboxes = document.querySelectorAll('.table-ctn input[type="checkbox"]');
let purchasedItems = [];
const errorSpan = document.getElementById('show-error');

checkboxes.forEach( item => 
    item.addEventListener('change', () => { 
        purchasedItems = myProducts.filter( item => item.addToPay === true ); 
        console.log(purchasedItems);
        cleanSpanError();
    } ) 
);
myproductsForm.addEventListener('submit', (e) => submitPurchase(e));

function cleanSpanError() {
    errorSpan.removeAttribute('style');
    errorSpan.innerText = 'Processing...';
    purchaseVerifyForm.password.removeAttribute('style');
}
function submitPurchase(e) {
    e.preventDefault();
    purchaseVerifyForm.style.display = 'flex';
    setTimeout( () => purchaseVerifyForm.classList.replace('hidden', 'show-purchase-form') , 500);
    purchaseVerifyForm.addEventListener('submit', (e) => verifyPasswordToPay(e));

    function verifyPasswordToPay(e) {
        e.preventDefault();
        let password = purchaseVerifyForm.password.value;
        password === '' && showError('Completá el campo.');
        password !== '' && password !== user.password && showError('Dato incorrecto!');
        password === user.password && payCart() && cleanSpanError();
        purchaseVerifyForm.password.addEventListener('input', () => cleanSpanError());
    }
    function showError(string) {
        purchaseVerifyForm.password.style.outline = '2px red solid';
        errorSpan.innerText = string;
        errorSpan.style.visibility = 'visible';
    }
    
    /* Mejorar el aviso y el comportamiento si algo no tiene stock en la cantidad pedida */
    function payCart() {
        let verifyStockArray = [];
        console.log(purchasedItems);
        verifyStockArray = purchasedItems.map( item => {
            return productos.todoslosproductos.map( (el, i) => {
                return (item.name === el.name && item.type === 'vela' && item.size === 'medium' && item.quantity > el.content.medium.stock) || 
                (item.name === el.name && item.type === 'vela' && item.size === 'big' && item.quantity > el.content.big.stock) ||
                (item.name === el.name && item.type !== 'vela' && item.quantity > el.stock);
            });
        });
        console.log(verifyStockArray);
     
        let indexOfNoStock = verifyStockArray.findIndex((item ) => item.some( item => item === true ) === true);
        console.log(indexOfNoStock);

        /* if (indexOfNoStock >= 0 && showError) {
            return showError(`El item ${purchasedItems[indexOfNoStock].name} ${purchasedItems[indexOfNoStock].size} no tiene stock suficiente`);
        }
        if (indexOfNoStock === -1) {
            return changeStockAndPurchase();
        } */
        indexOfNoStock >= 0 && showError(`El item ${purchasedItems[indexOfNoStock].name} ${purchasedItems[indexOfNoStock].size} no tiene stock suficiente`);
        indexOfNoStock === -1 && changeStockAndPurchase();
        

        function changeStockAndPurchase() {
            productos.todoslosproductos.forEach( item => {
                purchasedItems.forEach( el => {
                    if (el.name === item.name) {
                        if (el.type === 'vela') {
                            el.size === 'medium' && (item.content.medium.stock -= el.quantity);
                            el.size === 'big' && (item.content.big.stock -= el.quantity);
                        } else {
                            item.stock -= el.quantity;
                        }
                    }
                })
            });
            finishPurchaseAndSetLocalstorage();
        }
        
        function showError(string) {
            
            errorSpan.innerText = string;
            errorSpan.style.visibility = 'visible';
        }
        
        function finishPurchaseAndSetLocalstorage() {
            purchasedItems.forEach((item) => {
                myProducts.forEach( (el, i) => item.name === el.name && myProducts.splice(i, 1)) && (i--) ;
            });
            user.myproducts = myProducts;
            users.forEach( (item, index) => item.email === user.email && (users.splice(index, 1, user)));
            localStorage.setItem('productos', JSON.stringify(productos));
            setUserAndUsers(users, user);
            alert(`${user.name}, gracias por su compra!`);
            //location.href = './mycart.html';
        }
    }
}