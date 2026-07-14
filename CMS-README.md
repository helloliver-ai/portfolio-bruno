# Estrutura CMS-ready

Esta versão foi organizada para ter uma fonte única de conteúdo em:

```txt
data/site-content.json
```

Hoje esse arquivo funciona como um CMS local. No futuro, ele pode ser substituído por um endpoint real de CMS sem mudar a estrutura das páginas.

## Como o conteúdo está dividido

- `site`: nome do site, descrição, navegação e rodapé.
- `home`: título da Home e imagem usada pela animação de pontos.
- `about`: título, descrição e textos da página About.
- `work`: descrição, projetos principais, archive e link `misc`.

## Arquivos de página

As páginas HTML agora são estruturais:

- `index.html`
- `work.html`
- `about.html`

Elas mantêm o layout base e os containers com `id`, mas o conteúdo editável vem do JSON.

## Scripts

- `script.js`: carrega `data/site-content.json`, monta header, footer, Home, Work e About.
- `portrait-points.js`: carrega a imagem do retrato definida em `home.portraitImage`.

## Como conectar um CMS real depois

Troque a constante abaixo em `script.js`:

```js
const CONTENT_URL = "data/site-content.json";
```

Por exemplo:

```js
const CONTENT_URL = "https://seu-cms.com/api/site-content";
```

Faça o mesmo em `portrait-points.js`, ou mantenha o mesmo caminho se o CMS publicar um JSON estático.

## Observação importante

Como esta versão ainda é HTML/CSS/JS puro, o conteúdo é renderizado no navegador. Para SEO mais forte no futuro, o ideal é usar esse mesmo JSON para gerar HTML estático no build ou usar um CMS que publique arquivos estáticos.
