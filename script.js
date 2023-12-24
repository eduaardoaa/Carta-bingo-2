// Adicione este link no cabeçalho do seu HTML:
// <script src="https://cdn.jsdelivr.net/npm/sweetalert2@11"></script>

function gerarCartela() {
    Swal.fire({
        title: 'Tem certeza que deseja gerar uma nova cartela?',
        showCancelButton: true,
        confirmButtonText: 'Sim',
        cancelButtonText: 'Não',
    }).then((result) => {
        if (result.isConfirmed) {
            const bingoCard = document.getElementById("bingo-card");
            bingoCard.innerHTML = "";

            const numeros = gerarNumeros();
            const numerosOrdenados = [...numeros].sort((a, b) => a - b);

            for (let i = 0; i < 25; i++) {
                const bingoNumber = document.createElement("div");
                bingoNumber.classList.add("bingo-number");
                bingoNumber.textContent = numerosOrdenados[i];
                bingoNumber.addEventListener("click", marcarNumero);
                bingoCard.appendChild(bingoNumber);
            }

            const newCardButton = document.getElementById("new-card-button");
            newCardButton.textContent = "Gerar Nova Cartela";
            newCardButton.onclick = gerarCartela;

            // Limpar mensagem de ganho
            const message = document.getElementById("message");
            message.textContent = "";
            message.style.display = "none";
        }
    });
}

// Gerar 500 tipos diferentes de cartelas
for (let i = 0; i < 500; i++) {
    gerarCartela();
}

function gerarNumeros() {
    const numeros = new Set();

    while (numeros.size < 25) {
        const numero = Math.floor(Math.random() * 99) + 1;
        numeros.add(numero);
    }

    return Array.from(numeros);
}

function marcarNumero(event) {
    const bingoNumber = event.target;
    bingoNumber.classList.toggle("marked");

    // Verificar se todos os números estão marcados
    const markedNumbers = document.querySelectorAll('.marked');
    if (markedNumbers.length === 25) {
        exibirMensagemVitoria();
    }
}

function exibirMensagemVitoria() {
    const message = document.getElementById("message");
    message.textContent = "Parabéns, você ganhou!";
    message.style.display = "block";
}

// Chamar a função para gerar a cartela inicial
gerarCartela();
