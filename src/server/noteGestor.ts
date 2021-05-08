import chalk = require('chalk')
import * as fs from 'fs'

/**
 * Clase que contiene los métodos necesarios para crear, borrar, modificar y leer las notas.
 */
export class noteGestor {
    constructor(){

    }
    
    /**
     * Método que crea una nueva nota basada en los parámetros que se le pasan.
     * @param user Usuario que va a añadir la nota
     * @param title Titulo de la nota
     * @param body Contenido de la nota
     * @param color Color de la nota
     * @returns Retorna 1 si la creación de la nota ha sido exitosa
     */
    addNote(user: string, title: string, body: string, color: string): string{
        let path: string = "Notas/" + user + "/" + title + ".json"
        let content: object = { "body": body, "color": color }

        let dirPath: string = "Notas/" + user
        if (!fs.existsSync(path)) { // Primero se comprueba que NO exista el archivo
            if (!fs.existsSync(dirPath)) { // Si no existe el directorio del usuario, se crea.
                fs.mkdirSync("Notas/" + user)
            }
            fs.writeFileSync(path,JSON.stringify(content))
            
            return chalk.bgGreen("El archivo ha sido creado con éxito")
        }
        else { // Si el archivo ya existe se da un mensaje de error
            return chalk.bgRed.white("El archivo que intenta añadir ya existe")
        }

    }

    /**
     * Método que borra una nota del usuario y título que se le haya pasado por parámetro.
     * @param user Usuario del que se quiere borrar la nota
     * @param title Titulo de la nota a borrar
     * @returns Retorna 1 si la nota se ha borrado correctamente.
     */
    deleteNote(user: string, title: string): string {
        let path: string = "Notas/" + user + "/" + title + ".json"
        let dirPath: string = "Notas/" + user
        if (fs.existsSync(path)) {
            fs.rmSync(path)
            let notesList = fs.readdirSync(dirPath)
            if (notesList.length == 0) {
                fs.rmdirSync(dirPath)
            }
            return chalk.bgGreen("El archivo ha sido borrado con éxito")
        }
        else {
            return chalk.bgRed.white("El archivo que desea borrar no existe")
        }
    }

    /**
     * Método que modifica una nota del usuario user y de titulo title, sustituyendolo por el nuevo contenido que esté en body.
     * @param user Usuario que va a modificar la nota
     * @param title Titulo de la nota
     * @param body Contenido de la nota
     * @param color Color de la nota
     * @returns Retorna 1 si se ha modificado correctamente la nota.
     */
    modifyNote(user: string, title: string, body: string, color: string): string{
        let path: string = "Notas/" + user + "/" + title + ".json"
        let content: object = { "body": body, "color": color }
        if (fs.existsSync(path)){
            fs.writeFileSync(path,JSON.stringify(content))
            return chalk.bgGreen("El archivo ha sido modificado con éxito")
        }
        else {
            return chalk.bgRed.white("El archivo que desea modificar no existe")
        }
    }
    
    /**
     * Método que lista todas las notas del usuario user
     * @param user Usuario del que se listan las notas
     * @returns Retorna 1 si se listan correctamente
     */
    listNotes(user: string): string{
        let dirPath: string = "Notas/" + user
        let notesList = fs.readdirSync(dirPath)
        let response: string = ''
        notesList.forEach(element => {
            let path = dirPath + "/" + element
            let color: string = JSON.parse(fs.readFileSync(path, 'utf-8'))["color"]
            switch(color) {
                case "blue":
                    response = response + chalk.blue(element) + '\n'
                    break
                case "green":
                    response = response + chalk.green(element) + '\n'
                    break
                case "yellow":
                    response = response + chalk.yellow(element) + '\n'
                    break
                case "red":
                    response = response + chalk.red(element) + '\n'
                    break
            }
        });
        return response
    }

    /**
     * Método que imprime por pantalla la nota title del usuario user.
     * @param user Usuario de que se lee la nota
     * @param title Titulo de la nota
     * @returns Retorna 1 si se puede leer la nota correctamente
     */
    readNote(user: string, title: string): string{
        let path: string = "Notas/" + user + "/" + title + ".json"
        let content: string = fs.readFileSync(path,'utf-8')
        content = JSON.parse(content)

        let body: string = content["body"]
        let color: string = content["color"]

        let response: string = ''
        switch(color) {
            case "green": 
                response += chalk.green(body)
                break
            case "red":
                response += chalk.red(body)
                break
            case "blue":
                response += chalk.blue(body)
                break
            case "yellow":
                response += chalk.yellow(body)
                break
        }
        return response
    }

    
}