const descripcion = {
    demand: true,
    alias: 'd',
    desc: 'Descripción de la tarea'
}

const completado = {
    alias: 'c',
    default: true,
    desc: 'Marca como completado o pendiente la tarea'
}

const argv = require('yargs')
    .command('crear', 'Crea una tarea pendiente', {
        descripcion
    })
    .command('actualizar', 'Actualiza el estado completado de una tarea', {
        descripcion,
        completado
    })
    .command('listar', 'Lista las tareas', {
        estado: {
            alias: 'e',
            default: false
        }
    })
    .command('borrar', 'Borra la tarea pendiente indicada', {
        descripcion
    })
    .argv;

module.exports = {
    argv
}