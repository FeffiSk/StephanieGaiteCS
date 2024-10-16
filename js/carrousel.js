let imagenes = [
    {
        "url": "assets/ak47-resena.jpg",
        "nombre": "Reseña de Cliente Cristian",
        "descripcion": "Las skins de la M4A4 en Counter-Strike: Global Offensive son simplemente impresionantes, tanto en términos de diseño como en cómo se ven dentro del juego. Una de mis favoritas es la Howl, que tiene un acabado legendario con un lobo feroz en colores rojo y naranja +10p."
    },
    {
        "url": "assets/awp-resena.jpg",
        "nombre": "Reseña de Cliente Manuela",
        "descripcion": "La skin que me encanta es la Neon, que presenta un diseño elegante y moderno. La combinación de colores es sutil pero impactante, y le da a la AWP un aspecto muy sofisticado. La calidad del diseño es excepcional, y realmente resalta en el campo de batalla."
    },
    {
        "url": "assets/destripa-resena.jpg",
        "nombre": "Reseña de Cliente Alvaro",
        "descripcion": "Lo genial de los cuchillos en CS es que son más que solo un arma; son una declaración de estilo. Tener una skin rara puede ser un símbolo de estatus en la comunidad, y se siente increíblemente satisfactorio mostrar tus cuchillos únicos en partidas."
    },
]

let atras = document.getElementById('atras');
let adelante = document.getElementById('adelante');
let imagen = document.getElementById('img');
let puntos = document.getElementById('puntos');
let texto = document.getElementById('texto')
let actual = 0

posicionCarrusel()
atras.addEventListener('click', function(){
    actual -=1
    if (actual == -1){
        actual = imagenes.length - 1
    }
    imagen.innerHTML = ` <img class="img" src="${imagenes[actual].url}" alt="logo pagina" loading="lazy"></img>`
    texto.innerHTML = `
    <h3>${imagenes[actual].nombre}</h3>
    <p>${imagenes[actual].descripcion}</p>
    `
    posicionCarrusel()
})  
adelante.addEventListener('click', function(){
    actual +=1
    if (actual == imagenes.length){
        actual = 0
    }
    imagen.innerHTML = ` <img class="img" src="${imagenes[actual].url}" alt="logo pagina" loading="lazy"></img>`
    texto.innerHTML = `
    <h3>${imagenes[actual].nombre}</h3>
    <p>${imagenes[actual].descripcion}</p>
    `
    posicionCarrusel()
})  

function posicionCarrusel() {
    puntos.innerHTML = ""
    for (let i = 0; i <imagenes.length; i++){
        if(i == actual){
            puntos.innerHTML += '<p class="bold">.<p>'
        }
        else{
            puntos.innerHTML += '<p>.<p>'
        }
    } 
}
