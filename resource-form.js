document.addEventListener('DOMContentLoaded', function () {
    // Mostrar campo "Outro" quando selecionado
    const resourceType = document.getElementById('resource-type');
    const customResource = document.getElementById('custom-resource');

    resourceType.addEventListener('change', function () {
        customResource.style.display = this.value === 'outro' ? 'block' : 'none';
        if (this.value !== 'outro') customResource.value = '';
    });

    // Carregar abrigos disponíveis (simulação)
    const shelterSelect = document.getElementById('resource-shelter');

    // Simulação de dados - na prática, você buscaria de uma API
    const shelters = [
        { id: 1, name: 'Abrigo Central - Centro' },
        { id: 2, name: 'Abrigo Zona Norte' },
        { id: 3, name: 'Abrigo Zona Sul' },
        { id: 4, name: 'Abrigo Universitário' },
        { id: 5, name: 'Ginásio Municipal' }
    ];

    shelters.forEach(shelter => {
        const option = document.createElement('option');
        option.value = shelter.id;
        option.textContent = shelter.name;
        shelterSelect.appendChild(option);
    });

    // Validação e envio do formulário
    const form = document.getElementById('resource-form');

    form.addEventListener('submit', function (e) {
        e.preventDefault();

        // Validação adicional
        if (resourceType.value === 'outro' && !customResource.value.trim()) {
            alert('Por favor, especifique o tipo de recurso');
            return;
        }

        // Obter os valores do formulário
        const resourceData = {
            type: resourceType.value === 'outro' ? customResource.value : resourceType.value,
            quantity: document.getElementById('resource-quantity').value,
            shelterId: shelterSelect.value,
            shelterName: shelterSelect.options[shelterSelect.selectedIndex].text,
            donor: document.getElementById('resource-donor').value || 'Não informado',
            expiry: document.getElementById('resource-expiry').value || null,
            notes: document.getElementById('resource-notes').value,
            dateAdded: new Date().toLocaleString('pt-BR')
        };

        // Aqui você normalmente enviaria para uma API ou banco de dados
        console.log('Dados do recurso a ser salvo:', resourceData);

        // Simulação de sucesso
        alert('Recurso cadastrado com sucesso!');

        // Redirecionar de volta para o painel após 1 segundo
        setTimeout(() => {
            window.location.href = 'index.html';
        }, 1000);
    });
});