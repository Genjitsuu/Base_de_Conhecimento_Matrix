// Variáveis do DOM
const cardContainer = document.getElementById("card-container");
const inputBusca = document.getElementById("input-busca");
const formBusca = document.getElementById("form-busca");

// Variável para armazenar os dados
let todasLinguagens = [];

// Normaliza texto
const normalizarTexto = (texto) => {
    return texto.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();
};

// Debounce
function debounce(func, delay) {
    let timer;
    return (...args) => {
        clearTimeout(timer);
        timer = setTimeout(() => { func.apply(this, args); }, delay);
    };
}

/* --- Lógica de Negócio (Busca e Renderização) --- */

async function carregarDados() {
  cardContainer.innerHTML = `<p class="feedback-mensagem">Inicializando sistema...</p>`;
  try {
    const resposta = await fetch("data.json");
    if (!resposta.ok) throw new Error(`Erro: ${resposta.status}`);
    todasLinguagens = await resposta.json();
    renderizarCards(todasLinguagens);
  } catch (erro) {
    console.error("Falha no sistema:", erro);
    cardContainer.innerHTML = `<p class="erro-mensagem">⚠️ Falha na conexão com a base de dados.</p>`;
  }
}

function iniciarBusca() {
  if (!inputBusca) return;
  const termo = normalizarTexto(inputBusca.value.trim());

  const dadosFiltrados = todasLinguagens.filter(dado => {
    const nome = normalizarTexto(dado.nome);
    const descricao = normalizarTexto(dado.descricao);
    return nome.includes(termo) || descricao.includes(termo);
  });
  renderizarCards(dadosFiltrados);
}

function renderizarCards(dados) {
  cardContainer.innerHTML = ""; 
  if (dados.length === 0) {
    cardContainer.innerHTML = `<p class="feedback-mensagem">Nenhum registro encontrado no sistema.</p>`;
    return;
  }
  
  const fragment = document.createDocumentFragment();

  for (let dado of dados) {
    const article = document.createElement("article");
    article.classList.add("card");
    article.innerHTML = `
      <h2>${dado.nome} <span class="card-year">[${dado.ano_lancamento}]</span></h2>
      <p>${dado.descricao}</p>
      <a href="${dado.link}" target="_blank" rel="noopener noreferrer">Acessar documentação >></a>
    `;
    fragment.appendChild(article);
  }
  cardContainer.appendChild(fragment);
}

// Listeners
if (formBusca) {
    formBusca.addEventListener('submit', (event) => {
        event.preventDefault();
        iniciarBusca();
    });
}
if (inputBusca) {
    inputBusca.addEventListener('input', debounce(iniciarBusca, 300));
}
document.addEventListener('DOMContentLoaded', carregarDados);


/* --------------------------------------------------
   EFEITO MATRIX RAIN (CANVAS)
   -------------------------------------------------- */
const canvas = document.getElementById('matrix-bg');
const ctx = canvas.getContext('2d');

// Define o tamanho do canvas igual ao da janela
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

// Caracteres que cairão (Katakana + Alfabeto + Números)
const katakana = 'アァカサタナハマヤャラワガザダバパイィキシチニヒミリヰギジヂビピウゥクスツヌフムユュルグズブヅプエェケセテネヘメレヱゲゼデベペオォコソトノホモヨョロヲゴゾドボポヴッン';
const latin = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
const nums = '0123456789';
const alphabet = katakana + latin + nums;

const fontSize = 16;
const columns = canvas.width / fontSize;

// Array de quedas (uma por coluna)
const rainDrops = [];
for (let x = 0; x < columns; x++) {
    rainDrops[x] = 1;
}

// Função que desenha a chuva
const drawMatrix = () => {
    // Pinta o fundo de preto (ou roxo escuro da sua paleta) com pouca opacidade
    // Isso cria o rastro (trail) das letras
    // Usando seu roxo escuro: #2f192f (rgb: 47, 25, 47)
    ctx.fillStyle = 'rgba(47, 25, 47, 0.05)'; 
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Cor do texto (Seu verde: #82ee82)
    ctx.fillStyle = '#82ee82';
    ctx.font = fontSize + 'px monospace';

    for (let i = 0; i < rainDrops.length; i++) {
        // Escolhe um caractere aleatório
        const text = alphabet.charAt(Math.floor(Math.random() * alphabet.length));
        
        // Desenha o caractere
        ctx.fillText(text, i * fontSize, rainDrops[i] * fontSize);

        // Reseta a gota para o topo aleatoriamente após cruzar a tela
        if (rainDrops[i] * fontSize > canvas.height && Math.random() > 0.975) {
            rainDrops[i] = 0;
        }
        
        // Incrementa a posição Y
        rainDrops[i]++;
    }
};

// Animação em loop (30fps para ficar mais cinematográfico)
setInterval(drawMatrix, 33);

// Redimensiona o canvas se a janela mudar de tamanho
window.addEventListener('resize', () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
});
