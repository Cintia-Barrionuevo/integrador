/*
En el archivo tarea2.js podemos encontrar un código de un supermercado que vende productos.
El código contiene 
    - una clase Producto que representa un producto que vende el super
    - una clase Carrito que representa el carrito de compras de un cliente
    - una clase ProductoEnCarrito que representa un producto que se agrego al carrito
    - una función findProductBySku que simula una base de datos y busca un producto por su sku
El código tiene errores y varias cosas para mejorar / agregar

Ejercicios
1) Arreglar errores existentes en el código
    a) Al ejecutar agregarProducto 2 veces con los mismos valores debería agregar 1 solo producto con la suma de las cantidades.    
    b) Al ejecutar agregarProducto debería actualizar la lista de categorías solamente si la categoría no estaba en la lista.
    c) Si intento agregar un producto que no existe debería mostrar un mensaje de error.

2) Agregar la función eliminarProducto a la clase Carrito
    a) La función eliminarProducto recibe un sku y una cantidad (debe devolver una promesa)
    b) Si la cantidad es menor a la cantidad de ese producto en el carrito, se debe restar esa cantidad al producto
    c) Si la cantidad es mayor o igual a la cantidad de ese producto en el carrito, se debe eliminar el producto del carrito
    d) Si el producto no existe en el carrito, se debe mostrar un mensaje de error
    e) La función debe retornar una promesa

3) Utilizar la función eliminarProducto utilizando .then() y .catch()

*/
// Cada producto que vende el super es creado con esta clase
class Producto {
    sku;            // Identificador único del producto
    nombre;         // Su nombre
    categoria;      // Categoría a la que pertenece este producto
    precio;         // Su precio
    stock;          // Cantidad disponible en stock

    constructor(sku, nombre, precio, categoria, stock) {
        this.sku = sku;
        this.nombre = nombre;
        this.categoria = categoria;
        this.precio = precio;

        // Si no me definen stock, pongo 10 por default
        if (stock) {
            this.stock = stock;
        } else {
            this.stock = 10;
        }

         
       
    }

}


// Creo todos los productos que vende mi super
const queso = new Producto('KS944RUR', 'Queso', 10, 'lacteos', 4);
const gaseosa = new Producto('FN312PPE', 'Gaseosa', 5, 'bebidas');
const cerveza = new Producto('PV332MJ', 'Cerveza', 20, 'bebidas');
const arroz = new Producto('XX92LKI', 'Arroz', 7, 'alimentos', 20);
const fideos = new Producto('UI999TY', 'Fideos', 5, 'alimentos');
const lavandina = new Producto('RT324GD', 'Lavandina', 9, 'limpieza');
const shampoo = new Producto('OL883YE', 'Shampoo', 3, 'higiene', 50);
const jabon = new Producto('WE328NJ', 'Jabon', 4, 'higiene', 3);

// Genero un listado de productos. Simulando base de datos
const productosDelSuper = [queso, gaseosa, cerveza, arroz, fideos, lavandina, shampoo, jabon];


// Cada cliente que venga a mi super va a crear un carrito
class Carrito {
    productos;      // Lista de productos agregados
    categorias;     // Lista de las diferentes categorías de los productos en el carrito
    precioTotal;    // Lo que voy a pagar al finalizar mi compra

    // Al crear un carrito, empieza vació
    constructor() {
        this.precioTotal = 0;
        this.productos = [];
        this.categorias = [];
    }
     

        
    

   

