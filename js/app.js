const shopCounter = document.getElementById("shopCounter");
const verCarrito = document.getElementById("verCarrito");
const modeloConteiner = document.getElementById("modelo-conteiner");
const cantidadesCarrito = document.getElementById("cantidadesCarrito");
const botonFinalizar = document.querySelector("botonFinalizar");

let carrito = JSON.parse(localStorage.getItem("cositas")) || [];

productos.forEach((product)=> {
    let content = document.createElement("div");
    content.className = "card";
    content.innerHTML = `
    <img src="${product.img}">
    <h3>${product.nombre}</h3>
    <p class="price">${product.precio} $</p>
    `;

    shopCounter.append(content);

    let comprar = document.createElement("button")
    comprar.innerText = "comprar";
    comprar.className = "comprar";

    content.append(comprar);

    comprar.addEventListener("click", () => {
        const repeat = carrito.some((repeatProduct) => repeatProduct.id === product.id);
        
        if(repeat){
            carrito.map((prod) => {
                if(prod.id === product.id){
                    prod.cantidad++;
                }
            })
        } else {
        carrito.push({
            id : product.id,
            nombre : product.nombre,
            precio : product.precio,
            img : product.img,
            cantidad : product.cantidad,
        });
        }
        console.log(carrito);
        carritoNumeros();
        guardarCosas();
    });
});

const guardarCosas = () => {
    localStorage.setItem("cositas", JSON.stringify(carrito));
};
