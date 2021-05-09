[![Coverage Status](https://coveralls.io/repos/github/ULL-ESIT-INF-DSI-2021/ull-esit-inf-dsi-20-21-prct10-async-sockets-AitorAlonsoMelian/badge.svg?branch=master)](https://coveralls.io/github/ULL-ESIT-INF-DSI-2021/ull-esit-inf-dsi-20-21-prct10-async-sockets-AitorAlonsoMelian?branch=master)
[![Tests](https://github.com/ULL-ESIT-INF-DSI-2021/ull-esit-inf-dsi-20-21-prct10-async-sockets-AitorAlonsoMelian/actions/workflows/node.js.yml/badge.svg)](https://github.com/ULL-ESIT-INF-DSI-2021/ull-esit-inf-dsi-20-21-prct10-async-sockets-AitorAlonsoMelian/actions/workflows/node.js.yml)
# Práctica 10 - Cliente y servidor para una aplicación de procesamiento de notas de texto
## Datos
  * **Autor:** Aitor Alonso Melián
  * **Contacto:** alu0101122496@ull.edu.es
  * **Universidad:** Universidad de La Laguna
  * **Asignatura:** Desarrollo de Sistemas informáticos
  
## Introducción
En esta práctica se implementará la aplicación de procesamiento de notas de texto que se llevó a cabo en la práctica 8 para escribir un servidor y un cliente. El cliente manejará los parámetros introducidos por línea de comando, y pasará al servidor el mensaje de manera que este ejecute los comandos que el cliente le haya pasado. El servidor devolverá el resultado al cliente.

El código está alojado en el [repositorio](https://github.com/ULL-ESIT-INF-DSI-2021/ull-esit-inf-dsi-20-21-prct10-async-sockets-AitorAlonsoMelian) y el informe está situado en la [GitHub Page](https://ull-esit-inf-dsi-2021.github.io/ull-esit-inf-dsi-20-21-prct10-async-sockets-AitorAlonsoMelian/).

## Desarrollo
El código de la práctica está estructurado de manera que, el código referente al servidor está alojado en la carpeta server, y el código del cliente en la carpeta client.

### Cliente
En la carpeta client, existen 2 ficheros. El fichero `noteApp.ts` está compuesto únicamente por los yargs, es decir, se hace la gestión de parámetros en este fichero. Desde los handler se llama a la función `send`, pasándole los parámetros que necesita para llevar a cabo el comando seleccionado.

`send` está ubicado en el fichero `client.ts`. Este es el fichero que contiene el código del cliente como tal. Desde esta función se inicia la conección mediante un `net.connect` al puerto 60300, y se guarda el socket en la constante `socket`.
Se crea el objeto que se va a enviar y se guarda en la variable `object`. Este objeto contendrá el comando, usuario, titulo, body, y color de la nota. A pesar de que no se vayan a usar siempre, se envian todos estos parámetros, que a veces están vacios, ya que el servidor decidirá que parámetros coger en función de cual sea el comando enviado. A través del socket se hace un write, para enviar el objeto que hemos construido previamente, y se indica con un evento end cuando se ha acabado de enviar el mensaje.
Para recibir los datos tenemos la clase EventEmitterClass, ya la que se le pasa el socket creado. Esta clase se encargará de escuchar a través de este socket, y almacenar la información que se envie a través del socket. Una vez recibido el evento `end` que provenga del servidor, se emite un evento `message`. Este evento es recogido desde la función `send` e imprime el contenido que recibe del servidor.

### Servidor
En el lado del servidor tenemos los ficheros `noteGestor.ts` y `server.ts`
El fichero `noteGestor.ts` contiene toda la lógica de la práctica 8, que crea las notas, las modifica... etc. Este fichero ha tenido que ser modificado muy levemente, ya que, al cambiar el contexto en el que se usa, he tenido que hacer un cambio en todos los métodos. Los métodos de la clase `noteGestor` antes hacían un `console.log` informando al usuario del éxito o fallo de la operación que habían pedido. Como esta vez está en el lado del servidor, no interesa imprimir en el servidor este mensaje, si no enviarselo al cliente, con lo cual, todo lo que antes se imprimía por pantalla, ahora se devuelve mediante un `return`.

El fichero `server.ts` contiene como su nombre indica, el server. Este server escucha en el puerto 60300, y recibe el socket `connection`. Cuando se emiten datos a través de este socket, se emite un evento `data`. Cada vez que es emitido este evento, se van almacenando los datos en la variable `wholeData`. Como explicamos en el apartado anterior, el cliente emite un evento `end` cuando acabe de enviar los datos, por lo que tenemos un listener en el evento `end`. Cuando se han recibido los datos completamente, se transforman estos datos en un objeto JSON para manejarlos mejor, y se comprueba cual es el comando que se ha enviado. El switch maneja los diferentes comandos que se han mandado, y llama al método necesario de la clase `noteGestor`, pasándole solamente los parámetros que necesita. Como anteriormente mencioné, se han sustituido todos los `console.log` que informaban de las operaciones por un `return`, con lo cual, guardamos ese resultado en la variable `result`. Una vez ejecutado la operación mandada por el cliente, construimos un objeto `response` que tendrá la salida de la operación en el atributo `output`. Enviamos este objeto a través del socket en formato `string` y cerramos la conexión.
El cliente recibirá la salida o resultado de la operación que se ha intentado realizar en el servidor, y la mostrará por pantalla.
