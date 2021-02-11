const Role = require('../models/role');
const Usuario = require('../models/usuario');

const esRoleValido = async(rol = '') => {
    const existRol = await Role.findOne({ rol });
    if (!existRol) {
        throw new Error(`El rol ${rol} no esta registrado en la BD.`);
    }
}
const emailExiste = async(correo = '') => {
    //Verificar si el correo existe
    const existeEmail = await Usuario.findOne({ correo });
    if (existeEmail) {
        throw new Error(`El correo: ${correo}, ya esta registrado en la BD.`);
    }
}
const existeUsuarioPorId = async(id = '') => {
    //Verificar si el id existe
    const existeUusario = await Usuario.findById(id);
    if (!existeUusario) {
        throw new Error(`El id: ${id}, no existe en la bd.`);
    }
}


module.exports = {
    esRoleValido,
    emailExiste,
    existeUsuarioPorId
}