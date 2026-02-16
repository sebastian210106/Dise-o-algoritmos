function analizarBigO(codigo) {
    
    const lineas = codigo.split('\n');
    let maxAnidamiento = 0;
    let anidamientoActual = 0;

    lineas.forEach(linea => {
        
        if (linea.includes('for') || linea.includes('while') || linea.includes('.forEach')) {
            anidamientoActual++;
            if (anidamientoActual > maxAnidamiento) {
                maxAnidamiento = anidamientoActual;
            }
        }
        
        if (linea.includes('}')) {
            if (anidamientoActual > 0) anidamientoActual--;
        }
    });

    
    switch (maxAnidamiento) {
        case 0: return "O(1) - Constante";
        case 1: return "O(n) - Lineal";
        case 2: return "O(n^2) - Cuadrática";
        default: return `O(n^${maxAnidamiento}) - Polinómica`;
    }
}




console.log("La complejidad estimada es: " + analizarBigO(miCodigoEjemplo));