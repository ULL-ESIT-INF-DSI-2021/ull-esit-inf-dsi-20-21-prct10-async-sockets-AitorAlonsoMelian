/**
 * Función que se encarga de conectarse al servidor, enviar la información con la petición, y recibir la respuesta e imprimirla
 * @param command Comando a ejecutar en el servidor
 * @param user Usuario que ejecuta ese comando
 * @param title Titulo de la nota
 * @param body Cuerpo de la nota
 * @param color Color de la nota
 */
export declare function send(command: string, user: string, title: string, body: string, color: string): void;
