let user = JSON.parse(localStorage.getItem('userJuanita'));
let users = JSON.parse(localStorage.getItem('usersJuanita'));

export function setUserAndUsers(users, user) {
    localStorage.setItem('usersJuanita', JSON.stringify(users));
    localStorage.setItem('userJuanita', JSON.stringify(user));
}
export function loadProducts(array) {
    const productsCtnEl =  document.getElementById('products-ctn');
    const loadCtn = document.getElementById('loading-ctn');
    loadCtn && (loadCtn.style.display = 'none');
    array.forEach((item, index) => {
        let newCtn = document.createElement('div');
        let newH3 = document.createElement('h3');
        let newP1 = document.createElement('p');
        let newP2 = document.createElement('p');
        let newImg = document.createElement('img');
        let newBtn = document.createElement('button');
        let price = Intl.NumberFormat('es-AR', {style: "currency", currency: "ARG"});
        newCtn.classList.add('product-ctn');
        newCtn.setAttribute('id', `product-ctn-${index}`);
        newH3.innerText = item.name;
        newP1.innerText = item.description;
        newImg.src = item.img;
        newBtn.innerHTML = 'Agregar al Carrito';
        newBtn.addEventListener('click', () => addToCart(item, index));
        newCtn.append(newImg, newH3, newP1);
        productsCtnEl.appendChild(newCtn);
        newP1.classList.add('products-text-p');
        newP2.classList.add('precio-p');
        
        if (item.type === 'vela') {
            let newSelect = document.createElement('select');
            let size;

            newSelect.innerHTML = '<option value="medium">Mediano</option><option value="big">Grande</option>';
            newCtn.insertAdjacentElement("beforeend", newSelect);
            newP2.innerText = price.format(item.content.medium.price);
            newSelect.addEventListener('change', () => {
                size = newSelect.value;
                size === 'medium' && (newP2.innerText = price.format(item.content.medium.price));
                size === 'big' && (newP2.innerText = price.format(item.content.big.price));
            });
            if (item.content.medium.stock <=0 && item.content.big.stock <= 0) {
                newCtn.style.opacity = '0.5';
                newBtn.disabled = true;
                newP2.innerText = 'No stock'
            }
            item.content.medium.stock === 0 && (newSelect.innerHTML = '<option value="big">Grande</option>');
            item.content.big.stock === 0 && (newSelect.innerHTML = '<option value="medium">Mediano</option>');
        } else {
            newP2.innerText = price.format(item.price);                
        }
        newCtn.insertAdjacentElement('beforeend', newBtn);
        newCtn.insertAdjacentElement('beforeend', newP2);
    });
}
export function addToCart(obj, index) {
    let newObj = Object.assign({}, obj);
    const cartNumber = document.querySelector('#shopcart-img-ctn > span');
    const cartEl = document.querySelector('#shopcart-img-ctn');    
    let productExists;
    if (newObj.type === 'vela') {
        let size = document.querySelector('#product-ctn-'+ index + ' select').value;
        console.log(size);
        if (size === 'medium') {
            newObj.price = obj.content.medium.price;
            newObj.stock = obj.content.medium.stock;
        } else if (size === 'big') {
            newObj.price = obj.content.big.price;
            newObj.stock = obj.content.big.stock;
        }        
        
        newObj.size = size;
        // size === 'medium' && (obj.price = obj.content.medium.price) && (obj.stock = obj.content.medium.stock);
        // size === 'big' && (obj.price = obj.content.big.price) && (obj.stock = obj.content.big.stock);
        productExists = user.myproducts.some( item => item.name === newObj.name && item.size === newObj.size);
        
    } else {
        productExists = user.myproducts.some( item => item.name === newObj.name );
    }
    !productExists ? (newObj.quantity = 1) && user.myproducts.push(newObj) : 
        user.myproducts.forEach( item => item.name === newObj.name && item.size === newObj.size && item.quantity++ );
    const productCtnEl = document.getElementById('product-ctn-'+index);
    cartNumber.innerText = user.myproducts.length;
    productCtnEl.style.transform = 'scale(1.05) ';
    setTimeout( ()=>productCtnEl.removeAttribute('style'), 400 );
    cartEl.style.transform = 'scale(1.3)';
    setTimeout( ()=>cartEl.removeAttribute('style'), 1000 );
    users.forEach( (item, index) => item.email === user.email && (users[index] = user) );
    users.splice( users.indexOf(user.email) , 1, user);
    setUserAndUsers(users, user);
}

const myPromise =  new Promise (( resolve, reject ) => {
    setTimeout( () => resolve( JSON.parse(localStorage.getItem('productos')) ), 2000);
});
export const getProductos = async () => {
    /* console.log(await myPromise); */
    return await myPromise;
}
