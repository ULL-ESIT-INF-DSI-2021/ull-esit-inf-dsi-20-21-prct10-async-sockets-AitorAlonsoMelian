"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const net = require("net");
const noteGestor_1 = require("./noteGestor");
const gestor = new noteGestor_1.noteGestor();
/**
 * Servidor que escucha en el puerto 60300, y se encarga de gestionar los comandos recibidos y llama a noteGestor, que es el que gestiona el sistema de ficheros. También manda la respuesta al cliente.
 */
const server = net.createServer({ allowHalfOpen: true }, (connection) => {
    let wholeData = '';
    connection.on('data', (data) => {
        wholeData = wholeData + data.toString();
    });
    connection.on('end', () => {
        const object = JSON.parse(wholeData);
        let result;
        console.log(object);
        switch (object.command) {
            case 'add':
                result = gestor.addNote(object.user, object.title, object.body, object.color);
                break;
            case 'read':
                result = gestor.readNote(object.user, object.title);
                break;
            case 'delete':
                result = gestor.deleteNote(object.user, object.title);
                break;
            case 'list':
                result = gestor.listNotes(object.user);
                break;
            case 'modify':
                result = gestor.modifyNote(object.user, object.title, object.body, object.color);
                break;
        }
        let response = { output: result };
        connection.write(JSON.stringify(response), () => {
            connection.end();
        });
    });
}).listen(60300, () => {
    console.log('Waiting...');
});
