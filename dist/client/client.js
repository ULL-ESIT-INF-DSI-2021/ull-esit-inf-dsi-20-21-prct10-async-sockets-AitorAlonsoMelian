"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.send = void 0;
const net = require("net");
const EventEmitterClass_1 = require("../EventEmitterClass");
/**
 * Función que se encarga de conectarse al servidor, enviar la información con la petición, y recibir la respuesta e imprimirla
 * @param command Comando a ejecutar en el servidor
 * @param user Usuario que ejecuta ese comando
 * @param title Titulo de la nota
 * @param body Cuerpo de la nota
 * @param color Color de la nota
 */
function send(command, user, title, body, color) {
    const socket = net.connect({ port: 60300 });
    const client = new EventEmitterClass_1.EventEmitterClass(socket);
    const object = { command: command, user: user, title: title, body: body, color: color };
    socket.write(JSON.stringify(object), () => {
        socket.end();
    });
    client.on('message', (response) => {
        console.log(response.output);
    });
}
exports.send = send;
