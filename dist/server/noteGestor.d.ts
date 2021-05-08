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
     * @returns Retorna 1 si la creación de la nota ha sido exitosa
     */
    addNote(user: string, title: string, body: string, color: string): string;
    /**
     * Método que borra una nota del usuario y título que se le haya pasado por parámetro.
     * @param user Usuario del que se quiere borrar la nota
     * @param title Titulo de la nota a borrar
     * @returns Retorna 1 si la nota se ha borrado correctamente.
     */
    deleteNote(user: string, title: string): string;
    /**
     * Método que modifica una nota del usuario user y de titulo title, sustituyendolo por el nuevo contenido que esté en body.
     * @param user Usuario que va a modificar la nota
     * @param title Titulo de la nota
     * @param body Contenido de la nota
     * @param color Color de la nota
     * @returns Retorna 1 si se ha modificado correctamente la nota.
     */
    modifyNote(user: string, title: string, body: string, color: string): string;
    /**
     * Método que lista todas las notas del usuario user
     * @param user Usuario del que se listan las notas
     * @returns Retorna 1 si se listan correctamente
     */
    listNotes(user: string): string;
    /**
     * Método que imprime por pantalla la nota title del usuario user.
     * @param user Usuario de que se lee la nota
     * @param title Titulo de la nota
     * @returns Retorna 1 si se puede leer la nota correctamente
     */
    readNote(user: string, title: string): string;
}
