const express = require('express');
const router = express.Router();
const usuarioController = require("../controllers/usuario-controller");

router.post("/post", usuarioController.salvarUsuarioRoute);
router.get("/by/:id", usuarioController.buscarUsuarioPorIDRoute);

module.exports = router;