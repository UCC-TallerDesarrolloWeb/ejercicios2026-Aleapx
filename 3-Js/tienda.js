const productos = [
  {
    nombre: "Cabezal Sparring",
    description: "Cabezal de Sparring.",
    categoria: "Protectores",
    marca: "Gran Marc",
    talle: ["1", "2", "3"],
    precio: 35000,
    web: "https://www.granmarctiendaonline.com.ar/productos/cabezal-cerrado/",
    imagen: "cabezal-cerrado.webp",
  },
  {
    nombre: "Dobok Dan",
    description: "Bobok aprobado para torneos internacionales.",
    categoria: "Dobok",
    marca: "Daedo",
    talle: ["1", "2", "3", "4", "5", "6", "7", "8"],
    precio: 115000,
    web: "https://www.daedo.com/products/taitf-10813",
    imagen: "dobok.webp",
  },
  {
    nombre: "Escudo de Potencia",
    description: "Escudo de potencia para entrenamientos.",
    categoria: "Entrenamiento",
    marca: "Gran Marc",
    talle: ["s/talle"],
    precio: 51700,
    web: "https://www.granmarctiendaonline.com.ar/productos/escudo-de-potencia-grande/",
    imagen: "escudo-potencia.webp",
  },
  {
    nombre: "Par de focos redondos",
    description: "Par de focos de 25cm x 25cm para hacer entrenamiento.",
    categoria: "Entrenamiento",
    marca: "Gran Marc",
    talle: ["s/talle"],
    precio: 15000,
    web: "https://www.granmarctiendaonline.com.ar/productos/foco-con-dedos/",
    imagen: "foco-con-dedos.webp",
  },
  {
    nombre: "Guantes 10 onzas",
    description:
      "Guantes de Sparring de 10 onzas habilitados para torneos internacionales",
    categoria: "Protectores",
    marca: "Daedo",
    talle: ["s/talle"],
    precio: 35000,
    web: "https://www.daedo.com/products/pritf-2020",
    imagen: "protectores-manos.webp",
  },
  {
    nombre: "Protectores Pie",
    description: "Protectores de Pie habilitados para torneos internacionales",
    categoria: "Protectores",
    marca: "Daedo",
    talle: ["XXS", "XS", "S", "M", "L", "XL"],
    precio: 35000,
    web: "https://www.daedo.com/collections/collection-itf-gloves/products/pritf-2022",
    imagen: "protectores-pie.webp",
  },
];

const urlImagenes = "https://ucc-tallerdesarrolloweb.github.io/filminas/images/ejercicios/";

/**
 * Da formato al precio de la forma $3.123,45
 * @method formatearPrecio
 * @param {number} precio - Precio del producto
 * @return {string} Precio con formato
 */
let formatearPrecio = (precio) => {
  return "$" + new Intl.NumberFormat("es-AR", { minimumFractionDigits: 2 }).format(precio);
};

/**
 * Obtiene el carrito guardado en el localStorage
 * @method obtenerCarrito
 * @return {Array} Array con los productos del carrito
 */
let obtenerCarrito = () => {
  let carrito = JSON.parse(localStorage.getItem("carrito"));
  if (carrito === null) {
    carrito = [];
  }
  return carrito;
};

/**
 * Muestra al lado del boton del carrito la cantidad de productos agregados
 * @method actualizarContador
 */
let actualizarContador = () => {
  let carrito = obtenerCarrito();
  let cantidad = 0;
  carrito.forEach((item) => {
    cantidad += item.cantidad;
  });
  document.getElementById("contador").innerHTML = cantidad;
};

/**
 * Se ejecuta cuando carga la pagina de productos
 * @method cargarProductos
 */
let cargarProductos = () => {
  mostrarProductos(productos);
  actualizarContador();
};

/**
 * Crea una tarjeta por cada producto de la lista
 * @method mostrarProductos
 * @param {Array} lista - Productos a mostrar
 */
let mostrarProductos = (lista) => {
  let contenido = "";

  lista.forEach((producto) => {
    let indice = productos.indexOf(producto);
    contenido += `<div class="tarjeta">
        <img src="${urlImagenes}${producto.imagen}" alt="${producto.nombre}">
        <h3>${producto.nombre}</h3>
        <p>${formatearPrecio(producto.precio)}</p>
        <button onclick="verDetalle(${indice})">Ver detalle de Producto</button>
        <button onclick="agregarAlCarrito(${indice})">Agregar al carrito</button>
      </div>`;
  });

  if (lista.length === 0) {
    contenido = "<p>No se encontraron productos</p>";
  }

  document.getElementById("catalogo").innerHTML = contenido;
};

/**
 * Muestra el dialog con el detalle del producto seleccionado
 * @method verDetalle
 * @param {number} indice - Posicion del producto en el array productos
 */
