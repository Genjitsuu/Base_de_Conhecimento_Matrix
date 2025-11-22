// --- Elementos do DOM ---
const cardContainer = document.getElementById("card-container");
const inputBusca = document.getElementById("input-busca");
const formBusca = document.getElementById("form-busca");

let todasLinguagens = [];

// --- Utilitários ---
const normalizarTexto = (texto) => {
    return texto.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();
};

function debounce(func, delay) {
    let timer;
    return (...args) => {
        clearTimeout(timer);
        timer = setTimeout(() => { func.apply(this, args); }, delay);
    };
}

// --- Lógica Principal ---

async function carregarDados() {
  cardContainer.innerHTML = `<p class="feedback-mensagem">Inicializando sistema...</p>`;
  try {
    const resposta = await fetch("data.json");
    if (!resposta.ok) throw new Error(`Erro: ${resposta.status}`);
    todasLinguagens = await resposta.json();
    renderizarCards(todasLinguagens);
  } catch (erro) {
    console.error(erro);
    cardContainer.innerHTML = `<p class="erro-mensagem">⚠️ Falha na conexão com a base de dados.</p>`;
  }
}

function iniciarBusca() {
  if (!inputBusca) return;
  const termo = normalizarTexto(inputBusca.value.trim());

  if (termo === "") {
    renderizarCards(todasLinguagens);
    return;
  }

  const dadosFiltrados = todasLinguagens.filter(dado => {
    const nome = normalizarTexto(dado.nome);
    const descricao = normalizarTexto(dado.descricao);
    // Verifica também se o termo está nas tags
    const tagsMatch = dado.tags && dado.tags.some(tag => normalizarTexto(tag).includes(termo));
    
    return nome.includes(termo) || descricao.includes(termo) || tagsMatch;
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

  dados.forEach(dado => {
    const article = document.createElement("article");
    article.classList.add("card");
    
    // Gera HTML das tags
    const tagsHtml = dado.tags 
        ? `<div class="tags-container">${dado.tags.map(t => `<span class="tag">${t}</span>`).join('')}</div>` 
        : '';

    // Gera imagem se houver
    const imgHtml = dado.logo 
        ? `<img src="${dado.logo}" alt="Logo ${dado.nome}" class="card-logo" loading="lazy">` 
        : '';

    article.innerHTML = `
      <div class="card-header">
         ${imgHtml}
         <h2>${dado.nome} <span class="card-year">[${dado.ano_lancamento}]</span></h2>
      </div>
      ${tagsHtml}
      <p>${dado.descricao}</p>
      <a href="${dado.link}" target="_blank" rel="noopener noreferrer" class="card-link">Acessar documentação >></a>
    `;
    fragment.appendChild(article);
  });
  
  cardContainer.appendChild(fragment);
}

// Listeners
if (formBusca) {
    formBusca.addEventListener('submit', (e) => { e.preventDefault(); iniciarBusca(); });
}
if (inputBusca) {
    inputBusca.addEventListener('input', debounce(iniciarBusca, 300));
}
document.addEventListener('DOMContentLoaded', carregarDados);


/* --------------------------------------------------
   EFEITO MATRIX RAIN (OTIMIZADO)
   -------------------------------------------------- */
const canvas = document.getElementById('matrix-bg');
const ctx = canvas.getContext('2d');

let width, height;
let columns;
let rainDrops = [];
const fontSize = 16;

const katakana = 'アァカサタナハマヤャラワガザダバパイィキシチニヒミリヰギジヂビピウゥクスツヌフムユュルグズブヅプエェケセテネヘメレヱゲゼデベペオォコソトノホモヨョロヲゴゾドボポヴッン';
const latin = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
const nums = '0123456789';
const alphabet = katakana + latin + nums;

// Configura tamanho e colunas
const resizeCanvas = () => {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
    columns = Math.floor(width / fontSize);
    
    // Reinicia array de gotas, preservando posições se possível (opcional, aqui reseto para simplicidade)
    rainDrops = [];
    for (let x = 0; x < columns; x++) {
        rainDrops[x] = Math.floor(Math.random() * -20); // Começam em alturas variadas acima da tela
    }
};

const drawMatrix = () => {
    // Fundo translúcido para rastro
    ctx.fillStyle = 'rgba(47, 25, 47, 0.05)'; 
    ctx.fillRect(0, 0, width, height);

    ctx.fillStyle = '#82ee82'; // Verde
    ctx.font = fontSize + 'px monospace';

    for (let i = 0; i < rainDrops.length; i++) {
        const text = alphabet.charAt(Math.floor(Math.random() * alphabet.length));
        const x = i * fontSize;
        const y = rainDrops[i] * fontSize;

        ctx.fillText(text, x, y);

        // Reinicia a gota randomicamente após sair da tela
        if (y > height && Math.random() > 0.975) {
            rainDrops[i] = 0;
        }
        rainDrops[i]++;
    }
};

// Controle de FPS (30fps)
let lastTime = 0;
const fps = 30;
const nextFrame = 1000 / fps;
let timer = 0;

function animate(timeStamp) {
    const deltaTime = timeStamp - lastTime;
    lastTime = timeStamp;

    if (timer > nextFrame) {
        drawMatrix();
        timer = 0;
    } else {
        timer += deltaTime;
    }
    requestAnimationFrame(animate);
}

// Inicialização
window.addEventListener('resize', resizeCanvas);
resizeCanvas();
animate(0);
