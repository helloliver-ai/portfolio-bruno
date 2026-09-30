# Estrutura CMS-ready

O conteúdo editável do site está centralizado em `data/site-content.json`. Hoje o arquivo funciona como fonte local; futuramente pode ser substituído por uma resposta de CMS mantendo os mesmos componentes de apresentação.

## Conteúdo global

- `site`: título, navegação, e-mail e localização usados por header e footer.
- `home`: headline, chamada para Work, contato e imagem usada pelo retrato de pontos.
- `about`: retrato, textos EN/PT, experiência, educação e links sociais.
- `work`: título, chamada para arquivos e lista ordenada de projetos.
- `projects`: conteúdo completo de cada projeto, identificado por `slug`.

## Modelo de projeto

Cada item de `projects` pode fornecer:

```txt
slug
title
client
projectType
year
cover
gallery[]
credits
descriptionPt
descriptionEn
```

`project.html?slug=<slug>` encontra o registro correspondente, monta a galeria, créditos e textos, e calcula anterior/próximo a partir da ordem dos dados. Slots sem mídia ou texto permanecem vazios sem quebrar o grid.

## Integração futura

`script.js` e `portrait-points.js` leem `data/site-content.json`. Uma integração com CMS pode preservar o formato e trocar apenas a origem do carregamento, ou publicar o mesmo JSON durante o build. O markup das páginas permanece estrutural e não contém conteúdo de projeto hardcoded.
