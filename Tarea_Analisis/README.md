REPORTE DE ANÁLISIS DE ALGORITMOS DE ORDENAMIENTO
1️ Introducción

Los algoritmos de ordenamiento son fundamentales en ciencias de la computación, ya que permiten organizar datos de forma eficiente para facilitar búsquedas, análisis y procesamiento.
En este reporte se analizan los algoritmos presentados en Visualgo, evaluando:

Funcionamiento

Complejidad temporal (Big O)

Complejidad espacial

Comportamiento en mejor, promedio y peor caso

Comparación experimental de desempeño

2️ Análisis Individual de Cada Algoritmo
 2.1 Bubble Sort
 Descripción

Compara elementos adyacentes e intercambia si están en el orden incorrecto. Repite el proceso hasta que no haya intercambios.

 Complejidad Temporal
Caso	   Complejidad
Mejor caso	O(n) (si ya está ordenado con optimización)
Promedio	O(n²)
Peor caso	O(n²)
 Complejidad Espacial

O(1)

 Análisis de desempeño

Muy ineficiente para listas grandes.

Solo útil para fines educativos.

Gran cantidad de intercambios.

 2.2 Selection Sort
 Descripción

Busca el elemento mínimo y lo coloca en su posición correcta.

 Complejidad Temporal
Caso	 Complejidad
Mejor	    O(n²)
Promedio	O(n²)
Peor	    O(n²)
 Complejidad Espacial

O(1)

 Análisis

Menos intercambios que Bubble.
No depende del orden inicial.

Ineficiente para grandes volúmenes de datos.

 2.3 Insertion Sort
 Descripción

Construye la lista ordenada insertando cada elemento en su posición correcta.

 Complejidad
Caso	 Complejidad
Mejor	    O(n)
Promedio	O(n²)
Peor	    O(n²)
 Espacio

O(1)

 Análisis

Muy eficiente si la lista está casi ordenada.
Buen rendimiento en conjuntos pequeños.

Usado como subrutina en algoritmos avanzados.

 2.4 Merge Sort
 Descripción

Divide el arreglo en mitades, ordena cada mitad recursivamente y luego combina.

 Complejidad
Caso	   Complejidad
Mejor	   O(n log n)
Promedio   O(n log n)
Peor	   O(n log n)
 Espacio

O(n)

 Análisis

Estable.

Rendimiento garantizado.

Requiere memoria adicional.

 2.5 Quick Sort
 Descripción

Selecciona un pivote y divide el arreglo en menores y mayores al pivote.

 Complejidad
Caso	  Complejidad
Mejor	   O(n log n)
Promedio   O(n log n)
Peor	   O(n²)
 Espacio

O(log n)

 Análisis

Generalmente el más rápido en práctica.

El peor caso ocurre con mala elección del pivote.

No estable (versión clásica).

 2.6 Heap Sort
 Descripción

Convierte el arreglo en un heap (montículo) y extrae repetidamente el máximo.

 Complejidad
Caso	  Complejidad
Mejor	   O(n log n)
Promedio   O(n log n)
Peor	   O(n log n)
 Espacio

O(1)

 Análisis

No requiere memoria adicional.

No es estable.

Rendimiento consistente.

3️ Grafico del Desempeño

Para el reporte debes incluir gráficas comparativas:

Eje X → Tamaño del arreglo (n)
Eje Y → Tiempo de ejecución

La tendencia esperada:

O(n²) → Curva parabólica (crece muy rápido)

O(n log n) → Crece moderadamente

O(n) → Crece linealmente

Puedes graficar:

Bubble vs Selection vs Insertion

Merge vs Quick vs Heap

Comparativa general

Si deseas, puedo generarte el código en Python o MATLAB para generar las gráficas.

4️ Análisis Comparativo Final
Algoritmo	Mejor Caso	Promedio	Peor Caso	Espacio	Estable
Bubble  	    O(n)     O(n²)	      O(n²)	     O(1)	   Sí
Selection	    O(n²)	 O(n²)	      O(n²)  	 O(1)	   No
Insertion	    O(n)	 O(n²)	      O(n²)	     O(1)	   Sí
Merge	    O(n log n)  O(n log n)  O(n log n)	 O(n)      Sí
Quick	    O(n log n)	O(n log n)	  O(n²)	   O(log n)	   No
Heap	    O(n log n)	O(n log n)	O(n log n)	 O(1)      No
5️ Conclusiones

Para grandes volúmenes → Merge, Quick o Heap.

Quick Sort suele ser el más rápido en práctica.

Merge es más estable y predecible.

Algoritmos O(n²) solo son adecuados para listas pequeñas.

La elección depende del tamaño del problema y memoria disponible.