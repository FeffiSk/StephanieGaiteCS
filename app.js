const shopCounter = document.getElementById("shopCounter");
const verCarrito = document.getElementById("verCarrito");
const modeloConteiner = document.getElementById("modelo-conteiner");
const cantidadesCarrito = document.getElementById("cantidadesCarrito");

const productos = [
    {
        id: 1,
        nombre: "Ak-47",
        precio: 50,
        img: "https://i.pinimg.com/originals/23/03/1b/23031bbed24c231ba9ce48891edb2f62.jpg",
        cantidad: 1,
    },
    {
        id: 2,
        nombre: "Karambit",
        precio: 100,
        img: "https://i.pinimg.com/originals/cd/9d/5b/cd9d5b3121951d059f8e12930b2fd446.jpg",
        cantidad: 1,
    },
    {
        id: 3,
        nombre: "Glock",
        precio: 30,
        img: "https://i.pinimg.com/originals/88/c1/c8/88c1c87b612e29519b61b08a645418af.jpg",
        cantidad: 1,
    },
    {
        id: 4,
        nombre: "m4a4",
        precio: 200,
        img: "https://i.pinimg.com/originals/8a/81/c8/8a81c8338ac66c3c4c912d3c2a9639fa.jpg",
        cantidad: 1,
    },
];

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

const tocarCarrito = () => {
    modeloConteiner.innerHTML = "";
    modeloConteiner.style.display = "flex";
    const modeloHeader = document.createElement("div");
    modeloHeader.className = "modelo-header"
    modeloHeader.innerHTML = `
    <h1 class="modelo-header-titulo">Carrito.</h1>
    `;
    modeloConteiner.append(modeloHeader);

    const modelobutton = document.createElement("h1");
    modelobutton.innerText = "x";
    modelobutton.className = "modelo-header-button";

    modelobutton.addEventListener("click", () => {
        modeloConteiner.style.display = "none";
    });

    modeloHeader.append(modelobutton);


    carrito.forEach((product) => {
        let carritoContent = document.createElement("div");
        carritoContent.className = "modelo-content";
        carritoContent.innerHTML = `
            <img src="${product.img}">
            <h3>${product.nombre}</h3>
            <p>${product.precio} $</p>
            <p>Cantidad:${product.cantidad}</p>
            <p>Total:${product.cantidad * product.precio}</p>
        `;

        modeloConteiner.append(carritoContent);

        console.log(carrito.length);

        let eliminar = document.createElement("span");
        eliminar.innerText = "✘";
        eliminar.className = "delete-product";
        carritoContent.append(eliminar);

        eliminar.addEventListener("click", eliminarProducto);
    });

    const total = carrito.reduce((acc, el) => acc + el.precio * el.cantidad, 0);

    const totalBuying = document.createElement("div");
    totalBuying.className = "total-content";
    totalBuying.innerHTML = `total a pagar: ${total} $`;
    modeloConteiner.append(totalBuying);
};

verCarrito.addEventListener("click", tocarCarrito);

const eliminarProducto = () => {
    const foundId = carrito.find((element) => element.id);

    carrito = carrito.filter((carritoId) => {
        return carritoId !== foundId;
    });
    carritoNumeros();
    guardarCosas();
    tocarCarrito();
};

const carritoNumeros = () => {
    cantidadesCarrito.style.display = "block";

    const carritoLength = carrito.length;

    localStorage.setItem("carritoLength", JSON.stringify(carritoLength));

    cantidadesCarrito.innerText = JSON.parse(localStorage.getItem("carritoLength"));
}

const guardarCosas = () => {
    localStorage.setItem("cositas", JSON.stringify(carrito));
};

carritoNumeros();


