const express = require('express');
const path = require('path');
const routes = require('./routes');

const app = express();
const PORT = process.env.PORT || 3000;

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

app.use(routes);

app.use((req, res) => res.status(404).send('Página não encontrada.'));

app.use((erro, req, res, next) => {
  console.error('Erro interno:', erro);
  if (res.headersSent) return next(erro);
  res.status(500).send('Ocorreu um erro interno. Verifique o terminal para mais detalhes.');
});

if (require.main === module) {
  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Sistema disponível em http://localhost:${PORT}`);
  });
}

module.exports = app;
