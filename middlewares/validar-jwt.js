const { request, response } = require('express');
const jwt = require('jsonwebtoken');

const Usuario = require('../models/usuario');

const validarJWT = async(req = request, res = response, next) => {
    const token = req.header('x-token');

    if (!token) {
        return res.status(401).json({
            msg: 'No hay token en la petición.'
        });
    }

    try {
        const { uid } = jwt.verify(token, process.env.SECRETOPRIVATEKEY);
        //Lee el usuario que corresponde al uid
        const usuario = await Usuario.findById(uid);
        //crear una propiedad nueva en request
        req.usuario = usuario;
        //Vrificar si el usuario existe
        if (!usuario) {
            return res.status(401).json({
                msg: 'Token no valido - usuario no existe en db.'
            });
        }
        //Vrificar si el uid tiene estado en 'true'
        if (!usuario.estado) {
            return res.status(401).json({
                msg: 'Token no valido - usuario:false'
            });
        }

        next();
    } catch (error) {
        console.log(error);
        res.status(401).json({
            msg: 'Token no válido.'
        });
    }
}

module.exports = {
    validarJWT
}