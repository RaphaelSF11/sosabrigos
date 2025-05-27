// Dados de exemplo dos abrigos (em produção, você buscaria de uma API)
const shelters = [
    {
        id: 1,
        name: "Abrigo - 010 Central",
        address: "Rua Principal, 123 - Centro",
        capacity: 85, // porcentagem
        resources: ["Água", "Alimentos", "Roupas"],
        lat: -23.5505,
        lng: -46.6333,
        contact: "abrigocentral@email.com"
    },
    {
        id: 2,
        name: "Abrigo - 011 Zona Norte",
        address: "Av. Norte, 456 - Zona Norte",
        capacity: 60,
        resources: ["Água", "Medicamentos"],
        lat: -23.5000,
        lng: -46.6000,
        contact: "abrigonorte@email.com"
    },
    {
        id: 3,
        name: "Abrigo - 012 Zona Sul",
        address: "Rua Sul, 789 - Zona Sul",
        capacity: 95,
        resources: ["Cobertores", "Alimentos"],
        lat: -23.6000,
        lng: -46.6500,
        contact: "abrigosul@email.com"
    }
];

// Inicializa o mapa
const map = L.map('map').setView([-23.5505, -46.6333], 12);

// Adiciona o tile layer do OpenStreetMap
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);

// Ícones personalizados
const shelterIcon = L.icon({
    iconUrl: 'https://cdn0.iconfinder.com/data/icons/small-n-flat/24/678111-map-marker-512.png',
    iconSize: [32, 32],
    iconAnchor: [16, 32],
    popupAnchor: [0, -32]
});

// Adiciona marcadores para cada abrigo
const markers = [];
shelters.forEach(shelter => {
    const marker = L.marker([shelter.lat, shelter.lng], { icon: shelterIcon })
        .addTo(map)
        .bindPopup(`
            <h3>${shelter.name}</h3>
            <p><strong>Endereço:</strong> ${shelter.address}</p>
            <p><strong>Ocupação:</strong> ${shelter.capacity}%</p>
            <p><strong>Recursos:</strong> ${shelter.resources.join(', ')}</p>
            <p><strong>Contato:</strong> ${shelter.contact}</p>
        `);

    markers.push(marker);
});

// Preenche a lista de abrigos na sidebar
const shelterList = document.getElementById('shelter-list');
shelters.forEach(shelter => {
    const shelterItem = document.createElement('div');
    shelterItem.className = 'shelter-item';

    // Determina a classe de capacidade
    let capacityClass = 'low';
    if (shelter.capacity > 80) capacityClass = 'high';
    else if (shelter.capacity > 50) capacityClass = 'medium';

    shelterItem.innerHTML = `
        <h3>${shelter.name}</h3>
        <p>${shelter.address}</p>
        <p>Ocupação: <span class="capacity ${capacityClass}">${shelter.capacity}%</span></p>
    `;

    // Adiciona evento de clique para focar no marcador
    shelterItem.addEventListener('click', () => {
        map.setView([shelter.lat, shelter.lat], 15);
        markers.find(m => m.getLatLng().lat === shelter.lat).openPopup();
    });

    shelterList.appendChild(shelterItem);
});

// Opcional: Ajusta o zoom para mostrar todos os marcadores
if (markers.length > 0) {
    const group = new L.featureGroup(markers);
    map.fitBounds(group.getBounds().pad(0.2));
}