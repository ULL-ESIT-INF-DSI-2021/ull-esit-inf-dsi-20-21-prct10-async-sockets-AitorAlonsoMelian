"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EventEmitterClass = void 0;
const events_1 = require("events");
class EventEmitterClass extends events_1.EventEmitter {
    constructor(connection) {
        super();
        let data = '';
        connection.on('data', (chunk) => {
            data += chunk;
        });
        connection.on('end', () => {
            const message = JSON.parse(data.toString());
            this.emit('message', message);
        });
    }
}
exports.EventEmitterClass = EventEmitterClass;
