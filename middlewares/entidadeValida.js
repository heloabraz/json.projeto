const entidades = require('../config/entidades');

// Garante que a rota pertence a uma entidade existente (clientes, fornecedores, produtos)
module.exports = function entidadeValida(req, res, next) {
  const entidade = req.params.entidade;
  if (!Object.prototype.hasOwnProperty.call(entidades, entidade)) {
    return res.status(404).send('Página não encontrada.');
  }
  req.entidade = entidade;
  req.config = entidades[entidade];
  next();
};
