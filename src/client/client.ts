import * as net from 'net'


export function send(command: string, user: string, title: string, body: string, color: string) {
    const client = net.connect({port: 60300}, () => {
        const object = {command: command, user: user, title: title, body: body, color: color}
        client.write(JSON.stringify(object), () => {
            client.end()
        })
    })
    let wholeResponse: string = ''
    client.on('data', (data) => {
        wholeResponse += data.toString()
    })

    client.on('end', () => {
        const response = JSON.parse(wholeResponse)
        console.log(response.output)
    })

}