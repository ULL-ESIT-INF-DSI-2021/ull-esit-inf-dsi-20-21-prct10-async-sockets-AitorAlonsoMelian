"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const net = require("net");
const noteGestor_1 = require("./noteGestor");
const gestor = new noteGestor_1.noteGestor();
const server = net.createServer({ allowHalfOpen: true }, (connection) => {
    let wholeData = '';
    connection.on('data', (data) => {
        wholeData = wholeData + data.toString();
    });
    connection.on('end', () => {
        const object = JSON.parse(wholeData);
        console.log(object);
        switch (object.command) {
            case 'add':
                gestor.addNote(object.user, object.title, object.body, object.color);
                break;
            case 'read':
                gestor.readNote(object.user, object.title);
                break;
            case 'delete':
                gestor.deleteNote(object.user, object.title);
                break;
            case 'list':
                gestor.listNotes(object.user);
                break;
            case 'modify':
                gestor.modifyNote(object.user, object.title, object.body, object.color);
                break;
        }
    });
}).listen(60300, () => {
    console.log('Waiting...');
});
