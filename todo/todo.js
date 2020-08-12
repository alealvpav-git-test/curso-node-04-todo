const fs = require('fs');
const { isUndefined } = require('util');
const dbFileName = './db/data.json';
const dbFileNameRequire = '../db/data.json';

let listadoPorHacer = [];

const cargarDB = () => {
    try {
        listadoPorHacer = require(dbFileNameRequire);
    } catch (error) {
        listadoPorHacer = [];
    }
}

const guardarDB = () => {
    let data = JSON.stringify(listadoPorHacer);
    fs.writeFile(dbFileName, data, (err) => {
        if (err) throw new Error('No se pudo grabar la tarea', err);
    });
}

const crear = (descripcion) => {
    cargarDB();

    let porHacer = {
        descripcion,
        completado: false
    };

    listadoPorHacer.push(porHacer);

    guardarDB();

    return porHacer;
}

const listar = (estado = undefined) => {
    cargarDB();
    let listadoFinal = listadoPorHacer;
    // if (!isUndefined(estado)){
    //     listadoFinal = listadoPorHacer.filter((tarea) => tarea.completado === estado);
    // }
    return listadoFinal;
}

const actualizar = (descripcion, completado = true) => {
    cargarDB();

    let index = listadoPorHacer.findIndex((tarea) => tarea.descripcion === descripcion);

    if (index >= 0) {
        listadoPorHacer[index].completado = completado;
        guardarDB();
        return true;
    } else {
        return false;
    }
}

const borrar = (descripcion) => {
    cargarDB();
    let index = listadoPorHacer.findIndex((tarea) => tarea.descripcion === descripcion);

    // //alternativa 1 -> sin estandarizar el return
    // if (index >= 0) {
    //     let removed = listadoPorHacer.splice(index);
    //     guardarDB();
    //     return removed;
    // } else {
    //     return 'No hay ninguna tarea con esa descripción';
    // }
    //alternativa 2 -> Estandarizando el return para que sea siempre Boolean
    if (index >= 0) {
        let removed = listadoPorHacer.splice(index);
        guardarDB();
        return true;
    } else {
        return false;
    }
}

module.exports = {
    crear,
    listar,
    actualizar,
    borrar
}