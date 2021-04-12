const productos = [

    {
        imagen: 'assets/img/placaAsus.jpg',
        nombre: 'PLACA MADRE ASUS PRIME H410M-E LGA1200',
        precio: {
            regular: '$15.000',
            especial: '$14.500',
        },
        especificaciones: ` -Plataforma: Intel  <br>
                            -Socket: 1200 Comet Lake <br>
                            -Chipsets Principal: Intel H410`,
        garantia: '36 meses',
        id: 1,
    },
    {
        imagen: 'assets/img/placartx3090.png',
        nombre: 'GeForce RTX 3090 de NVIDIA',
        precio: {
            regular: '$160.000',
            especial: '$145.000',
        },
        especificaciones: ` -Tipo; pcie <br>
                            -Chipset Gpu: RTX 3090 <br>
                            -Entrada Video: No <br>
                            -Puente Para Sli/croosfirex: SLI <br>
                            -Doble Puente: No <br>
                            -Características Especiales: Ray Tracing + DLSS`,
        garantia: '24 meses',
        id: 2,
    },
    {
        imagen: 'assets/img/tecladokumara.jpg',
        nombre: 'KUMARA K552 RGB',
        precio: {
            regular: '$6.000',
            especial: '$5.500',
        },
        especificaciones: `– Tipo Teclado: Mecánicos <br>
        – Tipo Switch: Outemu Red <br>
        – Teclas Multimedia: Si, a tráves de tecla FN <br>
        – Teclas Macro Dedicadas: No <br>
        – Bloqueo Tecla Windows: Si <br>
        – Tamaño teclado: Tenkeyless (sin pad númerico) <br>
        – Reposa Muñecas: No <br>
        – Retroiluminado: Si, RGB Chroma <br>
        – Cable: Goma, reforzado. Soporta 12kg y 10000 flexiones. USB enchapado en oro y filtro anti interferencias <br>
        – Matriz: 100% Anti-Ghosting con Full Key Rollover`,
        id: 3,
    },

    {
        imagen: 'assets/img/ryzen5_1600.jpg',
        nombre: 'Procesador AMD Ryzen 5 1600 AF Zen+ 12nm AM4 Wraith Stealth Cooler',
        precio: {
            regular: '$15.900',
            especial: '$12.500',
        },
        especificaciones: ` -Modelo Ryzen 5 1600 AF  <br>
                            -Socket AM4 Ryzen 2th Gen <br>
                            -Núcleos 6 <br>
                            -Frecuencia 3200.00 mhz <br>
                            -Proceso De Fabricación 12 nm <br>
                            -Hilos 12 <br>
                            -Frecuencia Turbo 3600 mhz <br>
                            -Familia AMD RYZEN 5`,
        garantia: '36 meses',
        id: 4,
    },
    {
        imagen: 'assets/img/gabinte.jpg',
        nombre: 'Gabinete Kolink Outline RGB ATX Vidrio Templado 1x120mm ARGB ',
        precio: {
            regular: '$9.165',
            especial: '$7.699',
        },
        especificaciones: `  -Factor Mother: ITX,ATX,M-ATX <br>
                            -Fuente En Posición Superior: No <br>
                            -Con Ventana: Si <br>
                            -Tipo De Ventana: Vidrio templado <br>
                            -Colores: Negro`,
        garantia: '12 meses',
        id: 5,
    },
    {
        imagen: 'assets/img/fuente.jpg',
        nombre: 'Fuente ASUS TUF 650B 80 Plus Bronze 650W',
        precio: {
            regular: '$18.286',
            especial: '$15.500',
        },
        especificaciones: ` -atts Nominal: 650 w <br>
                            -Watts Reales: 612 w <br>
                            -Formato: ATX  <br>
                            -Compatible Con Posición Inferior: Si <br> 
                            -Certificaco 80 Plus: 80 PLUS Bronze <br> 
                            -Modo Híbrido: No <br> 
                            -Tipo De Cableado: Cables fijos <br>
                            -Ampers En Linea +12V: 51 a <br>
                            -Fuente Digital: No <br>
                            -Color: Negro `,

        garantia: '12 meses',
        id: 6,
    }

];


//Variables
const carrito = document.querySelector('.carrito');
const contenedorCarrito = document.querySelector('#lista-carrito tbody');
const contenedorProducto = document.querySelector('.productos') || false;
const contenedorDetalles = document.querySelector('.detalles') || false;
const vaciarCarrito = document.querySelector('#vaciar-carrito');
const countCarrito = document.querySelector('.contador');
const listaProductos = document.querySelector('.productos') || false;
const url = window.location.pathname;
const prodId = window.location.search.substring(1);
let articulosCarrito = [];

//Comienzo del  programa. 

//Cargo productos
if (contenedorProducto) {
    cargarProductos();
}

cargoDetalleProducto();
cargaEventListener();

function cargaEventListener() {

    //Agrego Producto
    if (listaProductos) {
        listaProductos.addEventListener('click', agregarProducto);
    }

    //Agrego producto detalle
    if (contenedorDetalles) {
        contenedorDetalles.addEventListener('click', agregarProductoDetalle);
    }


    carrito.addEventListener('click', borrarProducto);

    //Vaciar Carrito
    vaciarCarrito.addEventListener('click', () => {
        articulosCarrito = [];
        limpiarCarrito();
        countCarrito.textContent = 0;
    });

}


