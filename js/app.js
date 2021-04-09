//Agrego Footer
$(function() {
    $("#footerInclude").load("footer.html");
});


//Variavles
const carrito = document.querySelector('.carrito');
const contenedorCarrito = document.querySelector('#lista-carrito tbody');
const vaciarCarrito = document.querySelector('#vaciar-carrito');
const listaProductos = document.querySelector('.productos') || false;
let articulosCarrito = [];

cargaEventListener();

function cargaEventListener() {

    if (listaProductos) {
        listaProductos.addEventListener('click', agregarProducto);
    }

}


function agregarProducto(e) {

    e.preventDefault();

    if (e.target.classList.contains('agregar-carrito')) {

        //Guardamos producto selecionado
        const productoSeleccionado = e.target.parentElement.parentElement;

        //Listo producto en carrito 
        leerDatosProducto(productoSeleccionado);
    }

}



function leerDatosProducto(prod) {

    //Creo objeto con el contenido del producto.
    const producto = {
        imagen: prod.querySelector('img').src,
        nombre: prod.querySelector('h4').textContent,
        precio: prod.querySelector('.precios .regular').textContent,
        id: prod.querySelector('a').getAttribute('data-id'),
        cantidad: 1
    };

    const existe = articulosCarrito.some((prod) => prod.id === producto.id);

    if (existe) {
        //Si existe actualizamos listado de carrito
        let carrito = articulosCarrito.map(prod => {

            if (prod.id === producto.id) {
                prod.cantidad++;
                return prod;
            } else {
                return prod;
            }

        });

        articulosCarrito = [...carrito];
    } else {
        articulosCarrito = [...articulosCarrito, producto];
    }

    carritoHTML();


}

function carritoHTML() {

    console.log(contenedorCarrito);

    //limpio array
    limpiarCarrito();

    //recorre carrito y genera un HTML
    articulosCarrito.forEach(prod => {

        const { imagen, nombre, precio, id, cantidad } = prod;
        const row = document.createElement('tr');

        row.innerHTML = `
        <td>
            <img src="${imagen}" width="100">
        </td>
        <td>${nombre}</td>
        <td>${precio}</td>
        <td>${cantidad}</td>
        <td>
           <a href="#" class="borrar-producto" data-id="${id}" > X </a>
        </td>
        `;

        console.log(row);
        contenedorCarrito.appendChild(row);
    });
}


function limpiarCarrito() {

    while (contenedorCarrito.firstChild) {
        contenedorCarrito.removeChild(contenedorCarrito.firstChild);
    }


}