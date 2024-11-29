const express = require('express');
const mysql = require('mysql2');
const path = require('path');
require('dotenv').config();

const app = express();
const port = 3000;

// Configuração do banco de dados
const db = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE
});

// Middleware para parse do corpo da requisição
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Servindo arquivos estáticos
app.use('/html', express.static(path.join(__dirname, 'html')));
app.use('/css', express.static(path.join(__dirname, 'css')));
app.use('/imagens', express.static(path.join(__dirname, 'imagens')));

// Rota para servir o arquivo home.html
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'html', 'home.html'));
});

// Rota para servir o arquivo upload_amostra.html
app.get('/upload_amostra', (req, res) => {
    res.sendFile(path.join(__dirname, 'html', 'upload_amostra.html'));
  });

// Rota para servir o arquivo relatorio.html
app.get('/relatorio', (req, res) => {
    res.sendFile(path.join(__dirname, 'html', 'relatorio.html'));
  });

// Rota para servir o arquivo registro.html
app.get('/registro', (req, res) => {
  res.sendFile(path.join(__dirname, 'html', 'registro.html'));
});

// Rota para servir o arquivo historico.html
app.get('/historico', (req, res) => {
  res.sendFile(path.join(__dirname, 'html', 'historico.html'));
});

// Rota para receber os dados do formulário de cadastro
app.post('/cadastrar', (req, res) => {
  const { nome, cargo, email, senha } = req.body;

  db.query('INSERT INTO usuarios (nome, cargo, email, senha) VALUES (?, ?, ?, ?)', 
    [nome, cargo, email, senha], (err, results) => {
      if (err) {
        return res.status(500).send('Erro ao cadastrar o usuário');
      }
      res.send('Usuário cadastrado com sucesso!');
    });
});

// Rota para processar o login
app.post('/login', (req, res) => {
  const { email, senha } = req.body;

  if (!email || !senha) {
    return res.send('Por favor, preencha todos os campos!');
  }

  const query = 'SELECT * FROM usuarios WHERE email = ?';
  db.query(query, [email], (err, result) => {
    if (err) {
      return res.send('Erro ao verificar o login!');
    }

    if (result.length > 0) {
      // Comparando a senha diretamente
      if (result[0].senha === senha) {
        // Redireciona para a página de histórico
        res.redirect('/historico');
      } else {
        res.send('Senha incorreta.');
      }
    } else {
      res.send('Email incorreto.');
    }
  });
});

// Iniciando o servidor
app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`);
});
