/**
 * Convierte el valor ingresado en una unidad a las demas unidades (metro, pulgada, pie y yarda)
 * @method convertirUnidades
 * @param {string} id - Id del input que modifico el usuario
 * @param {string} valor - Valor ingresado por el usuario
 * @return No retorna valor, asigna los resultados en los inputs
 */
let convertirUnidades = (id, valor) => {
    let met, pul, pie, yar;

    if (valor.includes(",")) {
        valor = valor.replace(",", ".");
    }

    if (isNaN(valor)) {
        alert("El valor ingresado es incorrecto");
        met = "";
        pul = "";
        pie = "";
        yar = "";
    } else {
        if (id === "metro") {
            met = valor;
            pul = valor * 39.3701;
            pie = valor * 3.28084;
            yar = valor * 1.09361;
        } else if (id === "pulgada") {
            met = valor * 0.0254;
            pul = valor;
            pie = valor * 0.08333;
            yar = valor * 0.027778;
        } else if (id === "pie") {
            met = valor * 0.3048;
            pul = valor * 12;
            pie = valor;
            yar = valor * 0.333333;
        } else if (id === "yarda") {
            met = valor * 0.9144;
            pul = valor * 36;
            pie = valor * 3;
            yar = valor;
        }
        met = Math.round(met * 100) / 100;
        pul = Math.round(pul * 100) / 100;
        pie = Math.round(pie * 100) / 100;
        yar = Math.round(yar * 100) / 100;
    }

    document.lasUnidades.unid_metro.value = met;
    document.lasUnidades.unid_pulgada.value = pul;
    document.lasUnidades.unid_pie.value = pie;
    document.lasUnidades.unid_yarda.value = yar;
}

/**
 * Convierte de grados a radianes y de radianes a grados
 * @method convertirGR
 * @param {string} id - Id del input que modifico el usuario (grados o radianes)
 * @param {string} valor - Valor ingresado por el usuario
 * @return No retorna valor, asigna el resultado en el otro input
 */
let convertirGR = (id, valor) => {
    let grad, rad;

    if (valor.includes(",")) {
        valor = valor.replace(",", ".");
    }

    if (isNaN(valor)) {
        alert("El valor ingresado es incorrecto");
        grad = "";
        rad = "";
    } else if (id === "grados") {
        grad = valor;
        rad = Math.round(valor * Math.PI / 180 * 100) / 100;
    } else if (id === "radianes") {
        rad = valor;
        grad = Math.round(valor * 180 / Math.PI * 100) / 100;
    }

    document.getElementById("grados").value = grad;
    document.getElementById("radianes").value = rad;
}

/**
 * Muestra u oculta el div segun el radio button seleccionado
 * @method mostrarOcultar
 * @param {string} valor - Valor del radio button seleccionado
 * @return No retorna valor
 */
let mostrarOcultar = (valor) => {
    if (valor === "val_mostrar") {
        document.getElementById("unDiv").style.display = "block";
    } else if (valor === "val_ocultar") {
        document.getElementById("unDiv").style.display = "none";
    }
}

/**
 * Suma los dos numeros ingresados y muestra el resultado
 * @method sumar
 * @return No retorna valor
 */
let sumar = () => {
    let num1 = document.getElementById("nums1").value;
    let num2 = document.getElementById("nums2").value;

    if (num1 !== "" && num2 !== "" && !isNaN(num1) && !isNaN(num2)) {
        document.getElementById("totalS").innerHTML = Number(num1) + Number(num2);
    }
}

/**
 * Resta los dos numeros ingresados y muestra el resultado
 * @method restar
 * @return No retorna valor
 */
let restar = () => {
    let num1 = document.getElementById("numr1").value;
    let num2 = document.getElementById("numr2").value;

    if (num1 !== "" && num2 !== "" && !isNaN(num1) && !isNaN(num2)) {
        document.getElementById("totalR").innerHTML = Number(num1) - Number(num2);
    }
}

/**
 * Multiplica los dos numeros ingresados y muestra el resultado
 * @method multiplicar
 * @return No retorna valor
 */
let multiplicar = () => {
    let num1 = document.getElementById("numm1").value;
    let num2 = document.getElementById("numm2").value;

    if (num1 !== "" && num2 !== "" && !isNaN(num1) && !isNaN(num2)) {
        document.getElementById("totalM").innerHTML = Number(num1) * Number(num2);
    }
}

/**
 * Divide los dos numeros ingresados y muestra el resultado
 * @method dividir
 * @return No retorna valor
 */
let dividir = () => {
    let num1 = document.getElementById("numd1").value;
    let num2 = document.getElementById("numd2").value;

    if (num1 !== "" && num2 !== "" && !isNaN(num1) && !isNaN(num2)) {
        if (Number(num2) === 0) {
            document.getElementById("totalD").innerHTML = "No se puede dividir por 0";
        } else {
            document.getElementById("totalD").innerHTML = Number(num1) / Number(num2);
        }
    }
}
