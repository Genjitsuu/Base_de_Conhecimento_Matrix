# 🟩 Base de Conhecimento - Matrix Edition

![Project Status](https://img.shields.io/badge/status-conclu%C3%ADdo-success)
![License](https://img.shields.io/badge/license-MIT-blue)

> Uma interface interativa estilo "Cyberpunk/Hacker" para explorar e filtrar conhecimentos sobre linguagens de programação.

## 🖥️ Sobre o Projeto

Este projeto é uma **Single Page Application (SPA)** simples que consome dados de um arquivo JSON para renderizar informações sobre linguagens de programação. O foco principal foi o desenvolvimento de uma interface imersiva utilizando **HTML5 Canvas** para recriar o clássico efeito de "chuva digital" do filme Matrix, combinado com elementos de UI modernos como Glassmorphism e Neon Glow.

### ✨ Funcionalidades

* **Busca em Tempo Real:** Filtragem instantânea (com *debounce*) por nome ou descrição da linguagem.
* **Consumo de API:** Os dados são carregados assincronamente via `fetch` a partir de um arquivo JSON local.
* **Efeito Matrix:** Fundo animado renderizado via Canvas API com caracteres Katakana, latinos e numéricos.
* **Design Responsivo:** Layout adaptável para desktops, tablets e mobile.
* **Temática Visual:** Paleta de cores Neon Green & Dark Purple com efeitos de vidro fosco.

## 🛠️ Tecnologias Utilizadas

* **HTML5:** Estrutura semântica e Canvas.
* **CSS3:** Variáveis CSS (`:root`), Flexbox, Animações (`keyframes`), Backdrop-filter e Media Queries.
* **JavaScript (ES6+):** * Manipulação do DOM.
    * `Async/Await` para requisições.
    * Lógica de renderização dinâmica.
    * Manipulação de Canvas 2D.
* **Google Gemini:** Geração de alguns conteúdos e melhorias no código base

## 👀 Resultado final
   
   **Site hospedado no GitHub:**
     https://genjitsuu.github.io/Base_de_Conhecimento_Matrix/ 

## 🚀 Como Rodar o Projeto

1. **Clone o repositório:**
   ```bash
   git clone https://github.com/Genjitsuu/Base_de_Conhecimento_Matrix.git

2. **Abra o projeto:**
Como o projeto utiliza fetch para ler um arquivo JSON, navegadores modernos podem bloquear a requisição por segurança (CORS) se você abrir o index.html diretamente clicando duas vezes.

**Opção A (VS Code - Recomendado):**
* Instale a extensão **Live Server**
* Clique com o botão direito no index.html e escolha "Open with Live Server".

**Opção B (Python):**
* No terminal, dentro da pasta do projeto:
  ```bash
  python -m http.server 8000
* Acesse http://localhost:8000 no navegador.

## 🎨 Paleta de Cores

| Cor | Hex | Uso |
|-----|-----|-----|
| Verde Neon | #82ee82 | Destaques, Bordas, Texto Matrix |
| Roxo Escuro | #2f192f | Base do Background |
| Glass BG | rgba (47, 25, 47, 0.85) | Fundo dos Cards |
| Creme | #fbfbe6 | Texto Principal |

## 📄 Licença

Este projeto está sob a licença MIT. Sinta-se livre para usar e modificar.

<p align="center">
Feito com 💜 e ☕ por <a href="https://br.linkedin.com/in/thiago-t-amaro-5aa286231">Thiago T. Amaro</a>
</p>
