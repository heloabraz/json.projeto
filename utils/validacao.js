const entidades = require('../config/entidades');

// Valida os campos recebidos do formulário e devolve uma lista de erros
function validarCampos(entidade, body) {
  const erros = [];
  for (const [chave, rotulo, tipo] of entidades[entidade].campos) {
    const valor = String(body[chave] ?? '').trim();
    if (!valor) erros.push(`Preencha o campo ${rotulo.toLowerCase()}.`);
    if (tipo === 'email' && valor && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(valor)) {
      erros.push('Informe um e-mail válido.');
    }
    if (tipo === 'number' && valor && (!Number.isFinite(Number(valor)) || Number(valor) < 0)) {
      erros.push(`${rotulo} deve ser um número igual ou maior que zero.`);
    }
  }
  return erros;
}

// Extrai do body apenas os campos da entidade, já sem espaços extras
function extrairCampos(entidade, body) {
  const valores = {};
  entidades[entidade].campos.forEach(([chave]) => {
    valores[chave] = String(body[chave] ?? '').trim();
  });
  return valores;
}

module.exports = { validarCampos, extrairCampos };
