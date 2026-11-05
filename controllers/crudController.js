// Controller genérico do CRUD: atende clientes, fornecedores e produtos.
// Não guarda dados em memória: tudo é lido e gravado nos arquivos JSON via model.
const model = require('../models/jsonModel');
const { validarCampos, extrairCampos } = require('../utils/validacao');

const redirecionarComMensagem = (res, entidade, mensagem) =>
  res.redirect(`/${entidade}?msg=${encodeURIComponent(mensagem)}`);

// READ - listar
exports.listar = (req, res) => {
  res.render('lista', {
    e: req.entidade,
    c: req.config,
    dados: model.listar(req.entidade),
    msg: req.query.msg || '',
    tipoMsg: req.query.tipo || 'success'
  });
};

// CREATE - formulário
exports.formNovo = (req, res) => {
  res.render('form', {
    e: req.entidade, c: req.config, item: {},
    acao: `/${req.entidade}`, erros: []
  });
};

// CREATE - gravar
exports.criar = (req, res) => {
  const erros = validarCampos(req.entidade, req.body);
  if (erros.length) {
    return res.status(400).render('form', {
      e: req.entidade, c: req.config, item: req.body,
      acao: `/${req.entidade}`, erros
    });
  }

  model.criar(req.entidade, extrairCampos(req.entidade, req.body));
  redirecionarComMensagem(res, req.entidade, 'Cadastro realizado com sucesso!');
};

// UPDATE - formulário
exports.formEditar = (req, res) => {
  const item = model.buscarPorId(req.entidade, req.params.id);
  if (!item) return res.status(404).send('Registro não encontrado.');
  res.render('form', {
    e: req.entidade, c: req.config, item,
    acao: `/${req.entidade}/editar/${req.params.id}`, erros: []
  });
};

// UPDATE - gravar
exports.atualizar = (req, res) => {
  if (!model.buscarPorId(req.entidade, req.params.id)) {
    return res.status(404).send('Registro não encontrado.');
  }

  const erros = validarCampos(req.entidade, req.body);
  if (erros.length) {
    return res.status(400).render('form', {
      e: req.entidade, c: req.config, item: { ...req.body, id: req.params.id },
      acao: `/${req.entidade}/editar/${req.params.id}`, erros
    });
  }

  model.atualizar(req.entidade, req.params.id, extrairCampos(req.entidade, req.body));
  redirecionarComMensagem(res, req.entidade, 'Alterações salvas com sucesso!');
};

// DELETE
exports.excluir = (req, res) => {
  if (!model.excluir(req.entidade, req.params.id)) {
    return res.status(404).send('Registro não encontrado.');
  }
  redirecionarComMensagem(res, req.entidade, 'Registro excluído com sucesso!');
};
