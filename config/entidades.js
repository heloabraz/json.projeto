// Configuração das entidades do sistema.
// Cada entidade possui um arquivo JSON correspondente em data/<entidade>.json
// Cada campo segue o formato: [chave, rótulo exibido, tipo do input]
module.exports = {
  clientes: {
    titulo: 'Clientes',
    singular: 'cliente',
    descricao: 'Organize os dados das pessoas cadastradas.',
    campos: [['nome', 'Nome completo', 'text'], ['email', 'E-mail', 'email'], ['telefone', 'Telefone', 'tel']]
  },
  fornecedores: {
    titulo: 'Fornecedores',
    singular: 'fornecedor',
    descricao: 'Mantenha os contatos dos seus fornecedores em um só lugar.',
    campos: [['nome', 'Nome / Empresa', 'text'], ['email', 'E-mail', 'email'], ['telefone', 'Telefone', 'tel']]
  },
  produtos: {
    titulo: 'Produtos',
    singular: 'produto',
    descricao: 'Controle os produtos, preços e quantidades em estoque.',
    campos: [['nome', 'Nome do produto', 'text'], ['preco', 'Preço (R$)', 'number'], ['estoque', 'Estoque', 'number']]
  }
};
