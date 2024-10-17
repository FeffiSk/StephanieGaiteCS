const tocarCarrito = () => {

    modeloConteiner.innerHTML = "";
    modeloConteiner.style.display = "flex";
    const modeloHeader = document.createElement("div");
    modeloHeader.className = "modelo-header"
    modeloHeader.innerHTML = `
    <h1 class="modelo-header-titulo">Carrito</h1>
    `;
    modeloConteiner.append(modeloHeader);

    const modelobutton = document.createElement("h1");
    modelobutton.innerHTML = '<i class="bi bi-x-circle"></i>';
    modelobutton.className = "modelo-header-button";

    modelobutton.addEventListener("click", () => {
        modeloConteiner.style.display = "none";
    });
    modeloHeader.append(modelobutton);

    if (carrito.length === 0) {
        let carritoVacio = document.createElement("p");
        carritoVacio.className = "carrito-vacio";
        carritoVacio.innerText = "Tu carrito está vacío.";
        modeloConteiner.append(carritoVacio);
    } else {
    carrito.forEach((product) => {
        let carritoContent = document.createElement("div");
        carritoContent.className = "modelo-content";
        carritoContent.innerHTML = `
            <img src="${product.img}">
            <h3>${product.nombre}</h3>
            <p>${product.precio} $</p>
            <span class="restar"><i class="bi bi-dash"></i></span>
            <p>Cantidad:${product.cantidad}</p>
            <span class="sumar"><i class="bi bi-plus"></i> </span>
            <p>Total:${product.cantidad * product.precio}</p>
            <span class="delete-product"><i class="bi bi-trash"></i></span>
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

        let eliminar = carritoContent.querySelector(".delete-product");
        eliminar.addEventListener("click", ()=> {
            eliminarProducto(product.id);
        });
    });

    const total = carrito.reduce((acc, el) => acc + el.precio * el.cantidad, 0);
    const totalBuying = document.createElement("div");
    totalBuying.className = "total-content";
    totalBuying.innerHTML = `total a pagar: $ ${total}     
    <button id="boton-comprar" class="boton-comprar">Finalizar compra</button>
    <button id="boton-vaciar" class="boton-vaciar">Vaciar carrito</button>`;
    modeloConteiner.append(totalBuying);
   
    document.getElementById("boton-comprar").addEventListener("click", () => {
        mostrarFormularioCompra();
    });
    };

    document.getElementById("boton-vaciar").addEventListener("click", () => {
        Swal.fire({
            title: "Seguro que quieres borrar todo?",
            showDenyButton: true,
            showCancelButton: true,
            confirmButtonText: "Eliminar",
            denyButtonText: `No eliminar`
          }).then((result) => {
            if (result.isConfirmed) {
              Swal.fire("Eliminado!", "", "success");
              VaciarCarrito();
            } else if (result.isDenied) {
              Swal.fire("Casi eliminas todo tu carrito UPS", "", "info");
            }
          });
    });
};

const mostrarFormularioCompra = () => {
    modeloConteiner.innerHTML = "";
    
    let formularioCompra = document.createElement("div");
    formularioCompra.className = "formulario-compra";
    formularioCompra.innerHTML = `
        <h2>Completa tus datos para finalizar la compra</h2>
        <form id="form-compra">
            <label for="nombre">Nombre Completo:</label>
            <input type="text" id="nombre" required pattern="[A-Za-z\s]+">

            <label for="direccion">Dirección:</label>
            <input type="text" id="direccion" required>

            <label for="telefono">Teléfono:</label>
            <input type="tel" id="telefono" required>

            <label for="email">Correo Electrónico:</label>
            <input type="email" id="email" required>

            <button type="submit" class="boton-finalizar">Finalizar Compra</button>
        </form>
    `;
    modeloConteiner.append(formularioCompra);

    document.getElementById("form-compra").addEventListener("submit", (event) => {
        event.preventDefault();
        Swal.fire({
            title: 'Compra finalizada',
            text: 'Gracias por tu compra!',
            icon: 'success',
            confirmButtonText: 'Aceptar'
        }).then(() => {
            finalizarCompra();
        });
    });
};

verCarrito.addEventListener("click", tocarCarrito);

const eliminarProducto = (id) => {
    Toastify({
        text: "Producto eliminado",
        duration: 3000,
        close: true,
        gravity: "top",
        position: "right", 
        stopOnFocus: true, 
        style: {
          background: "linear-gradient(to right, #0004e4, #ffffff)",
        },
        offset: {
            x: '3rem',
            y: '1rem'
          },
        onClick: function(){}
      }).showToast();
    const foundId = carrito.find((element) => element.id === id);

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

function finalizarCompra() {
    carrito.length = 0;
    carritoNumeros();
    guardarCosas();
    tocarCarrito();
}

function VaciarCarrito() {
    carrito.length = 0;
    carritoNumeros();
    guardarCosas();
    tocarCarrito();
}