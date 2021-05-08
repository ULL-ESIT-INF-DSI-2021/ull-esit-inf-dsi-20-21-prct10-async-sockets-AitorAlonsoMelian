"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.noteGestor = void 0;
const chalk = require("chalk");
const fs = require("fs");
/**
 * Clase que contiene los métodos necesarios para crear, borrar, modificar y leer las notas.
 */
class noteGestor {
    constructor() {
    }
    /**
     * Método que crea una nueva nota basada en los parámetros que se le pasan.
     * @param user Usuario que va a añadir la nota
     * @param title Titulo de la nota
     * @param body Contenido de la nota
     * @param color Color de la nota
     * @returns Retorna 1 si la creación de la nota ha sido exitosa
     */
    addNote(user, title, body, color) {
        let path = "Notas/" + user + "/" + title + ".json";
        let content = { "body": body, "color": color };
        let dirPath = "Notas/" + user;
        if (!fs.existsSync(path)) { // Primero se comprueba que NO exista el archivo
            if (!fs.existsSync(dirPath)) { // Si no existe el directorio del usuario, se crea.
                fs.mkdirSync("Notas/" + user);
            }
            fs.writeFileSync(path, JSON.stringify(content));
            console.log(chalk.bgGreen("El archivo ha sido creado con éxito"));
            return 1;
        }
        else { // Si el archivo ya existe se da un mensaje de error
            throw new Error(chalk.bgRed.white("El archivo que intenta añadir ya existe"));
        }
    }
    /**
     * Método que borra una nota del usuario y título que se le haya pasado por parámetro.
     * @param user Usuario del que se quiere borrar la nota
     * @param title Titulo de la nota a borrar
     * @returns Retorna 1 si la nota se ha borrado correctamente.
     */
    deleteNote(user, title) {
        let path = "Notas/" + user + "/" + title + ".json";
        let dirPath = "Notas/" + user;
        if (fs.existsSync(path)) {
            fs.rmSync(path);
            let notesList = fs.readdirSync(dirPath);
            if (notesList.length == 0) {
                fs.rmdirSync(dirPath);
            }
            console.log(chalk.bgGreen("El archivo ha sido borrado con éxito"));
            return 1;
        }
        else {
            throw new Error(chalk.bgRed.white("El archivo que desea borrar no existe"));
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
    modifyNote(user, title, body, color) {
        let path = "Notas/" + user + "/" + title + ".json";
        let content = { "body": body, "color": color };
        if (fs.existsSync(path)) {
            fs.writeFileSync(path, JSON.stringify(content));
            console.log(chalk.bgGreen("El archivo ha sido modificado con éxito"));
            return 1;
        }
        else {
            throw new Error(chalk.bgRed.white("El archivo que desea modificar no existe"));
        }
    }
    /**
     * Método que lista todas las notas del usuario user
     * @param user Usuario del que se listan las notas
     * @returns Retorna 1 si se listan correctamente
     */
    listNotes(user) {
        let dirPath = "Notas/" + user;
        let notesList = fs.readdirSync(dirPath);
        notesList.forEach(element => {
            let path = dirPath + "/" + element;
            let color = JSON.parse(fs.readFileSync(path, 'utf-8'))["color"];
            switch (color) {
                case "blue":
                    console.log(chalk.blue(element));
                    break;
                case "green":
                    console.log(chalk.green(element));
                    break;
                case "yellow":
                    console.log(chalk.yellow(element));
                    break;
                case "red":
                    console.log(chalk.red(element));
                    break;
            }
        });
        return 1;
    }
    /**
     * Método que imprime por pantalla la nota title del usuario user.
     * @param user Usuario de que se lee la nota
     * @param title Titulo de la nota
     * @returns Retorna 1 si se puede leer la nota correctamente
     */
    readNote(user, title) {
        let path = "Notas/" + user + "/" + title + ".json";
        let content = fs.readFileSync(path, 'utf-8');
        content = JSON.parse(content);
        let body = content["body"];
        let color = content["color"];
        switch (color) {
            case "green":
                console.log(chalk.green(body));
                break;
            case "red":
                console.log(chalk.red(body));
                break;
            case "blue":
                console.log(chalk.blue(body));
                break;
            case "yellow":
                console.log(chalk.yellow(body));
                break;
        }
        return 1;
    }
}
exports.noteGestor = noteGestor;
