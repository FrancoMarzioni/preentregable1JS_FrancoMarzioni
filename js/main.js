//Array de objetos con los productos
const productos = [
    {
        id: 1,
        nombre: "PURINA PRO PLAN Cachorros, todas las razas.",
        precio: 74999,
        img: "https://petshopmardelplata.com.ar/wp-content/uploads/2024/04/PROPLAN-PUPPY-MEDIUM-BONUS-300x300.png",
        cantidad: 1
    },
    {
        id: 2,
        nombre: "SIEGER Criador, de cachorro a adulto.",
        precio: 64821,
        img: "https://nutrican.com.ar/wp-content/uploads/2022/09/SIEGER-CRIADORES.png",
        cantidad: 1
    },
    {
        id: 3,
        nombre: "OPTIMUM Adultos Raza media-grande.",
        precio: 41990,
        img: "https://optimumpet.com.ar/wp-content/uploads/2019/06/Optimum-Bolsa-Perro-Adulto_.png",
        cantidad: 1
    },
    {
        id: 4,
        nombre: "DOG PLUS Balanceado Adultos, todas las razas.",
        precio: 82550,
        img: "https://dogplus.cl/wp-content/uploads/2023/11/SACO-ADULTO-18K-2023.png",
        cantidad: 1
    }
  ];

const shopContent = document.getElementById("shopContent")
const verCarrito = document.getElementById("verCarrito")
const modalContainer = document.getElementById("modal-container")

//Si hay productos en el localstorage, el carrito mantendrá los productos aunque se refresque la página. En caso contrario, el carrito se visualizará vacío.
let carrito =  JSON.parse(localStorage.getItem("carrito")) || []

//Se crea las cards de los productos.
productos.forEach((product)=> {
  let content = document.createElement("div");
  content.className = "card"
  content.innerHTML = `
  <img src="${product.img}">
  <h3>${product.nombre}</h3>
  <p class= "price">${product.precio}$</p>
  `;
  shopContent.append(content)

//Botón de comprar.
  let comprar = document.createElement("button")
  comprar.innerText = "Comprar"
  comprar.className = "comprar"

  content.append(comprar)

//La cantidad del producto dentro del modal aumenta y no se multiplica el producto nuevamente. La cantidad aumenta una vez que uno ya se haya agregado.
  comprar.addEventListener("click", () => {
    const repeat = carrito.some((repeatProduct) => repeatProduct.id === product.id)

    if (repeat) {
        carrito.map((prod) => {
            if (prod.id === product.id) {
                prod.cantidad++
            }
        })
    } else {
    carrito.push ({
        id: product.id,
        nombre: product.nombre,
        img: product.img,
        precio: product.precio,
        cantidad: product.cantidad,
    })
    }   
    saveLocal()
  }) 
});

//LOCAL STORAGE:  
//set item.
const saveLocal = () => {
    localStorage.setItem("carrito", JSON.stringify (carrito))
}

//Header carrito.
const pintarCarrito = () => {
    modalContainer.innerHTML = ""
    modalContainer.style.display = "flex"
    const modalHeader = document.createElement("div")
    modalHeader.className = "modal-header" 
    modalHeader.innerHTML = `
    <h1 class= "modal-header-title">Carrito</h1>
    `
    modalContainer.append(modalHeader)

    //"X" para cerrar el modal.
    const modalbutton = document.createElement("h1");
    modalbutton.innerText = "x";
    modalbutton.className = "modal-header-button";

    //Evento de click al botón.
    modalbutton.addEventListener("click", () => {
    modalContainer.style.display = "none";
    });

    modalHeader.append(modalbutton);

    //Agregar producto.
    carrito.forEach((product) => {
    let carritoContent = document.createElement("div")
    carritoContent.className = "modal-content"
    carritoContent.innerHTML = `
    <img src="${product.img}">
    <h3> ${product.nombre}</h3>
    <p> ${product.precio}$</p>
    <p> Cantidad: ${product.cantidad}</p>
    <p> Total: ${product.cantidad*product.precio}</p>
    `
    modalContainer.append(carritoContent)
    
    //Eliminar producto.
    let eliminar = document.createElement("span")
    
    eliminar.innerText = "❌"
    eliminar.className = "delete-product"
    carritoContent.append(eliminar)

    //Evento al botón "eliminar".
    eliminar.addEventListener("click", eliminarProducto)
    })
    //Total a pagar.
    const total = carrito.reduce((acc, el) => acc + el.precio * el.cantidad, 0)
    
    const totalBuying = document.createElement("div")
    totalBuying.className = "total-content"
    totalBuying.innerHTML = `Total a pagar: ${total} $`
    modalContainer.append(totalBuying)
    
}  

verCarrito.addEventListener("click", pintarCarrito )

//Función para eliminar el producto.
const eliminarProducto = () => {
    const foundId = carrito.find((element) => element.id)

    carrito = carrito.filter((carritoId) => {
        return carritoId !== foundId
    })
    saveLocal()
    pintarCarrito()
}