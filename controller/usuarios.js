const { response, request } = require('express');

const usuariosGet = (req = request, res = response) => {

    const { nombre = 'no name', apellido, edad } = req.query;
    res.json({
        msg: 'get Api => Controlador',
        nombre,
        apellido,
        edad
    });
}

const usuarioPost = (req, res) => {

    const { nombre, edad } = req.body;

    res.json({
        msg: 'post Api => Controlador',
        nombre,
        edad
    });
}

const usuarioPut = (req, res) => {

    const id = req.params.id;

    res.json({
        msg: 'put Api => Controlador',
        id
    });
}

const usuarioDelete = (req, res) => {
    res.json({
        msg: 'delete Api => Controlador'
    });
}

const usuarioPatch = (req, res) => {
    res.json({
        msg: 'patch Api => Controlador'
    });
}

module.exports = {
    usuariosGet,
    usuarioPost,
    usuarioPut,
    usuarioDelete,
    usuarioPatch

}