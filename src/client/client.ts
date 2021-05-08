import * as net from 'net'
import {RequestType, ResponseType} from '../types';

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