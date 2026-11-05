# Cadastro Simples — CRUD com JSON

## Nome do projeto
**Cadastro Simples** — sistema para cadastrar e organizar clientes, fornecedores e produtos.

## Integrantes
- Eloá Braz
- Isabela Barbosa

## Objetivo
A atividade teve como objetivo substituir os arrays que guardavam os registros dentro dos controllers por arquivos JSON na pasta `data/`. Assim, o sistema lê os dados dos arquivos e grava neles quando um cadastro é criado, editado ou excluído.

## Estrutura de pastas
```text
projetonodejs/
├── app.js
├── package.json
├── render.yaml
├── config/entidades.js
├── controllers/
│   ├── homeController.js
│   └── crudController.js
├── middlewares/entidadeValida.js
├── models/jsonModel.js
├── routes/index.js
├── utils/validacao.js
├── data/
│   ├── clientes.json
│   ├── fornecedores.json
│   └── produtos.json
├── public/style.css
└── views/
    ├── index.ejs
    ├── lista.ejs
    └── form.ejs
```

## Entidades utilizadas
- **Clientes:** nome, e-mail e telefone — `data/clientes.json`.
- **Fornecedores:** nome/empresa, e-mail e telefone — `data/fornecedores.json`.
- **Produtos:** nome, preço e estoque — `data/produtos.json`.

## Como os dados eram armazenados e como usamos JSON
Antes da mudança, os registros ficavam em arrays declarados nos controllers. Esses dados existiam somente enquanto o servidor estava rodando e podiam ser perdidos ao reiniciar a aplicação.

Para fazer a migração, criamos a pasta `data` e um arquivo JSON para cada entidade. Depois, retiramos os dados fixos dos controllers e criamos `models/jsonModel.js` para centralizar o acesso aos arquivos usando o módulo `fs` do Node.js:

- **Listar (Read):** `fs.readFileSync()` lê o arquivo e `JSON.parse()` transforma o conteúdo em dados que o JavaScript consegue utilizar.
- **Cadastrar (Create):** adiciona o novo registro à lista e grava o conteúdo atualizado com `JSON.stringify()` e `fs.writeFileSync()`.
- **Editar (Update):** localiza o registro pelo `id`, altera os campos e grava o arquivo novamente.
- **Excluir (Delete):** remove o registro pelo `id` e salva a lista atualizada.

Os controllers agora chamam as funções do model, em vez de manter os registros em arrays próprios. A gravação é feita por um arquivo temporário, que depois substitui o JSON original.

## Prompt utilizado
> Analise o CRUD em Node.js e Express que estou enviando. Migre o armazenamento dos dados que hoje ficam em arrays nos controllers para arquivos JSON dentro de uma pasta `data`, criando um arquivo para cada entidade. Implemente cadastro, listagem, edição e exclusão com leitura e gravação nos arquivos JSON. Mantenha as rotas e os formulários funcionando, organize a leitura e a gravação em um model separado e explique as alterações. Também sugira uma estilização simples, elegante e confortável, sem aparência exagerada ou artificial.

## Uso da Inteligência Artificial
Utilizamos o **ChatGPT** como apoio para entender a migração e organizar a implementação. A orientação recebida foi separar a responsabilidade de acessar os arquivos em um model (`jsonModel.js`), deixar os controllers responsáveis pelo fluxo das requisições e manter as entidades e validações organizadas em arquivos próprios.

A IA também sugeriu gerar IDs com base no maior ID já existente, validar os dados dos formulários e salvar primeiro em um arquivo temporário para reduzir o risco de corromper o JSON. Essas ideias foram aplicadas no projeto. Para a interface, usamos a orientação de manter um visual discreto, com tons suaves de verde-musgo, fundo claro e elementos bem espaçados. Usando o mesmo modelo de design do nosso último trabalho.

## Alterações realizadas
- Criamos `data/clientes.json`, `data/fornecedores.json` e `data/produtos.json`.
- Retiramos o armazenamento fixo dos controllers e centralizamos as operações no `models/jsonModel.js`.
- Mantivemos as operações de CRUD para as três entidades.
- Organizamos rotas, controllers, validações e configurações em pastas separadas.
- Ajustamos a apresentação visual com uma identidade mais leve e confortável.

## Ajustes feitos manualmente
Conferimos os nomes das entidades, os campos dos formulários, os caminhos das rotas e os arquivos JSON de exemplo. Também revisamos o README e a configuração de inicialização para publicação no Render. Antes da entrega, o grupo deve testar cadastro, edição e exclusão no navegador e conferir se cada arquivo JSON foi atualizado.

## Desafios encontrados
O principal cuidado foi garantir que cada operação lesse os dados atuais, alterasse o registro correto e gravasse novamente o arquivo sem perder os outros cadastros. Também foi necessário separar a lógica do CRUD para evitar repetição nos controllers.

## Link do repositório
https://github.com/heloabraz/json.projeto.git

## Conclusão
Com a migração, os dados deixaram de ficar apenas em arrays dentro dos controllers e passaram a ser lidos e gravados em arquivos JSON. O código ficou mais organizado e as três entidades continuam oferecendo cadastro, listagem, edição e exclusão. A IA ajudou com sugestões de estrutura e implementação, que foram revisadas e adaptadas ao projeto.
