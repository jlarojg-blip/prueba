function guardarHoja() {
    localStorage.setItem("hojaClara", JSON.stringify(datos));
    const estado = document.getElementById("estadoGuardado");
    estado.textContent = "✓ Guardado";
}

function cargarHoja() {

    const datosGuardados = localStorage.getItem("hojaClara");

    if (datosGuardados !== null) {

        const datosCargados = JSON.parse(datosGuardados);

        for (let fila = 0; fila < filas; fila++) {

            for (let columna = 0; columna < columnas; columna++) {

                datos[fila][columna] =
                    datosCargados[fila][columna];
            }
        }
    }
}

function exportarCSV() {

    let contenido = "";

    for (let fila = 0; fila < filas; fila++) {

        for (let columna = 0; columna < columnas; columna++) {

            contenido += datos[fila][columna];

            if (columna < columnas - 1) {
                contenido += ";";
            }
        }

        contenido += "\n";
    }

    const archivo = new Blob(
    [contenido],
    { type: "text/csv" }
);

const enlace = document.createElement("a");

enlace.href = URL.createObjectURL(archivo);
enlace.download = "HojaClara.csv";

enlace.click();


}