import * as net from 'net'
import {RequestType, ResponseType} from '../types';

/**
 * Función que se encarga de conectarse al servidor, enviar la información con la petición, y recibir la respuesta e imprimirla
 * @param command Comando a ejecutar en el servidor
 * @param user Usuario que ejecuta ese comando
 * @param title Titulo de la nota
 * @param body Cuerpo de la nota
 * @param color Color de la nota
 */
export function send(command: string, user: string, title: string, body: string, color: string) {
    const client = net.connect({port: 60300}, () => {
        const object: RequestType = {command: command, user: user, title: title, body: body, color: color}
        client.write(JSON.stringify(object), () => {
            client.end()
        })
    })
    let wholeResponse: string = ''
    client.on('data', (data) => {
        wholeResponse += data.toString()
    })

    client.on('end', () => {
        const response: ResponseType = JSON.parse(wholeResponse)
        console.log(response.output)
    })

}