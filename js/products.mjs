import { Velas, SalesdeBano, DifusoresDeVarilla, Bombasefervecentes } from "./productclases.mjs";

const frutosDelBosque = new Velas ('Frutos del Bosque', 'Vela de soja natural. Color blanco. Esencia de frutos rojos y del bosque. Recipiente en cuenco de madera de guayubira. Encender por primera vez por un periodo de al menos 1hora. Recortar periódicamente la mecha. No usar mas de 5-6 horas seguidas. Duración 45-55 Hs', '../../assets/products/frutos-del-bosque.png', 'vela soja aromatica frutos del bosque color rosa', 'rosa', 850);

const vainillaPrimavera = new Velas ('Vainilla Primavera', 'Vela de soja natural. Color blanco. Esencia de vainilla. Recipiente en cuenco de madera de guayubira. Encender por primera vez por un periodo de al menos 1hora. Recortar periódicamente la mecha. No usar mas de 5-6 horas seguidas. Duración 55-60 Hs', '../../assets/products/vainilla.png', 'vela soja aromatica frutos del bosque color blanco', 'blanco', 800);

const lavanda =  new Velas ('Lavanda', 'Vela de soja natural. Color verde oliva. Esencia de lavanda. Recipiente en vidrio. Encender por primera vez por un periodo de al menos 1hora. Recortar periódicamente la mecha. No usar mas de 5-6 horas seguidas. Duración 40-45 Hs', '../../assets/products/lavanda.png', 'vela soja aromatica frutos del bosque color verde oliva', 'verde oliva', 700);

const maracuya =  new Velas ('Maracuya', 'Vela de soja natural. Color amarillo. Esencia de lavanda. Recipiente en vidrio. Encender por primera vez por un periodo de al menos 1hora. Recortar periódicamente la mecha. No usar mas de 5-6 horas seguidas. Duración 40-45 Hs', '../../assets/products/maracuya.png', 'vela soja aromatica maracuya color amarillo', 'amarillo', 700);

/* ************************************************** */
const jasmin = new SalesdeBano ('Jasmin', 'Sal de Baño composto por sal marina y sal Epsom. Agrega las sales de baño mientras llenas la bañera para asegurar que se derriten completamente y aportan el máximo de sus cualidades. Rejalante y controla la ansiedad. Desintoxica la piel', '../../assets/sales/jasmin.png', 'sal sales baño jasmin aroma marino color blanco', 'blanco', 480);

const petalasDeRosas = new SalesdeBano ('Petalas de Rosas', 'Sal de Baño composto por sal marina y sal Epsom. Agrega las sales de baño mientras llenas la bañera para asegurar que se derriten completamente y aportan el máximo de sus cualidades. Rejalante y  neutralizante. Desintoxica la piel', '../../assets/sales/rosas.png', 'sal sales baño petalas rosas aroma marino color rojo', 'rojo', 480);

const naranja = new SalesdeBano ('Naranja', 'Sal de Baño composto por sal marina y sal Epsom. Envasado en bolsa transparente. Agrega las sales de baño mientras llenas la bañera para asegurar que se derriten completamente y aportan el máximo de sus cualidades. Energizante. Desintoxica la piel', '../../assets/sales/naranja.png', 'sal sales baño jasmin aroma marino color amarillo', 'amarillo', 480);


/* *************************************************** */

const floresBlancas = new DifusoresDeVarilla ('Flores Blancas', ' Difusor de varillas aroma flores blancas en recipiente de vidrio. Fragancia que acalma y ilumina. Las varillas pueden ser re-utilizadas  siempre y solo si se usa con la misma fragancia original del envase', '../../assets/difusores/flores-blancas.png', 'disufor varillas vidrio flores blancas color transparente', 'transparente', 680);

const vainilla = new DifusoresDeVarilla ('Vainilla', ' Difusor de varillas aroma vainilla en recipiente de vidrio. Fragancia que relaja. Las varillas pueden ser re-utilizadas  siempre y solo si se usa con la misma fragancia original del envase', '../../assets/difusores/vainilla.png', 'disufor varillas vidrio vainilla color transparente', 'transparente', 680);

const bambooYSandalo = new DifusoresDeVarilla ('Bamboo y Sandalo', ' Difusor de varillas aroma bamboo con notas de sandalo, en recipiente de vidrio. Fragancia que energiza el ambiente. Las varillas pueden ser re-utilizadas  siempre y solo si se usa con la misma fragancia original del envase', '../../assets/difusores/bamboo.png', 'disufor bamboo sandalo vidrio color transparente', 'transparente', 680);


/* ******************************************************* */

const teVerde =  new Bombasefervecentes ('Té Verde', 'Bombas de baño son excelentes para un baño de inmersión, además de relajar, hidratan la piel por sus aceites esenciales. Fragancia floral que combina acordes verdes con sándalo y patchouli.No recomendados para menores de 8 años.', '../../assets/ bombas/te-verde.png', 'bomba efervecente baño floral flor sandalo color verde', 'verde', 920);

const petalasDeRosasBomba = new Bombasefervecentes ('Pétalas de Rosas', 'Bombas de baño son excelentes para un baño de inmersión, además de relajar, hidratan la piel por sus aceites esenciales. Fragancia floral que combina acordes verdes con sándalo y patchouli.No recomendados para menores de 8 años.', '../../assets/bombas/petalas-de-rosas.png', 'bomba efervecente baño petalas rosas color rosa', 'rosa', 920);

class ListaDeProductos {
    constructor ( velas, sales, difusores, bombas ) {
        this.velas = velas;
        this.sales = sales;
        this.bombas = bombas;
        this.difusores = difusores;
        this.todoslosproductos = [].concat(velas, sales, difusores, bombas);
    }
}

const velas = [frutosDelBosque, vainillaPrimavera, lavanda, maracuya];
let actualStockVelas = [[10, 8], [10, 8], [10, 8], [4, 2]]
velas.forEach ( (item, index) => item.setStock = actualStockVelas[index]);

const sales = [jasmin, petalasDeRosas, naranja];
let actualStockSales = [15, 15, 15]
sales.forEach( (item, index) => item.setStock = actualStockSales[index] );

const difusores = [floresBlancas, vainilla, bambooYSandalo];
let actualStockDif = [10, 12, 10];
difusores.forEach ( (item, index) => item.setStock = actualStockDif[index]);

const bombas = [teVerde, petalasDeRosasBomba];
let actualStockBombas = [8, 8];
bombas.forEach( (item, index) => item.setStock = actualStockBombas[index] );

export const productos = new ListaDeProductos ( velas, sales, difusores, bombas );
