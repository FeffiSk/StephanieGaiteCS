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
            <span class="restar"> - </span>
            <p>Cantidad:${product.cantidad}</p>
            <span class="sumar"> + </span>
            <p>Total:${product.cantidad * product.precio}</p>
            <span class="delete-product"> ✘ </span>
        `;

        modeloConteiner.append(carritoContent);

        let restar = carritoContent.querySelector(".restar")

        restar.addEventListener("click", () => {
            if(product.cantidad !== 1) {
            product.cantidad--;
            }
            guardarCosas();
            tocarCarrito();
        });

        let sumar = carritoContent.querySelector(".sumar")

        sumar.addEventListener("click", () => {
            product.cantidad++;
            guardarCosas();
            tocarCarrito();
        });

        console.log(carrito.length);

        let eliminar = carritoContent.querySelector(".delete-product");

        eliminar.addEventListener("click", ()=> {
            eliminarProducto(product.id);
        });
    });

    const total = carrito.reduce((acc, el) => acc + el.precio * el.cantidad, 0);

    const totalBuying = document.createElement("div");
    totalBuying.className = "total-content";
    totalBuying.innerHTML = `total a pagar: ${total} $
     <button id="boton-comprar" class="boton-comprar">Finalizar compra</button>`;
    modeloConteiner.append(totalBuying);
};

verCarrito.addEventListener("click", tocarCarrito);

const eliminarProducto = (id) => {
    const foundId = carrito.find((element) => element.id === id);

    console.log(foundId);
    
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

carritoNumeros();

botonFinalizar.addEventListener("click", finalizarCompra());

function finalizarCompra() {

    carrito.length = 0;
    carritoNumeros();
    guardarCosas();
    tocarCarrito();
}