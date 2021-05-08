"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.send = void 0;
const net = require("net");
function send(command, user, title, body, color) {
    const client = net.connect({ port: 60300 }, () => {
        const object = { command: command, user: user, title: title, body: body, color: color };
        client.write(JSON.stringify(object), () => {
            client.end();
        });
    });
    let wholeResponse = '';
    client.on('data', (data) => {
        wholeResponse += data.toString();
    });
    client.on('end', () => {
        const response = JSON.parse(wholeResponse);
        console.log(response.output);
    });
}
exports.send = send;
