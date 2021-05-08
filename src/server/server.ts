import * as net from 'net'
import {noteGestor} from './noteGestor'

const gestor = new noteGestor()

const server = net.createServer({allowHalfOpen: true}, (connection) => {

    let wholeData = ''
    connection.on('data', (data) => {
        wholeData = wholeData + data.toString()
    })

    connection.on('end', () => {
        const object = JSON.parse(wholeData)
        let result: string | Error
        console.log(object)
        switch(object.command){
            case 'add':
                result = gestor.addNote(object.user, object.title, object.body, object.color)
                break;
            case 'read':
                gestor.readNote(object.user, object.title)
                break;
            case 'delete':
                gestor.deleteNote(object.user, object.title)
                break;
            case 'list':
                gestor.listNotes(object.user)
                break;
            case 'modify':
                gestor.modifyNote(object.user, object.title, object.body, object.color)
                break;
        }
    })


}).listen(60300, () => {
    console.log('Waiting...')
})
