/**
 * Clase que contiene los métodos necesarios para crear, borrar, modificar y leer las notas.
 */
export declare class noteGestor {
    constructor();
    /**
     * Método que crea una nueva nota basada en los parámetros que se le pasan.
     * @param user Usuario que va a añadir la nota
     * @param title Titulo de la nota
     * @param body Contenido de la nota
     * @param color Color de la nota
     * @returns Retorna la cadena que indica el resultado de la operación
     */
    addNote(user: string, title: string, body: string, color: string): string;
    /**
     * Método que borra una nota del usuario y título que se le haya pasado por parámetro.
     * @param user Usuario del que se quiere borrar la nota
     * @param title Titulo de la nota a borrar
     * @returns Retorna la cadena que indica el resultado de la operación
     */
    deleteNote(user: string, title: string): string;
    /**
     * Método que modifica una nota del usuario user y de titulo title, sustituyendolo por el nuevo contenido que esté en body.
     * @param user Usuario que va a modificar la nota
     * @param title Titulo de la nota
     * @param body Contenido de la nota
     * @param color Color de la nota
     * @returns Retorna la cadena que indica el resultado de la operación
     */
    modifyNote(user: string, title: string, body: string, color: string): string;
    /**
     * Método que lista todas las notas del usuario user
     * @param user Usuario del que se listan las notas
     * @returns Retorna la lista de todas las notas del usuario user
     */
    listNotes(user: string): string;
    /**
     * Método que devuelve la nota title del usuario user.
     * @param user Usuario de que se lee la nota
     * @param title Titulo de la nota
     * @returns Retorna el contenido de la nota en el color adecuado
     */
    readNote(user: string, title: string): string;
}
