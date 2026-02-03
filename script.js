// Caminho da imagem do quebra-cabeça
const imgPath = "imagem/Reciclagem.jpg"; // Substitua pela sua imagem
 
const puzzleContainer = document.getElementById("puzzle-container");
const verificarBtn = document.getElementById("verificar");
const resultado = document.getElementById("resultado");
 
// Criar lista de posições corretas
let positions = [];
for (let i = 0; i < 9; i++) positions.push(i);
positions = positions.sort(() => Math.random() - 0.5);
 
function criarPecas() {
    puzzleContainer.innerHTML = "";
 
    positions.forEach((pos, index) => {
        const piece = document.createElement("div");
        piece.classList.add("piece");
        piece.setAttribute("draggable", true);
        piece.dataset.position = pos;
 
        const row = Math.floor(pos / 3) * -100;
        const col = (pos % 3) * -100;
 
        piece.style.backgroundImage = `url('${imgPath}')`;
        piece.style.backgroundPosition = `${col}px ${row}px`;
 
        puzzleContainer.appendChild(piece);
    });
 
    ativarDragAndDrop();
}
 
function ativarDragAndDrop() {
    const pieces = document.querySelectorAll(".piece");
 
    pieces.forEach(piece => {
        piece.addEventListener("dragstart", e => {
            e.dataTransfer.setData("text", e.target.dataset.position);
            e.dataTransfer.setData("index", [...pieces].indexOf(e.target));
        });
    });
 
    pieces.forEach(piece => {
        piece.addEventListener("dragover", e => e.preventDefault());
 
        piece.addEventListener("drop", e => {
            let fromIndex = e.dataTransfer.getData("index");
            let toIndex = [...pieces].indexOf(e.target);
 
            const temp = positions[fromIndex];
            positions[fromIndex] = positions[toIndex];
            positions[toIndex] = temp;
 
            criarPecas();
        });
    });
}
 
verificarBtn.addEventListener("click", () => {
    const correto = positions.every((val, i) => val === i);
 
    if (correto) {
        descricaoBox.classList.remove("hidden");
        resultado.textContent = "Muito bem! Agora descreva a imagem 🌱✨";
    } else {
        resultado.textContent = "Ainda não está certo! Continue tentando 😄";
    }
});
 
// Botão de enviar descrição
const opcoesBox = document.getElementById("opcoes-box");
const opcoes = document.querySelectorAll(".opcao");
 
// Quando o jogador montar o quebra-cabeça corretamente
verificarBtn.addEventListener("click", () => {
    const correto = positions.every((val, i) => val === i);
 
    if (correto) {
        opcoesBox.classList.remove("hidden");
        resultado.textContent = "Muito bem! Agora escolha a resposta correta 🌱✨";
    } else {
        resultado.textContent = "Ainda não está certo! Continue tentando 😄";
    }
});
 
// Resposta certa: A
opcoes.forEach(op => {
    op.addEventListener("click", () => {
        if (op.dataset.resposta === "A") {
            resultado.textContent = "Parabéns! Você acertou! 💚♻️";
        } else {
            resultado.textContent = "Quase! Tente novamente 😊";
        }
    });
});
 
criarPecas();