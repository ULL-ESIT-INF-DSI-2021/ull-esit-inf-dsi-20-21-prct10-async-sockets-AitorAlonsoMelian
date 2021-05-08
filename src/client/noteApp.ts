import * as yargs from 'yargs';
import {send} from './client'


/**
 * Este fichero se encarga de gestionar los parámetros que se pasan por línea de comando, y de llamar a los métodos necesarios.
 */
yargs.command({
  command: 'add',
  describe: 'Add a new note',
  builder: {
    title: {
      describe: 'Note title',
      demandOption: true,
      type: 'string',
    },
    user: {
      describe: 'User who writes the note',
      demandOption: true,
      type: 'string',
    },
    body: {
      describe: 'Note Body',
      demandOption: true,
      type: 'string',
    },
    color: {
      describe: 'Note Color',
      demandOption: true,
      type: 'string',
    }
  },
  handler(argv) {
    if (typeof argv.user === 'string' && typeof argv.title === 'string' && typeof argv.body === 'string' && typeof argv.color === 'string' && typeof argv._[0] === 'string') {
      //note.addNote(argv.user, argv.title, argv.body, argv.color)
      send(argv._[0], argv.user, argv.title, argv.body, argv.color)
    }
  },
});

yargs.command({
  command: "read",
  describe: "Read a note",
  builder: {
    title: {
      describe: "Note to read",
      demandOption: true,
      type: 'string'
    },
    user: {
      describe: "User who owns the note you want to read",
      demandOption: true,
      type: 'string'
    }
  },
  handler(argv) {
    if (typeof argv.user === 'string' && typeof argv.title === 'string') {
      //note.readNote(argv.user, argv.title)
    }
  }
});

yargs.command({
  command: "delete",
  describe: "Delete a note",
  builder: {
    title: {
      describe: "Note to delete",
      demandOption: true,
      type: 'string'
    },
    user: {
      describe: "User who owns the note you want to delete",
      demandOption: true,
      type: 'string'
    }
  },
  handler(argv) {
    if (typeof argv.user === 'string' && typeof argv.title === 'string') {
      //note.deleteNote(argv.user, argv.title)
    }
  }
});

yargs.command({
  command: "list",
  describe: "list notes",
  builder: {
    user: {
      describe: "User who owns the notes you want to list",
      demandOption: true,
      type: 'string'
    }
  },
  handler(argv) {
    if (typeof argv.user === 'string') {
      //note.listNotes(argv.user)
    }
  }
});

yargs.command({
  command: "modify",
  describe: "modify notes",
  builder: {
    user: {
      describe: "User who owns the notes you want to list",
      demandOption: true,
      type: 'string'
    },
    title: {
      describe: "Note to modify",
      demandOption: true,
      type: 'string'
    },
    body: {
      describe: "New body to set on your note.",
      demandOption: true,
      type: 'string'
    },
    color: {
      describe: "New color to set on your note.",
      demandOption: true,
      type: 'string'
    }
  },
  handler(argv) {
    if (typeof argv.user === 'string' && typeof argv.title === 'string' && typeof argv.body === 'string' && typeof argv.color === 'string') {
      //note.modifyNote(argv.user, argv.title, argv.body, argv.color)
    }
  }
});


yargs.parse()