# Imersao Front-end 2026: Clone estiloso da Netflix

Este projeto e um mini-universo de streaming em duas telas:

1. Selecao de perfil na home.
2. Catalogo com carrosseis, cards interativos e preview de trailer.

A proposta mistura estudo de HTML/CSS/JS com foco em experiencia visual e organizacao de codigo em modulos.

## O que voce encontra aqui

- Tela inicial com perfis e escolha de tema claro/escuro.
- Persistencia do tema com localStorage.
- Persistencia do perfil ativo (nome + imagem) com localStorage.
- Tela de catalogo montada dinamicamente via JavaScript.
- Componentizacao simples com modulos ES (Card + Carousel + Utils + Data).

## Estrutura do projeto

```text
imersao_frontend/
|- index.html
|- styles.css
|- js/
|  |- index.js
|- catalogo/
|  |- catalogo.html
|  |- catalogo.css
|  |- js/
|     |- main.js
|     |- data.js
|     |- utils.js
|     |- components/
|        |- Card.js
|        |- Carousel.js
|- assets/
```

## Fluxo geral da aplicacao

1. Usuario abre a home em index.html.
2. index.js aplica o tema salvo (ou respeita preferencia do sistema).
3. Ao clicar em um perfil, index.js salva nome e imagem do perfil ativo.
4. Usuario e redirecionado para catalogo/catalogo.html.
5. catalogo/js/main.js le o perfil ativo e atualiza header (nome + avatar).
6. main.js percorre as categorias de data.js e injeta os carrosseis na pagina.

## Funcoes principais (analise rapida)

### Home: js/index.js

- getPreferredTheme()
  - Busca theme-preference no localStorage.
  - Se nao existir, usa prefers-color-scheme.

- applyTheme(theme)
  - Escreve data-theme no elemento root.
  - Persiste o tema em theme-preference.
  - Atualiza atributos de acessibilidade do botao (aria-pressed e aria-label).

- toggleTheme()
  - Alterna entre dark e light.

- saveActiveProfile()
  - Escuta clique em cada .profile.
  - Captura figcaption e src da imagem.
  - Salva em perfilAtivoNome e perfilAtivoImagem.

Escolha tecnica: manter toda persistencia no navegador com localStorage evita backend para este escopo de estudo e simplifica o fluxo entre paginas.

### Catalogo: catalogo/js/main.js

- No DOMContentLoaded:
  - Le perfilAtivoNome e perfilAtivoImagem.
  - Atualiza .kids-link e .profile-icon quando houver dados.
  - Monta o conteudo principal com categories.

Escolha tecnica: renderizar o catalogo por dados (array de objetos) facilita extensao de novas categorias sem mexer no HTML base.

### Dados: catalogo/js/data.js

- Exporta categories com title e items.
- Cada item pode ter:
  - img
  - youtube
  - top10
  - badge e badgeColor
  - progress

Escolha tecnica: separar conteudo (data.js) da renderizacao (componentes) melhora manutencao e legibilidade.

### Utilitarios: catalogo/js/utils.js

- getYouTubeId(url): extrai id do YouTube para embed.
- getRandomMatchScore(): gera percentual entre 80 e 99.
- getRandomDuration(hasProgress): alterna entre temporadas e duracao em horas/min.
- getRandomAgeBadge(): cria selo etario com variacao visual.

Escolha tecnica: concentrar regras pequenas reutilizaveis em utilitarios evita duplicacao dentro dos componentes.

### Componentes: catalogo/js/components

- Carousel.js
  - createCarousel(category): cria secao, titulo, indicadores e linha de cards.

- Card.js
  - createCard(item): cria card com imagem, iframe, detalhes e botoes.
  - Hover com atraso para autoplay de trailer no YouTube.
  - Controle de origem de transform (left/right) para evitar clipping nas bordas.
  - Limpeza do iframe no mouseleave para interromper o video.

Escolha tecnica: comportamento de hover foi pensado para impacto visual sem disparar video acidentalmente em micro-passadas do mouse (delay de 600ms).

## Escolhas de interface e experiencia

- Home com identidade forte:
  - Tipografia Bebas Neue + Montserrat.
  - Fundo com camadas de gradiente e glow.
  - Cartoes de perfil com elevacao no hover.

- Catalogo inspirado em streaming real:
  - Navbar fixa.
  - Fileiras horizontais de cards.
  - Card expandido com acoes e metadados.

- Acessibilidade e usabilidade:
  - Uso de aria-label/aria-pressed no toggle de tema.
  - Contraste e foco visual no tema claro e escuro.

## Como executar

Como e um projeto front-end estatico, voce pode abrir index.html direto no navegador.

Se preferir um servidor local (recomendado para evitar restricoes de caminho):

```bash
# Exemplo com VS Code Live Server
# Clique com o botao direito em index.html e escolha "Open with Live Server"
```

## Melhorias futuras sugeridas

1. Persistir tambem o ultimo card assistido por perfil.
2. Adicionar fallback para imagem de perfil ausente no catalogo.
3. Criar testes de utilitarios (getYouTubeId, badges, duracao).
4. Suportar navegacao por teclado nos cards com foco visivel.
5. Externalizar textos para facilitar internacionalizacao.

## Creditos

Projeto de estudo da Imersao Front-end (Alura), customizado com identidade visual propria e modularizacao em JavaScript moderno.
