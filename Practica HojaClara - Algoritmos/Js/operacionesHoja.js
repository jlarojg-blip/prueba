function obtenerRango(inicio, fin) {

    const posicionInicio = obtenerPosicion(inicio);
    const posicionFin = obtenerPosicion(fin);

    const valores = [];

    for (
        let fila = posicionInicio[0];
        fila <= posicionFin[0];
        fila++
    ) {

        for (
            let columna = posicionInicio[1];
            columna <= posicionFin[1];
            columna++
        ) {

            valores.push(datos[fila][columna]);

        }
    }

    return valores;
}

function sumarRango(inicio, fin) {

    const valores = obtenerRango(inicio, fin);

    let suma = 0;

    for (let i = 0; i < valores.length; i++) {

        if (valores[i] !== "") {
            suma = suma + Number(valores[i]);
        }

    }

    return suma;
}

function promedioRango(inicio, fin) {

    const valores = obtenerRango(inicio, fin);

    let suma = 0;
    let cantidad = 0;

    for (let i = 0; i < valores.length; i++) {

        if (valores[i] !== "") {
            suma = suma + Number(valores[i]);
            cantidad++;
        }

    }

    return suma / cantidad;
}

function maximoRango(inicio, fin) {

    const valores = obtenerRango(inicio, fin);

    let maximo = null;

    for (let i = 0; i < valores.length; i++) {

        if (valores[i] !== "") {

            const numero = Number(valores[i]);

            if (maximo === null || numero > maximo) {
                maximo = numero;
            }

        }
    }

    return maximo;
}

function minimoRango(inicio, fin) {

    const valores = obtenerRango(inicio, fin);

    let minimo = null;

    for (let i = 0; i < valores.length; i++) {

        if (valores[i] !== "") {

            const numero = Number(valores[i]);

            if (minimo === null || numero < minimo) {
                minimo = numero;
            }

        }
    }

    return minimo;
}