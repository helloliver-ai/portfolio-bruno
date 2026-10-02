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

## Integração experimental com Sanity

Na branch local `cms-live-integration`, o modo normal continua lendo `data/site-content.json`. O parâmetro `cms=1` ativa leitura pública em runtime do dataset `production`:

- `work.html?cms=1` lista Projects publicados por `workOrder`;
- `project.html?slug=<slug>&cms=1` renderiza o Project e seus content blocks;
- `project.html?slug=<slug>&sanity-preview=1` é reservado ao preview autenticado do Presentation.

Para iniciar o ambiente local:

```sh
cd studio
npm run build:preview
npm run preview
```

O Portfolio fica em `http://127.0.0.1:8080`. Em outro terminal, inicie o Studio:

```sh
cd studio
npm run dev -- --host 127.0.0.1
```

O Studio fica em `http://127.0.0.1:3333`. O servidor de preview lê `SANITY_API_READ_TOKEN` de `studio/.env.local`; esse arquivo é local e ignorado pelo Git. O bundle público usado por `cms=1` não contém token e consulta somente documentos publicados.
