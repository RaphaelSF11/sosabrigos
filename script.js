// Dados dos recursos
const resources = [
    {
        name: "Água (litros)",
        available: 5000,
        needed: 10000,
        lastUpdate: "27/05/2025 10:30"
    },
    {
        name: "Alimentos (kg)",
        available: 2500,
        needed: 5000,
        lastUpdate: "27/05/2025 09:45"
    },
    {
        name: "Cobertores",
        available: 1200,
        needed: 3000,
        lastUpdate: "27/05/2025 11:15"
    },
    {
        name: "Kits Médicos",
        available: 800,
        needed: 1500,
        lastUpdate: "27/05/2025 08:20"
    },
    {
        name: "Máscaras",
        available: 3500,
        needed: 2000,
        lastUpdate: "26/05/2025 16:40"
    }
];

// Função para carregar dados na tabela
function loadResourcesTable() {
    const tableBody = document.getElementById("resources-data");

    resources.forEach(resource => {
        const row = document.createElement("tr");

        // Determinar classe com base na necessidade
        const isCritical = resource.available < resource.needed * 0.5;

        row.innerHTML = `
            <td>${resource.name}</td>
            <td class="${isCritical ? 'critical' : ''}">${resource.available.toLocaleString()}</td>
            <td>${resource.needed.toLocaleString()}</td>
            <td>${resource.lastUpdate}</td>
            <td>
                <button class="action-btn edit"><i class="fas fa-edit"></i></button>
                <button class="action-btn delete"><i class="fas fa-trash"></i></button>
            </td>
        `;

        tableBody.appendChild(row);
    });
}

// Atualizar hora da última atualização em tempo real
function updateTime() {
    const now = new Date();
    const options = {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
    };
    document.getElementById("update-time").textContent = now.toLocaleDateString('pt-BR', options);
}

// Simular atualização de dados em tempo real
function simulateRealTimeUpdates() {
    setInterval(() => {
        // Atualizar alguns dados aleatoriamente
        const randomResource = Math.floor(Math.random() * resources.length);
        const changeAmount = Math.floor(Math.random() * 200) - 100; // -100 a +100

        resources[randomResource].available += changeAmount;
        resources[randomResource].lastUpdate = new Date().toLocaleString('pt-BR', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });

        // Recarregar tabela
        document.getElementById("resources-data").innerHTML = "";
        loadResourcesTable();

        // Atualizar hora
        updateTime();
    }, 30000); // Atualiza a cada 30 segundos
}

// Inicialização
document.addEventListener("DOMContentLoaded", () => {
    loadResourcesTable();
    updateTime();
    simulateRealTimeUpdates();

    // Adicionar evento de clique para o menu lateral
    const menuItems = document.querySelectorAll(".menu li");
    menuItems.forEach(item => {
        item.addEventListener("click", function () {
            menuItems.forEach(i => i.classList.remove("active"));
            this.classList.add("active");
        });
    });
});