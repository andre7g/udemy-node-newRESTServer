const { response, request } = require('express');
const Usuario = require('../models/usuario');
const bcryptjs = require('bcryptjs');

const usuariosGet = async(req = request, res = response) => {
    const { limite = 5, desde = 0 } = req.query;
    //hacer el await por separadotarda casi el doble la respuesta
    //con arreglo de promesas para ejecutar es mas rapido
    const [total, usuarios] = await Promise.all([
        Usuario.countDocuments({ estado: true }),
        Usuario.find({ estado: true })
        .skip(Number(desde))
        .limit(Number(limite))
    ]);

    res.json({
        total,
        usuarios
    });
}

const usuarioPost = async(req, res = response) => {
    const { nombre, correo, password, rol } = req.body;
    //const usuario = new Usuario(body);
    const usuario = new Usuario({ nombre, correo, password, rol });
    //Encriptar la contraseña
    const salt = bcryptjs.genSaltSync(); //numero de vueltas para encrptar por defecto es 10 entre mas alto es mas ficil pero mas tardado
    usuario.password = bcryptjs.hashSync(password, salt);
    //save bd
    await usuario.save();
    res.json({
        usuario
    });
}

const usuarioPut = async(req, res = response) => {
    const { id } = req.params;
    const { _id, password, google, correo, ...resto } = req.body;
    //to do validar contrabase de datos
    if (password) {
        const salt = bcryptjs.genSaltSync(); //numero de vueltas para encrptar por defecto es 10 entre mas alto es mas ficil pero mas tardado
        resto.password = bcryptjs.hashSync(password, salt);
    }
    const usuario = await Usuario.findByIdAndUpdate(id, resto);
    res.json({
        msg: 'put Api => Controlador',
        usuario
    });
}

const usuarioDelete = async(req, res) => {
    const { id } = req.params;
    //Borrar fisicamente
    // const usuario = await Usuario.findByIdAndDelete(id);
    const usuario = await Usuario.findByIdAndUpdate(id, { estado: false });
    res.json({
        usuario
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