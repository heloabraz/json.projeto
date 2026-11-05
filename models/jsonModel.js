// Camada de acesso aos dados: toda leitura e gravação passa por aqui.
// Substitui os antigos vetores (arrays) que ficavam dentro dos controllers.
const fs = require('fs');
const path = require('path');

const DATA_DIR = path.join(__dirname, '..', 'data');
fs.mkdirSync(DATA_DIR, { recursive: true });

function caminho(entidade) {
  return path.join(DATA_DIR, `${entidade}.json`);
}

// READ: lê o arquivo JSON a cada chamada (cria o arquivo vazio se não existir)
function listar(entidade) {
  const arquivo = caminho(entidade);
  if (!fs.existsSync(arquivo)) fs.writeFileSync(arquivo, '[]', 'utf8');

  try {
    const dados = JSON.parse(fs.readFileSync(arquivo, 'utf8'));
    return Array.isArray(dados) ? dados : [];
  } catch (erro) {
    console.error(`Não foi possível ler ${arquivo}:`, erro);
    return [];
  }
}

// Grava o vetor completo no arquivo. Escreve em arquivo temporário e renomeia,
// evitando deixar o JSON corrompido caso a gravação seja interrompida.
function salvar(entidade, dados) {
  const arquivo = caminho(entidade);
  const temporario = `${arquivo}.tmp`;
  fs.writeFileSync(temporario, JSON.stringify(dados, null, 2), 'utf8');
  fs.renameSync(temporario, arquivo);
}

function buscarPorId(entidade, id) {
  return listar(entidade).find(registro => String(registro.id) === String(id)) || null;
}

// CREATE: gera o próximo id, adiciona o registro e grava no JSON
function criar(entidade, valores) {
  const dados = listar(entidade);
  const proximoId = dados.length ? Math.max(...dados.map(item => Number(item.id) || 0)) + 1 : 1;
  const novoItem = { id: proximoId, ...valores };
  dados.push(novoItem);
  salvar(entidade, dados);
  return novoItem;
}

// UPDATE: substitui os campos do registro e grava no JSON
function atualizar(entidade, id, valores) {
  const dados = listar(entidade);
  const indice = dados.findIndex(registro => String(registro.id) === String(id));
  if (indice === -1) return null;
  dados[indice] = { id: dados[indice].id, ...valores };
  salvar(entidade, dados);
  return dados[indice];
}

// DELETE: remove o registro e grava o vetor restante no JSON
function excluir(entidade, id) {
  const dados = listar(entidade);
  const restantes = dados.filter(registro => String(registro.id) !== String(id));
  if (restantes.length === dados.length) return false;
  salvar(entidade, restantes);
  return true;
}

module.exports = { listar, buscarPorId, criar, atualizar, excluir };
