const express = require('express');
const home = require('../controllers/homeController');
const crud = require('../controllers/crudController');
const entidadeValida = require('../middlewares/entidadeValida');

const router = express.Router();

router.get('/health', home.health);
router.get('/', home.index);

router.get('/:entidade', entidadeValida, crud.listar);
router.get('/:entidade/novo', entidadeValida, crud.formNovo);
router.post('/:entidade', entidadeValida, crud.criar);
router.get('/:entidade/editar/:id', entidadeValida, crud.formEditar);
router.post('/:entidade/editar/:id', entidadeValida, crud.atualizar);
router.post('/:entidade/excluir/:id', entidadeValida, crud.excluir);

module.exports = router;
