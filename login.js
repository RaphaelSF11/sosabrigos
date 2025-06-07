// Dados de usuários (simulando um "banco de dados")
const users = [
    {
        username: "admin",
        password: "admin123",
        role: "admin",
        name: "Administrador"
    },
    {
        username: "gestor",
        password: "gestor123",
        role: "manager",
        name: "Gestor Regional"
    },
    {
        username: "visualizador",
        password: "visual123",
        role: "viewer",
        name: "Visualizador"
    }
];

// Níveis de acesso e suas permissões
const roles = {
    admin: {
        name: "Administrador",
        permissions: ["dashboard", "abrigos", "recursos", "usuarios", "relatorios", "configuracoes"],
        redirect: "painel.html"
    },
    manager: {
        name: "Gestor",
        permissions: ["dashboard", "abrigos", "recursos"],
        redirect: "painel.html"
    },
    viewer: {
        name: "Visualizador",
        permissions: ["dashboard"],
        redirect: "painel.html"
    }
};

document.getElementById('login-form').addEventListener('submit', function (e) {
    e.preventDefault();

    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    const messageEl = document.getElementById('login-message');

    // Limpar mensagens anteriores
    messageEl.textContent = '';
    messageEl.className = 'message';

    // Verificar credenciais
    const user = users.find(u => u.username === username && u.password === password);

    if (user) {
        // Login bem-sucedido
        messageEl.textContent = `Bem-vindo, ${user.name}! Redirecionando...`;
        messageEl.classList.add('success');

        // Salvar dados do usuário no sessionStorage
        sessionStorage.setItem('currentUser', JSON.stringify({
            username: user.username,
            name: user.name,
            role: user.role,
            permissions: roles[user.role].permissions
        }));

        // Redirecionar após 1 segundo
        setTimeout(() => {
            window.location.href = roles[user.role].redirect;
        }, 1000);
    } else {
        // Login falhou
        messageEl.textContent = 'Usuário ou senha incorretos!';
        messageEl.classList.add('error');
    }
});

// Verificar se já está logado ao carregar a página
window.addEventListener('DOMContentLoaded', () => {
    const currentUser = sessionStorage.getItem('currentUser');
    if (currentUser) {
        window.location.href = 'painel.html';
    }
});