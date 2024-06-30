document.addEventListener('DOMContentLoaded', function() {
    const calcularBtn = document.getElementById('calcularBtn');
    const homensInput = document.getElementById('homens');
    const mulheresInput = document.getElementById('mulheres');
    const criancasInput = document.getElementById('criancas');
    const personalizarBtn = document.getElementById('personalizarBtn');
    const salvarBtn = document.getElementById('salvarBtn');

    // Redirecionar para a página de personalização
    if(personalizarBtn) {
        personalizarBtn.addEventListener('click', function() {
            window.location.href = 'personalizar.html';
        });
    }

    // Adicionar event listeners para os botões de mais e menos
    const quantityFields = document.querySelectorAll('.quantity');

    quantityFields.forEach(field => {
        const input = field.querySelector('input');
        const btnPlus = field.querySelector('.btn-plus');
        const btnMinus = field.querySelector('.btn-minus');

        if(btnPlus && btnMinus) {
            btnPlus.addEventListener('click', function() {
                input.value = parseInt(input.value) + 1;
            });

            btnMinus.addEventListener('click', function() {
                const value = parseInt(input.value) - 1;
                input.value = value >= 0 ? value : 0;
            });
        }
    });

    // Event listener para o botão de calcular
    if(calcularBtn) {
        calcularBtn.addEventListener('click', function() {
            // Redirecionar para a página de resultado passando os dados via URL
            const homens = parseInt(homensInput.value) || 0;
            const mulheres = parseInt(mulheresInput.value) || 0;
            const criancas = parseInt(criancasInput.value) || 0;

            let selectedItems = JSON.parse(localStorage.getItem('selectedItems')) || {};

            // Se o usuário não personalizou os ingredientes, considerar todos os itens como padrão
            if (Object.keys(selectedItems).length === 0) {
                selectedItems = {
                    carne: true,
                    frango: true,
                    linguica: true, // Linguiça selecionada por padrão
                    refrigerante: true,
                    cerveja: true,
                };
            }

            let carne = 0, frango = 0, linguica = 0, refrigerante = 0, cerveja = 0;

            // Calcular as quantidades apenas para os itens selecionados
            if (selectedItems.carne) carne = (homens * 0.5) + (mulheres * 0.3) + (criancas * 0.2);
            if (selectedItems.frango) frango = (homens * 0.2) + (mulheres * 0.2) + (criancas * 0.1);
            if (selectedItems.linguica) linguica = (homens * 0.2) + (mulheres * 0.2) + (criancas * 0.2);
            if (selectedItems.refrigerante) refrigerante = (homens * 0.3) + (mulheres * 0.4) + (criancas * 0.2);
            if (selectedItems.cerveja) cerveja = (homens * 0.8) + (mulheres * 0.5);

            const queryParams = new URLSearchParams({
                homens,
                mulheres,
                criancas,
                carne: carne.toFixed(2),
                frango: frango.toFixed(2),
                linguica: linguica.toFixed(2),
                refrigerante: refrigerante.toFixed(2),
                cerveja: cerveja.toFixed(2),
            });

            window.location.href = `result.html?${queryParams.toString()}`;
        });
    }

    // Atualiza a classe dos botões de personalização conforme os itens selecionados anteriormente
    function updateButtonStates() {
        const selectedItems = JSON.parse(localStorage.getItem('selectedItems')) || {
            carne: true,
            frango: true,
            linguica: true, 
            refrigerante: true,
            cerveja: true,
        };

        const carneBtn = document.getElementById('carneBtn');
        const frangoBtn = document.getElementById('frangoBtn');
        const linguicaBtn = document.getElementById('linguicaBtn');
        const refrigeranteBtn = document.getElementById('refrigeranteBtn');
        const cervejaBtn = document.getElementById('cervejaBtn');

        if (carneBtn) carneBtn.classList.toggle('active', selectedItems.carne);
        if (frangoBtn) frangoBtn.classList.toggle('active', selectedItems.frango);
        if (linguicaBtn) linguicaBtn.classList.toggle('active', selectedItems.linguica);
        if (refrigeranteBtn) refrigeranteBtn.classList.toggle('active', selectedItems.refrigerante);
        if (cervejaBtn) cervejaBtn.classList.toggle('active', selectedItems.cerveja);
    }

    // Adiciona ou remove a seleção ao clicar nos botões de personalização
    document.querySelectorAll('.toggle-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            const itemId = this.id.replace('Btn', '');
            const selectedItems = JSON.parse(localStorage.getItem('selectedItems')) || {
                carne: true,
                frango: true,
                linguica: true, 
                refrigerante: true,
                cerveja: true,
            };

            selectedItems[itemId] = !selectedItems[itemId];
            this.classList.toggle('active', selectedItems[itemId]);
            localStorage.setItem('selectedItems', JSON.stringify(selectedItems));
        });
    });

    
    updateButtonStates();

    // Event listener para o botão de salvar e voltar
    if(salvarBtn) {
        salvarBtn.addEventListener('click', function() {
            window.location.href = 'index.html';
        });
    }
});
