import { setUserAndUsers } from "./functions.mjs";

let user = JSON.parse(localStorage.getItem('userJuanita'));
let users = JSON.parse(localStorage.getItem('usersJuanita'));
let myProducts = user.myproducts;
const noItemsDiv = document.querySelector('.no-items');
const resetCartBtn = document.getElementById('reset-cart-btn');

resetCartBtn.addEventListener('click', () => resetCart());
myProducts.length === 0 && (noItemsDiv.style.display = 'block');
myProducts.length > 0 && createTable()

function resetCart() {
    user.myproducts.splice(0, user.myproducts.length);
    users.forEach( (item, index) => { item.email === user.email && (users[index] = user) });
    setUserAndUsers(users, user);
    location.href = './mycart.html';
}
function createTable() {
    console.log(myProducts);
    const formatPesosArg = Intl.NumberFormat('es-AR', {
        style: "currency",
        currency: "ARS",
    })
    const tableCtn = document.querySelector('.table-ctn');
    myProducts.forEach( item => {
        const newCheckboxLi = document.createElement('li');
        const newCheckbox = document.createElement('input');

        const newName =  document.createElement('li');
        const newQty = document.createElement('li');
        const newPrice = document.createElement('li');
        const newSubTotal = document.createElement('li');

        newCheckbox.setAttribute('type', 'checkbox');
        newCheckbox.setAttribute('value', item.price);
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
        tableCtn.append(newCheckboxLi, newName, newQty, newPrice, newSubTotal);
    })
}