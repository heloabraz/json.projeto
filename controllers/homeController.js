const entidades = require('../config/entidades');
const model = require('../models/jsonModel');

exports.index = (req, res) => {
  const totais = Object.fromEntries(Object.keys(entidades).map(chave => [chave, model.listar(chave).length]));
  res.render('index', { nomes: ['Eloá Braz', 'Isabela Barbosa'], totais });
};

exports.health = (req, res) => res.status(200).send('OK');