    /**
     * función que agrega @{cantidad} de productos con @{sku} al carrito
     */
    async agregarProducto(sku, cantidad) {
        //console.log(`Agregando ${cantidad} ${sku}`);
        

        // Busco el producto en la "base de datos"
     try { 
        const producto = await findProductBySku(sku);
        
        

       console.log("Producto encontrado para agregar al carrito", producto);
       
            
           
           const existeSku = this.productos.find(producto => producto.sku === sku)
            if (existeSku) {
              //  this.precioTotal += (existeSku.precio * cantidad);
                producto.cantidad += cantidad;
               console.log("SOLO SE ACTUALIZA LA CANTIDAD, PORQUE YA ESTA CARGADO ESTE SKU");
               //console.log(`MOSTRANDO  ${producto.cantidad} ${sku} ${cantidad} `);
            }else {           
                           
         
       
        // Creo un producto nuevo
        const nuevoProducto = new ProductoEnCarrito(sku, producto.nombre, cantidad);
       // console.log(nuevoProducto);
        this.productos.push(nuevoProducto);
        //console.log("Producto agregado al carrito", producto);
        //console.log(this.productos);
        this.precioTotal = this.precioTotal + (producto.precio * cantidad);
        if (this.categorias.includes(producto.categoria)){
            console.log("LA CATEGORIA YA EXISTE NO SE VUELVE A CARGAR");
        } else {
             this.categorias.push(producto.categoria);
             console.log("SE AGREGO LA CATEGORIA CON EXITO");
             //console.log(this.categorias);
             //console.log(this.productos);
        }
        //console.log(`MOSTRANDO despues del push ${producto.nombre} ${sku} ${cantidad} `);
            }
        } catch (error){
               console.log("OCURRIO UN ERROR - NO SE ENCONTRO EL PRODUCTO INGRESADO");
        }
       
        

       // this.categorias.push(producto.categoria);
        
        
            
        
    }

    eliminarProducto(sku,cantidad) {
        
        return new Promise((resolve, reject) => {

            //console.log(sku);   
            //console.log(cantidad);  
            //console.log(this.productos); 
            setTimeout(() => {
            const encontrado = this.productos.find (producto => producto.sku === sku);
           
            console.log(encontrado);           

            if (encontrado) {
               // console.log("ENTRO al if -1");   
               // console.log(`index ${encontrado}`);
               // console.log(`cantidad ${cantidad}`);

             if (encontrado.cantidad > cantidad){
                encontrado.cantidad -= cantidad;
               // console.log("SE RESTO LA CANTIDAD");
                
            } else{ 
                const indice = this.productos.findIndex(producto => producto.sku === sku)

                // Si se encuentra el producto, eliminarlo de la lista
                      if (indice !== -1) {
                        this.productos.splice(indice, 1);
                        console.log("SE ELIMINO EL PRODUCTO");
                           }

            }
            //resolve(encontrado);
            resolve("SE RESTO LA CANTIDAD o ELIMINO EL PRODUCTO CON EXITO");
            
        
    } else {
        reject("NO SE ENCONTRO EL PRODUCTO PARA ELIMINAR");
    }
    }, 2500);
});
      
}
}
   
     



// Cada producto que se agrega al carrito es creado con esta clase
class ProductoEnCarrito {
    sku;       // Identificador único del producto
    nombre;    // Su nombre
    cantidad;  // Cantidad de este producto en el carrito

    constructor(sku, nombre, cantidad) {
        this.sku = sku;
        this.nombre = nombre;
        this.cantidad = cantidad;
    }

}

// Función que busca un producto por su sku en "la base de datos"
function findProductBySku(sku) {
    
    return new Promise((resolve, reject) => {
        
        setTimeout(() => {
            const foundProduct = productosDelSuper.find(product => product.sku === sku);
            
           
            if (foundProduct) {
                resolve(foundProduct);
            } else {
               
               // reject(`Product ${sku} not found`);
                reject("PRODUCTO NO ENCONTRADO");
                 
            }
       
        }, 1500);

    });
}


    function probarEliminarProducto(){
        const carrito = new Carrito();
        carrito.agregarProducto('WE328NJ', 2);
        //carrito.eliminarProducto('KWND92', 1);

        const promesaeliminar = carrito.eliminarProducto('WE328Nj', 5);
        promesaeliminar.then( (mensaje) => {
            console.log(mensaje);
        }        )
        .catch(error => {
            console.log(error);
        })
                
         console.log(carrito);
      };
      


    
       
      /*
        const promesaDevuelta = findProductBySku(sku);
        promesaDevuelta
        .then((mensaje) =>{
           // console.log(mensaje);
            console.log("EXISTE  SKU ");
        })
        .catch(error => {
            console.log(error);
            console.log(" NO EXISTE  SKU ");
        })
       */
    










const carrito = new Carrito();
carrito.agregarProducto('WE328NJ', 2);
carrito.agregarProducto('WE328NJ', 3);
carrito.agregarProducto('KS944RUR', 2);
carrito.agregarProducto('XX92LKI', 4);
carrito.agregarProducto('UI999TY', 5);
carrito.agregarProducto('OL883Ye', 9);

//probarEliminarProducto();