let verDetalle = (indice) => {
  let producto = productos[indice];

  document.getElementById("contenidoDetalle").innerHTML = `
    <h2>${producto.nombre}</h2>
    <img src="${urlImagenes}${producto.imagen}" alt="${producto.nombre}">
    <p>${producto.description}</p>
    <p><b>Marca:</b> ${producto.marca}</p>
    <p><b>Categoría:</b> ${producto.categoria}</p>
    <p><b>Talles:</b> ${producto.talle.join(", ")}</p>
    <p><b>Precio:</b> ${formatearPrecio(producto.precio)}</p>
    <p><a href="${producto.web}" target="_blank">Ver en la web</a></p>`;

  document.getElementById("detalle").showModal();
};

/**
 * Cierra el dialog del detalle
 * @method cerrarDetalle
 */
let cerrarDetalle = () => {
  document.getElementById("detalle").close();
};

/**
 * Agrega un producto al carrito y lo guarda en el localStorage
 * @method agregarAlCarrito
 * @param {number} indice - Posicion del producto en el array productos
 */
let agregarAlCarrito = (indice) => {
  let carrito = obtenerCarrito();
  let producto = productos[indice];
  let encontrado = carrito.find((item) => item.nombre === producto.nombre);

  if (encontrado) {
    encontrado.cantidad++;
  } else {
    carrito.push({
      nombre: producto.nombre,
      precio: producto.precio,
      imagen: producto.imagen,
      cantidad: 1,
    });
  }

  localStorage.setItem("carrito", JSON.stringify(carrito));
  actualizarContador();
};

/**
 * Filtra los productos segun lo que elige el usuario y luego los ordena
 * @method filtrarProductos
 */
let filtrarProductos = () => {
  let texto = document.getElementById("buscar").value.toLowerCase();
  let minimo = document.getElementById("precioMin").value;
  let maximo = document.getElementById("precioMax").value;
  let marca = document.getElementById("marca").value;
  let checks = document.getElementsByName("categoria");
  let categorias = [];

  for (let i = 0; i < checks.length; i++) {
    if (checks[i].checked) {
      categorias.push(checks[i].value);
    }
  }

  let resultado = productos.filter((producto) =>
    producto.nombre.toLowerCase().includes(texto) ||
    producto.description.toLowerCase().includes(texto)
  );

  if (minimo !== "") {
    resultado = resultado.filter((producto) => producto.precio >= Number(minimo));
  }
  if (maximo !== "") {
    resultado = resultado.filter((producto) => producto.precio <= Number(maximo));
  }
  if (marca !== "todas") {
    resultado = resultado.filter((producto) => producto.marca === marca);
  }
  if (categorias.length > 0) {
    resultado = resultado.filter((producto) => categorias.includes(producto.categoria));
  }

  ordenarProductos(resultado);
  mostrarProductos(resultado);
};

/**
 * Ordena la lista segun la opcion elegida en el select
 * @method ordenarProductos
 * @param {Array} lista - Productos a ordenar
 */
let ordenarProductos = (lista) => {
  let orden = document.getElementById("orden").value;

  if (orden === "menor") {
    lista.sort((a, b) => a.precio - b.precio);
  } else if (orden === "mayor") {
    lista.sort((a, b) => b.precio - a.precio);
  } else if (orden === "az") {
    lista.sort((a, b) => a.nombre.localeCompare(b.nombre));
  } else if (orden === "za") {
    lista.sort((a, b) => b.nombre.localeCompare(a.nombre));
  }
};

/**
 * Muestra los productos guardados en el carrito y el total a pagar
 * @method mostrarCarrito
 */
let mostrarCarrito = () => {
  let carrito = obtenerCarrito();
  let contenido = "";
  let total = 0;

  carrito.forEach((item, indice) => {
    let subtotal = item.precio * item.cantidad;
    total += subtotal;
    contenido += `<div class="item-carrito">
        <img src="${urlImagenes}${item.imagen}" alt="${item.nombre}">
        <h3>${item.nombre}</h3>
        <p>Precio: ${formatearPrecio(item.precio)}</p>
        <p>Cantidad: ${item.cantidad}</p>
        <p>Subtotal: ${formatearPrecio(subtotal)}</p>
        <button onclick="eliminarProducto(${indice})">Eliminar el producto</button>
      </div>`;
  });

  if (carrito.length === 0) {
    contenido = "<p>El carrito está vacío</p>";
  }

  document.getElementById("listaCarrito").innerHTML = contenido;
  document.getElementById("total").innerHTML = formatearPrecio(total);
  actualizarContador();
};

/**
 * Elimina un producto del carrito
 * @method eliminarProducto
 * @param {number} indice - Posicion del producto en el carrito
 */
let eliminarProducto = (indice) => {
  let carrito = obtenerCarrito();
  carrito.splice(indice, 1);
  localStorage.setItem("carrito", JSON.stringify(carrito));
  mostrarCarrito();
};

/**
 * Elimina todos los productos del carrito
 * @method vaciarCarrito
 */
let vaciarCarrito = () => {
  localStorage.removeItem("carrito");
  mostrarCarrito();
};
