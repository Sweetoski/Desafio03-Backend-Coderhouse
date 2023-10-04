import {promises as fs} from "fs"
import { get } from "http";

class ProductManager {
    constructor() {
        this.path = "./productos.txt";
        this.products = [];
    }

    static id = 0;

    addProduct = async (title, description, price, thumbnail, code, stock) => {
        ProductManager.id++;

        let newProduct = {
            id: ProductManager.id,
            title,
            description, 
            price, 
            thumbnail,
            code, 
            stock
        };

        this.products.push(newProduct);

        await fs.writeFile(this.path, JSON.stringify(this.products));
    }

    readProducts = async () => {
        let respuesta = await fs.readFile(this.path, "utf-8");
        return JSON.parse(respuesta)
    }

    getProducts = async() => {
        let respuesta2 = await this.readProducts();
        return console.log(respuesta2);
    }

    getProductById = async (id) => {
        let respuesta3 = await this.readProducts();
        if(!respuesta3.find(product => product.id === id)){
            console.log("Producto no Encontrado")
        } else {
            console.log(respuesta3.find(product => product.id === id))
        }
    }
    deleteProductById = async (id) => {
        let respuesta3 = await this.readProducts();
        let productFilter = respuesta3.filter(products => products.id != id);
        await fs.writeFile(this.path, JSON.stringify(productFilter));
        console.log("Producto Eliminado")
    }

    updateProduct = async ({id, ...product}) => {
        await this.deleteProductById(id);
        let productOld = await this.readProducts();
        let productModify = [{ ...product, id}, ...productOld];
        await fs.writeFile(this.path, JSON.stringify(productModify));
    }
}

/* const products = new ProductManager; */

/* products.addProduct("producto prueba1", "Este es un producto prueba1", 200, "sin imagen1", "abc123", 25);
products.addProduct("producto prueba2", "Este es un producto prueba2", 300, "sin imagen2", "abc124", 26);
products.addProduct("producto prueba3", "Este es un producto prueba3", 400, "sin imagen3", "abc125", 27);
products.addProduct("producto prueba4", "Este es un producto prueba4", 250, "sin imagen1", "abc128", 28);
products.addProduct("producto prueba5", "Este es un producto prueba5", 350, "sin imagen2", "abc154", 32);
products.addProduct("producto prueba6", "Este es un producto prueba6", 450, "sin imagen3", "abc105", 40);
products.addProduct("producto prueba7", "Este es un producto prueba7", 2505, "sin imagen1", "abc128", 18);
products.addProduct("producto prueba8", "Este es un producto prueba8", 3502, "sin imagen2", "abc154", 22);
products.addProduct("producto prueba9", "Este es un producto prueba9", 4508, "sin imagen3", "abc105", 30); */

/* products.getProducts(); */

/* products.getProductById(4) */

/* products.deleteProductById(2) */

/* products.updateProducts({
    id:3,
    title: "producto prueba3",
    description: "Este es un producto prueba3",
    price: 450,
    thumbnail: "sin imagen3",
    code: "abc125",
    stock: 27
}) */

export default ProductManager