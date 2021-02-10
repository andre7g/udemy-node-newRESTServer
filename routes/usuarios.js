const { Router } = require('express');
const { usuariosGet, usuarioPost, usuarioPut, usuarioDelete, usuarioPatch } = require('../controller/usuarios');
const router = Router();

router.get('/', usuariosGet);

router.post('/', usuarioPost);

router.put('/:id', usuarioPut);

router.delete('/', usuarioDelete);

router.patch('/', usuarioPatch);

module.exports = router;