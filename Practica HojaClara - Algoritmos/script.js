console.log("HojaClara iniciado");

const filas = 15;
const columnas = 10;



const hoja = document.getElementById("hoja");



const tabla = document.createElement("table");



const encabezado = document.createElement("tr");


const esquina = document.createElement("th");


esquina.textContent = "";

encabezado.appendChild(esquina);


for (let i = 0; i < columnas; i++) {

    const th = document.createElement("th");

    th.textContent = String.fromCharCode(65 + i);

    encabezado.appendChild(th);
}

tabla.appendChild(encabezado);

const celdasCalculando = [];
// CREACIÓN DE LA MATRIZ DE DATOS
const datos = [];

for (let fila = 0; fila < filas; fila++) {

    const nuevaFila = [];

    for (let columna = 0; columna < columnas; columna++) {
        nuevaFila.push("");
    }

    datos.push(nuevaFila);
}


// CREACIÓN DE LAS CELDAS
for (let fila = 1; fila <= filas; fila++) {

    const tr = document.createElement("tr");

    const numeroFila = document.createElement("th");
    numeroFila.textContent = fila;

    tr.appendChild(numeroFila);

    for (let columna = 0; columna < columnas; columna++) {

        const td = document.createElement("td");

        td.dataset.fila = fila - 1;
        td.dataset.columna = columna;

        td.addEventListener("click", function () {

            if (td.querySelector("input")) {
                return;
            }

            const campo = document.createElement("input");
            let cancelado = false;

            campo.value =
                datos[td.dataset.fila][td.dataset.columna];

            td.textContent = "";

            campo.addEventListener("keydown", function (event) {

if (event.key === "Enter") {
    cancelado = true;
    guardarCelda(td, campo);
}

if (event.key === "Escape") {

    cancelado = true;

    const valorAnterior =
        datos[td.dataset.fila][td.dataset.columna];

    if (valorAnterior[0] === "=") {

        const expresion = valorAnterior.slice(1);
        td.textContent = evaluarExpresion(expresion);

    } else {

        td.textContent = valorAnterior;
    }
}
            });

campo.addEventListener("blur", function () {

    if (!cancelado) {
        guardarCelda(td, campo);
    }

});

            td.appendChild(campo);

            campo.focus();
            campo.select();

        });

        tr.appendChild(td);
    }

    tabla.appendChild(tr);
}






// GUARDAR UNA CELDA
function guardarCelda(td, campo) {

    const valor = campo.value;

    datos[td.dataset.fila][td.dataset.columna] = valor;

if (valor[0] === "=") {

    const nombreCelda =
        String.fromCharCode(
            65 + Number(td.dataset.columna)
        ) +
        (Number(td.dataset.fila) + 1);

    celdasCalculando.push(nombreCelda);

    const expresion = valor.slice(1);
    const resultado = evaluarExpresion(expresion);

    celdasCalculando.pop();

    td.textContent = resultado;
    aplicarEstiloCelda(td, resultado);

} else {

    td.textContent = valor;
    aplicarEstiloCelda(td, valor);
}

recalcularTodo();
}


function aplicarEstiloCelda(td, valor) {

    td.classList.remove(
        "positivo",
        "negativo",
        "error"
    );

    if (
        typeof valor === "string" &&
        valor[0] === "#"
    ) {
        td.classList.add("error");
        return;
    }

    const numero = Number(valor);

    if (valor !== "" && numero > 0) {
        td.classList.add("positivo");
    }

    if (valor !== "" && numero < 0) {
        td.classList.add("negativo");
    }
}

function recalcularTodo() {

    const celdas = tabla.querySelectorAll("td");

    celdas.forEach(function (td) {

        const fila = td.dataset.fila;
        const columna = td.dataset.columna;

        const valor = datos[fila][columna];

        if (valor && valor[0] === "=") {

            const expresion = valor.slice(1);
            const resultado = evaluarExpresion(expresion);

            td.textContent = resultado;
                aplicarEstiloCelda(td, resultado);


        } else {

            td.textContent = valor;
            aplicarEstiloCelda(td, valor);
        }
    });
}





document
    .getElementById("exportarCSV")
    .addEventListener("click", exportarCSV);

cargarHoja();

hoja.appendChild(tabla);

recalcularTodo();