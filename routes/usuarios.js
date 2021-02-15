const { Router } = require('express');
const { check } = require('express-validator');
//SE PUEDE IMPORTAR DE ESTA MANERA 
// const { validarCampos } = require('../middlewares/validar-campos');
// const { validarJWT } = require('../middlewares/validar-jwt');
// const { esAdminRole, tieneRol } = require('../middlewares/validar-roles');
// SE PUEDE IMPORTAR DE ESTA OTRA MANERA CON EL INDEX.JS
const {
    validarCampos,
    validarJWT,
    esAdminRole,
    tieneRol
} = require('../middlewares');


const { esRoleValido, emailExiste, existeUsuarioPorId } = require('../helpers/db-validators');

const { usuariosGet, usuarioPost, usuarioPut, usuarioDelete, usuarioPatch } = require('../controller/usuarios');
const router = Router();

router.get('/', usuariosGet);

router.post('/', [
    check('nombre', 'El nombre no es valido.').not().isEmpty(),
    check('password', 'El password debe ser de mas de 6 letras.').isLength({ min: 6 }),
    check('correo', 'El correo no es valido.').isEmail(),
    check('correo').custom(emailExiste),
    // check('rol', 'No es un rol válido').isIn(['ADMIN_ROLE', 'USER_ROLE']),
    check('rol').custom(esRoleValido),
    validarCampos
], usuarioPost);

router.put('/:id', [
    check('id', 'No es un ID válido').isMongoId(),
    check('id').custom(existeUsuarioPorId),
    check('rol').custom(esRoleValido),
    validarCampos
], usuarioPut);

router.delete('/:id', [
    validarJWT,
    //middleweare solo si es admin
    //esAdminRole,
    tieneRol('ADMIN_ROLE', 'VENTAS_ROLE'),
    check('id', 'No es un ID válido').isMongoId(),
    check('id').custom(existeUsuarioPorId),
    validarCampos
], usuarioDelete);

router.patch('/', usuarioPatch);

module.exports = router;