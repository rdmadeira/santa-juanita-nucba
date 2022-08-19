class Products {
    constructor (name, description, img, keywords, price) {
        this.name = name;
        this.description = description;
        this.img = img;
        this.keywords = keywords;
        this.price = price;
        this.stock = 0; 
        this.promo = false;
    }
    setPromo (boolean) {
        return this.promo = boolean;
    }
}
class Velas extends Products {
    constructor (name, description, img, keywords, price) {
        super(name, description, img, keywords, price);
    }
    get type () {
        return 'velas';
    }
}