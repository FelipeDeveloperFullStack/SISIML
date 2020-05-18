const express = require('express');
const router = express.Router();
const usuarioService = require("../services/usuario-service");

router.post("/", usuarioService.salvarUsuarioRoute);
router.post('/save_usuario', usuarioService.postUsuario)
router.get("/", usuarioService.listarTodosUsuarios);
router.get("/procurar_usuario_byEmail/:email", usuarioService.getProcurarUsuarioPorEmail)
router.get("/:id", usuarioService.getUserById);
router.post("/post/usuario_by_id", usuarioService.getUsuarioByID)

module.exports = router;