function tokenizar(expresion) {

    const tokens = [];
    let numero = "";
    let referencia = "";

    for (let i = 0; i < expresion.length; i++) {

        const caracter = expresion[i];

        if (
            (caracter >= "0" && caracter <= "9") ||
            caracter === "."
        ) {

            if (referencia !== "") {
                referencia += caracter;
            } else {
                numero += caracter;
            }

        } else if (
            caracter >= "A" &&
            caracter <= "Z"
        ) {

            if (numero !== "") {
                tokens.push(Number(numero));
                numero = "";
            }

            referencia += caracter;

        } else {

            if (numero !== "") {
                tokens.push(Number(numero));
                numero = "";
            }

            if (referencia !== "") {
                tokens.push(referencia);
                referencia = "";
            }

            tokens.push(caracter);
        }
    }

    if (numero !== "") {
        tokens.push(Number(numero));
    }

    if (referencia !== "") {
        tokens.push(referencia);
    }

    return tokens;
}

function obtenerPosicion(referencia) {

    const letra = referencia[0];
    const numeroFila = Number(referencia.slice(1));

    const columna = letra.charCodeAt(0) - 65;
    const fila = numeroFila - 1;

    return [fila, columna];
}

// EVALUADOR DE EXPRESIONES
function evaluarExpresion(expresion) {

     if (
        expresion.startsWith("SUMA(") &&
        expresion.endsWith(")")
    ) {
        const contenido = expresion.slice(5, -1);
        const partes = contenido.split(":");

        const inicio = partes[0];
        const fin = partes[1];

        return sumarRango(inicio, fin);
    }

    if (
    expresion.startsWith("PROMEDIO(") &&
    expresion.endsWith(")")
) {
    const contenido = expresion.slice(9, -1);
    const partes = contenido.split(":");

    const inicio = partes[0];
    const fin = partes[1];

    return promedioRango(inicio, fin);
}

if (
    expresion.startsWith("MAX(") &&
    expresion.endsWith(")")
) {
    const contenido = expresion.slice(4, -1);
    const partes = contenido.split(":");

    const inicio = partes[0];
    const fin = partes[1];

    return maximoRango(inicio, fin);
}

if (
    expresion.startsWith("MIN(") &&
    expresion.endsWith(")")
) {
    const contenido = expresion.slice(4, -1);
    const partes = contenido.split(":");

    const inicio = partes[0];
    const fin = partes[1];

    return minimoRango(inicio, fin);
}

    const tokens = tokenizar(expresion);

    let posicion = 0;

    if (
    tokens.length === 0 ||
    tokens[0] === "+" ||
    tokens[0] === "-" ||
    tokens[0] === "*" ||
    tokens[0] === "/" ||
    tokens[tokens.length - 1] === "+" ||
    tokens[tokens.length - 1] === "-" ||
    tokens[tokens.length - 1] === "*" ||
    tokens[tokens.length - 1] === "/"
) {
    return "#ERROR!";
}

for (let i = 0; i < tokens.length - 1; i++) {

    const actual = tokens[i];
    const siguiente = tokens[i + 1];

    const actualEsOperador =
        actual === "+" ||
        actual === "-" ||
        actual === "*" ||
        actual === "/";

    const siguienteEsOperador =
        siguiente === "+" ||
        siguiente === "-" ||
        siguiente === "*" ||
        siguiente === "/";

    if (actualEsOperador && siguienteEsOperador) {
        return "#ERROR!";
    }
}

let parentesis = 0;

for (let i = 0; i < tokens.length; i++) {

    if (tokens[i] === "(") {
        parentesis++;
    }

    if (tokens[i] === ")") {
        parentesis--;

        if (parentesis < 0) {
            return "#ERROR!";
        }
    }
}

if (parentesis !== 0) {
    return "#ERROR!";
}



function obtenerValorCelda(fila, columna) {

    if (
        fila < 0 ||
        fila >= filas ||
        columna < 0 ||
        columna >= columnas
    ) {
        return "#REF!";
    }

    const nombreCelda =
        String.fromCharCode(65 + columna) + (fila + 1);

    if (celdasCalculando.includes(nombreCelda)) {
        return "#CIRC!";
    }

    const valor = datos[fila][columna];

if (valor === "") {
    return "#REF!";
}

    if (valor[0] === "=") {

        celdasCalculando.push(nombreCelda);

        const expresion = valor.slice(1);
        const resultado = evaluarExpresion(expresion);

        celdasCalculando.pop();

        return resultado;
    }

    return Number(valor);
}

function factor() {

    const token = tokens[posicion];

    if (token === "(") {

        posicion++;

        const resultado = sumaResta();

        posicion++;

        return resultado;
    }

    // Si el token es una referencia como A1, B2, C3...
    if (typeof token === "string" && /^[A-Z][0-9]+$/.test(token)) {

        const posicionCelda = obtenerPosicion(token);

        const fila = posicionCelda[0];
        const columna = posicionCelda[1];

        posicion++;

        return obtenerValorCelda(fila, columna);
    }

    posicion++;

    return token;
}

function termino() {

    let resultado = factor();

    if (
        typeof resultado === "string" &&
        resultado[0] === "#"
    ) {
        return resultado;
    }

    while (
        tokens[posicion] === "*" ||
        tokens[posicion] === "/"
    ) {
        const operador = tokens[posicion];
        posicion++;

        const siguiente = factor();

        if (
            typeof siguiente === "string" &&
            siguiente[0] === "#"
        ) {
            return siguiente;
        }

        if (operador === "*") {
            resultado = resultado * siguiente;
        }

        if (operador === "/") {

            if (siguiente === 0) {
                return "#DIV/0!";
            }

            resultado = resultado / siguiente;
        }
    }

    return resultado;
}


function sumaResta() {
    let resultado = termino();

    if (typeof resultado === "string" && resultado[0] === "#") {
        return resultado;
    }

    while (
        tokens[posicion] === "+" ||
        tokens[posicion] === "-"
    ) {
        const operador = tokens[posicion];
        posicion++;

        const siguiente = termino();

        if (typeof siguiente === "string" && siguiente[0] === "#") {
            return siguiente;
        }

        if (operador === "+") {
            resultado = resultado + siguiente;
        }

        if (operador === "-") {
            resultado = resultado - siguiente;
        }
    }

    return resultado;
}


    return sumaResta();

}