//Funciones

function cargoDetalleProducto() {

    if (url === '/detalle.html') {
        const idProd = prodId.split('=')[1];
        const filtradoProductos = productos.filter(prod => prod.id === parseInt(idProd));

        filtradoProductos.forEach(prod => {
            const { imagen, nombre, precio: { regular, especial }, id, cantidad, garantia, especificaciones } = prod;

            //Creo div para cargar el detalle del producto
            const divDetalleProducto = document.createElement('div');
            divDetalleProducto.classList.add('detalle-producto');
            divDetalleProducto.innerHTML = `
             <div class="imagen">
                    <img src="${imagen}" alt="" width="300" height="300">
                </div>

                <div class="datos-producto">

                    <div class="nombre-producto">
                        <h4>${nombre}</h4>
                    </div>

                    <div class="precios">
                        <div class="regular">
                            <p class="regular">${regular}</p>
                        </div>
                        <span>Precio Regular</span>

                        <div class="especial-precio">
                            <span class="coutas">12 cuotas sin interes a: </span>
                            <p class="especial">${especial} <span>Precio Especial</span></p>
                        </div>
                    </div>

                    <div class="datos">

                        <div class="garantia">
                            <div class="icono-garantia">
                                <i class="fas fa-shield-alt"></i>
                            </div>

                            <div class="detalle-garantia">
                                <p><span>Garantía</span> - ${garantia}</p>
                            </div>
                        </div>

                        <div class="stock">
                            <i class="fas fa-check"></i>
                            <p><span>En Stock disponible </span> - Entrega inmediata.</p>
                        </div>

                        <div class="envios">
                            <i class="fas fa-bus"></i>
                            <p><span>Envíos a todo el país.</span></p>
                        </div>

                    </div>
                    <div class="id" hidden><span>${id}</span></div>
                    <a href="#" type="button" class="boton agregar-carrito">Sumar Carrito</a>
                </div>
            `;
            contenedorDetalles.appendChild(divDetalleProducto);


            //agrego especificaciones
            const divEspecificaciones = document.createElement('div');
            divEspecificaciones.classList.add('especificaciones');
            divEspecificaciones.innerHTML = `<div class="especificaciones">
                                                    <table>
                                                        <thead>
                                                            <tr>
                                                                <th>Caracteristicas Generales</th>
                                                            </tr>
                                                        </thead>
                                                        <tbody>
                                                            <tr>
                                                                <td>${especificaciones}</td>
                                                            </tr>
                                                        </tbody>
                                                    </table>
                                                </div> `
            divDetalleProducto.after(divEspecificaciones);
        });
    }

}

function cargarProductos() {
    productos.forEach(prod => {

        const { imagen, nombre, precio: { regular, especial }, id } = prod;
        const divProducto = document.createElement('div');
        divProducto.classList.add('producto');
        divProducto.innerHTML = `
                <img src="${imagen}" alt="" class="imagen-producto" width="150" height="150">
                <div class="info-producto">
                   <a href="detalle.html?id=${id}" class="nombre"><h4>${nombre}</h4></a>
                    <div class="precios">
                        <p class="regular">${regular}</p>
                        <p class="especial">${especial}</p>
                    </div>
                    <div class="id" hidden><span>${id}</span></div>
                    <a href="#" class="boton agregar-carrito" id="${id}">Agregar a Carrito</a>
                </div>
        `;

        contenedorProducto.appendChild(divProducto);
    });
}

function agregarProductoDetalle(e) {
    const detalleProd = e.target.parentElement.parentElement;
    leerDatosProducto(detalleProd);
    agregarContador();
}

function borrarProducto(e) {
    if (e.target.classList.contains('borrar-producto')) {
        const idProd = e.target.getAttribute('data-id');
        eliminarContador(idProd);
        articulosCarrito = articulosCarrito.filter(prod => prod.id !== idProd);
        carritoHTML();

    }
}


function agregarProducto(e) {

    if (e.target.classList.contains('agregar-carrito')) {
        e.preventDefault();
        //Guardamos producto selecionado
        const productoSeleccionado = e.target.parentElement.parentElement;
        //Listo producto en carrito 
        leerDatosProducto(productoSeleccionado);
        agregarContador();
    }
}

function leerDatosProducto(prod) {

    //Creo objeto con el contenido del producto.
    let producto = {};
    producto = {
        imagen: prod.querySelector('img').src,
        nombre: prod.querySelector('h4').textContent,
        precio: prod.querySelector('.precios .regular').textContent,
        id: prod.querySelector('.id').textContent,
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
        contenedorCarrito.appendChild(row);
    });

}


function limpiarCarrito() {
    while (contenedorCarrito.firstChild) {
        contenedorCarrito.removeChild(contenedorCarrito.firstChild);
    }

}

function agregarContador() {
    const countActual = parseInt(countCarrito.textContent);
    countCarrito.textContent = countActual + 1;
}

function eliminarContador(id) {
    const countActual = parseInt(countCarrito.textContent);
    let cantidad;

    articulosCarrito.forEach(prod => {
        if (prod.id === id) {
            cantidad = prod.cantidad;
        }
    });

    countCarrito.textContent = countActual - cantidad;
}