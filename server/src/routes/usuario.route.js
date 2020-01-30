const express = require('express');
const router = express.Router();
const usuarioService = require("../services/usuario-service");

router.post("/", usuarioService.salvarUsuarioRoute);
router.post('/save_usuario', usuarioService.postUsuario)
router.get("/find_all", usuarioService.getFindAll)
router.get("/:id", usuarioService.getUserById);
router.get("/", usuarioService.listarTodosUsuarios);

module.exports = router;