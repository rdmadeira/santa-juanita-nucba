class Products {
    constructor (name, description, img, keywords, color) {
        this.name = name;
        this.description = description;
        this.img = img;
        this.keywords = keywords;
        this.color = color;
        
        this.promo = false;
    }
    set setPromo (boolean) {
        this.promo = boolean;
        if (boolean === true) {
            this.price *= 0.75;
        }
        return this;
    }
}
export class Velas extends Products {
    constructor (name, description, img, keywords, color, price) {
        super(name, description, img, keywords, color);
        this.content = {
            'medium': {
                'price': price, 
                'stock': 0, 
                'sub-description': 'Recipiente circular de 5cm de alto y 7cm de diametro'
            },
            'big': {
                'price': 1.2 * price, 
                'stock': 0, 
                'sub-description': 'Recipiente circular de 8cm de alto y 10cm de diametro'
            }
        }
        this.type = 'vela'
        
    }
    set setStock (arr) {
        this.content.medium.stock = arr[0];
        if(arr.length >1) {
            this.content.big.stock = arr[1];
        }
        return this;
    }
}
export class Bombasefervecentes extends Products {
    constructor (name, description, img, keywords, color, price) {
        super(name, description, img, keywords, color);
        this.price = price;
        this.content = '10 unidades de 20g cada';
        this.type = 'bomba';
    }
    /* getType () {
        return 'bomba efervecente';
    } */
    set setStock (num) {
        this.stock = num;
    }
}
export class SalesdeBano extends Products {
    constructor (name, description, img, keywords, color, price) {
        super(name, description, img, keywords, color);
        this.price = price;
        this.content = '250g';
        this.type = 'sal';
    }
    /* getType () {
        return 'sal de baño';
    } */
    set setStock (num) {
        this.stock = num;
    }
}
export class DifusoresDeVarilla extends Products {
    constructor (name, description, img, keywords, color, price) {
        super(name, description, img, keywords, color);
        this.price = price;
        this.content = '300ml';
        this.type = 'difusor';
    }
    /* getType () {
        return 'difusor de varilla';
    } */
    set setStock (num) {
        this.stock = num;
    }
}
export class Kits extends Products {
    constructor (name, description, img, keywords, color, price) {
        super(name, description, img, keywords, color);
        this.price = price;
        this.content = '0.8kg - 1.5kg';
        this.type = 'kit';
    }
    /* getType () {
        return 'kit';
    } */
    set setStock (num) {
        this.stock = num;
    }
}