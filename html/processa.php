<?php
// Configurações para conexão com o banco de dados
$servidor = "localhost";
$usuario = "root"; // Usuário padrão do MySQL no XAMPP
$senha = "";       // Senha padrão do MySQL no XAMPP (geralmente em branco)
$banco = "diagnostico"; // Nome do banco de dados

// Criando a conexão
$conexao = new mysqli($servidor, $usuario, $senha, $banco);

// Verifica se a conexão foi bem-sucedida
if ($conexao->connect_error) {
    die("Falha na conexão com o banco de dados: " . $conexao->connect_error);
}

// Recebendo dados do formulário
$nome = $_POST['nome'];
$cargo = $_POST['cargo'];
$email = $_POST['email'];
$senha = $_POST['senha']; // Nota: Para produção, as senhas devem ser criptografadas com password_hash().

// Verificando se todos os campos foram preenchidos
if (empty($nome) || empty($cargo) || empty($email) || empty($senha)) {
    die("Por favor, preencha todos os campos.");
}

// Inserindo os dados na tabela usuarios
$sql = "INSERT INTO usuarios (nome, cargo, email, senha) VALUES ('$nome', '$cargo', '$email', '$senha')";

if ($conexao->query($sql) === TRUE) {
    echo "Usuário cadastrado com sucesso!";
} else {
    echo "Erro ao cadastrar o usuário: " . $conexao->error;
}

// Fechando a conexão
$conexao->close();
?>
