# 🔴 Pokédex — Aplicação React com PokéAPI

> Pokédex interativa construída com React + Vite, consumindo dados da [PokéAPI](https://pokeapi.co/). Explore Pokémon, veja estatísticas detalhadas, cadeias evolutivas e informações sobre cada tipo.

---

## 🌐 Acesso Online

👉 **[https://seu-usuario.vercel.app](https://seu-usuario.vercel.app)** ← *substitua pelo link gerado no deploy*

---

## 📸 Prints da Aplicação

### Página Inicial — Lista de Pokémon
![Home](./docs/screenshot-home.png)

### Filtro por Tipo
![Filtro](./docs/screenshot-filter.png)

### Detalhes do Pokémon
![Detalhe](./docs/screenshot-detail.png)

### Cadeia Evolutiva
![Evolução](./docs/screenshot-evolution.png)

### Página de Tipos
![Tipos](./docs/screenshot-types.png)

### Detalhes do Tipo
![Detalhe do Tipo](./docs/screenshot-type-detail.png)

> *Prints gerados após o deploy da aplicação. Substituir pelas imagens reais.*

---

## 🚀 Tecnologias Utilizadas

| Tecnologia | Versão | Descrição |
|---|---|---|
| [React](https://react.dev/) | 18.2 | Biblioteca principal para UI |
| [React Router DOM](https://reactrouter.com/) | 6.22 | Roteamento e rotas dinâmicas |
| [Vite](https://vitejs.dev/) | 5.1 | Bundler e servidor de desenvolvimento |
| [PokéAPI](https://pokeapi.co/) | v2 | API pública RESTful de Pokémon |
| CSS Modules (vanilla) | — | Estilização com variáveis CSS |
| Google Fonts | — | Fontes Press Start 2P + Nunito |

---

## 📁 Arquitetura da Aplicação

```
pokedex-app/
├── public/
│   └── pokeball.svg           # Favicon SVG
├── src/
│   ├── components/            # Componentes reutilizáveis
│   │   ├── Navbar.jsx         # Barra de navegação com NavLink
│   │   ├── PokemonCard.jsx    # Card clicável de Pokémon
│   │   ├── TypeBadge.jsx      # Badge colorido de tipo
│   │   └── LoadingSpinner.jsx # Animação de carregamento
│   ├── pages/                 # Páginas (uma por rota)
│   │   ├── Home.jsx           # Lista + busca + filtro por tipo
│   │   ├── PokemonDetail.jsx  # Detalhes (rota /pokemon/:id)
│   │   ├── TypesPage.jsx      # Grid de todos os tipos
│   │   ├── TypeDetail.jsx     # Pokémon por tipo (rota /types/:type)
│   │   └── NotFound.jsx       # Página 404
│   ├── services/
│   │   └── api.js             # Funções de chamada à PokéAPI
│   ├── utils/
│   │   └── typeColors.js      # Mapeamento de cores/ícones por tipo
│   ├── App.jsx                # Roteador principal (BrowserRouter)
│   ├── main.jsx               # Entry point React
│   └── index.css              # Estilos globais com CSS Variables
├── index.html                 # Template HTML
├── vite.config.js             # Configuração do Vite
├── package.json
└── .gitignore
```

---

## 🗺️ Diagrama de Arquitetura

```
┌─────────────────────────────────────────────────────────┐
│                      BROWSER                            │
│                                                         │
│  ┌────────────────────────────────────────────────┐     │
│  │              React App (Vite)                  │     │
│  │                                                │     │
│  │  ┌─────────┐   BrowserRouter                  │     │
│  │  │ Navbar  │   ┌──────────────────────────┐   │     │
│  │  └─────────┘   │        Routes            │   │     │
│  │                │                          │   │     │
│  │                │  /          → Home       │   │     │
│  │                │  /pokemon/:id→ Detail    │   │     │
│  │                │  /types     → TypesPage  │   │     │
│  │                │  /types/:type→ TypeDetail│   │     │
│  │                │  *          → NotFound   │   │     │
│  │                └──────────────────────────┘   │     │
│  │                                                │     │
│  │  ┌────────────────────────────────────────┐   │     │
│  │  │         Componentes Reutilizáveis      │   │     │
│  │  │  PokemonCard │ TypeBadge │ Loader      │   │     │
│  │  └────────────────────────────────────────┘   │     │
│  │                                                │     │
│  │  ┌────────────────────────────────────────┐   │     │
│  │  │           services/api.js              │   │     │
│  │  │  fetchPokemon | fetchType | etc.       │   │     │
│  │  └──────────────────┬─────────────────────┘   │     │
│  └─────────────────────┼──────────────────────────┘     │
└────────────────────────┼────────────────────────────────┘
                         │ HTTP (fetch)
                         ▼
          ┌──────────────────────────┐
          │   PokéAPI (pokeapi.co)   │
          │  /pokemon, /type,        │
          │  /pokemon-species,       │
          │  /evolution-chain        │
          └──────────────────────────┘
```

---

## 📌 Rotas Dinâmicas

| Rota | Componente | Descrição |
|---|---|---|
| `/` | `Home` | Lista paginada com busca e filtro por tipo |
| `/pokemon/:id` | `PokemonDetail` | Detalhes de um Pokémon pelo ID ou nome |
| `/types` | `TypesPage` | Grid com todos os 18 tipos |
| `/types/:type` | `TypeDetail` | Pokémon e relações de dano por tipo |
| `*` | `NotFound` | Página 404 |

---

## ✨ Funcionalidades

- 🔎 **Busca** por nome ou número do Pokémon
- 🎨 **Filtro por tipo** (18 tipos com cores temáticas)
- 📄 **Paginação** progressiva (carregar mais)
- 📊 **Estatísticas** com barra de progresso animada
- 🧬 **Cadeia evolutiva** com navegação entre formas
- 🛡️ **Relações de dano** por tipo (forte, fraco, imune, resistente)
- 🌐 **Navegação** entre Pokémon (anterior / próximo)
- 📱 **Responsivo** (mobile-first)

---

## ⚙️ Como Rodar Localmente

### Pré-requisitos

- [Node.js](https://nodejs.org/) v18 ou superior
- npm v9 ou superior (vem com o Node.js)

### Instalação

```bash
# 1. Clone o repositório
git clone https://github.com/seu-usuario/pokedex-app.git

# 2. Entre na pasta do projeto
cd pokedex-app

# 3. Instale as dependências
npm install

# 4. Inicie o servidor de desenvolvimento
npm run dev
```

A aplicação estará disponível em: **http://localhost:5173**

### Outros Comandos

```bash
# Gerar build de produção
npm run build

# Visualizar o build localmente
npm run preview
```

---

## ☁️ Deploy (Vercel)

Este projeto foi feito para deploy gratuito na [Vercel](https://vercel.com/).

### Passo a passo:

1. Faça push do projeto para o GitHub
2. Acesse [vercel.com](https://vercel.com) e faça login com GitHub
3. Clique em **"Add New Project"**
4. Selecione o repositório `pokedex-app`
5. As configurações são detectadas automaticamente (Vite)
6. Clique em **"Deploy"** 🚀

> Alternativas gratuitas: [Netlify](https://netlify.com), [GitHub Pages](https://pages.github.com/) (requer `base` no vite.config.js).

---

## 🎓 Informações Acadêmicas

- **Disciplina:** Desenvolvimento Web / Front-end
- **Atividade:** Trabalho Individual — Aplicação React com API Externa
- **Tecnologia principal:** React 18 + React Router v6
- **API utilizada:** [PokéAPI v2](https://pokeapi.co/) — pública, gratuita, sem autenticação

### Critérios atendidos:

| Critério | Status |
|---|---|
| Exibe dados de API externa | ✅ PokéAPI |
| Mais de uma página com rotas dinâmicas | ✅ 4 rotas (incluindo `/pokemon/:id` e `/types/:type`) |
| README com instruções de uso | ✅ Este documento |
| Tecnologias documentadas | ✅ Tabela de tecnologias |
| Desenho da arquitetura | ✅ Diagrama ASCII |
| Prints da aplicação | ✅ Pasta `/docs` |
| Link da aplicação online | ✅ Topo do README |
| Código versionado no GitHub | ✅ Commits organizados |

---

## 📄 Licença

Este projeto foi desenvolvido para fins educacionais.  
Pokémon © Nintendo / Game Freak. Dados via [PokéAPI](https://pokeapi.co/).
