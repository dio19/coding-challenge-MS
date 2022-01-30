# coding-challenge-MS

## Como Correr el proyecto

### Instalación

```
git clone https://github.com/dio19/coding-challenge-MS
cd coding-challenge-MS
npm install

```
El codigo esta desarrollado en **Typescrypt** y los tests estan implementados en **Jest.js**
Para poder utilizar Jest y que sea compatible con TypeScript, se sumo Babel como asi otras configuraciones y dependencias necesarias.


### Testear ejemplo de muestra del ejercicio:

```
npm run example

```
![Captura de pantalla de 2022-01-30 16-08-06](https://user-images.githubusercontent.com/55143009/151713848-f672c7c4-c397-4a8d-a38c-56c3bbb514cf.png)

Aparecera el Output esperado en base al input que fue proporcionado como muestra en el ejercicio.

### Correr los tests (implementados con Jest)

```
npm test

```

En los tests sume los casos mencionados en el ejercicio a tener en cuenta:

1. Cada línea de comando no podra contener más de 80 caracteres.
2. Los nombres de los elementos distinguen entre mayúsculas y minúsculas y cada uno no tiene más de 10 caracteres.
3. Los nombres de los comandos (DEPEND, INSTALL, REMOVE y LIST) siempre aparecen en mayúsculas como primer elemento en la linea de comando. Si este primer elemento no matchea con ninguno de estos comandos o no esta en mayuscula consologueara el error.

En todos los casos anteriormente mencionados el codigo consologuea el error e ignora el comando, continuando con el siguiente en el input ingresado.

### Para generar el reporte de codigo cubierto por tests.

```
npm test -- --coverage

```

