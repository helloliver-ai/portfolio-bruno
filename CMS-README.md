# Estrutura de conteúdo

O Sanity (`production`) é a fonte principal dos projetos publicados em Work e Project. O arquivo `data/site-content.json` continua responsável por Home, About, configurações globais e fallback local caso a consulta ao Sanity falhe.

## Conteúdo global

- `site`: título, navegação, e-mail e localização usados por header e footer.
- `home`: headline, chamada para Work, contato e imagem usada pelo retrato de pontos.
- `about`: retrato, textos EN/PT, experiência, educação e links sociais.
- `work`: título e chamada para arquivos; a lista publicada vem do Sanity.
- `projects`: conteúdo local de fallback, identificado por `slug`.

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

## Integração com Sanity

O modo normal consulta publicamente o dataset `production` em runtime:

- `work.html` lista Projects publicados por `workOrder`;
- `project.html?slug=<slug>` renderiza o Project e seus content blocks;
- `project.html?slug=<slug>&sanity-preview=1` é reservado ao preview autenticado do Presentation.

URLs antigas com `cms=1` continuam compatíveis, mas o parâmetro não é necessário e não é gerado pelos links internos.

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

O Studio fica em `http://127.0.0.1:3333`. O servidor de preview lê `SANITY_API_READ_TOKEN` de `studio/.env.local`; esse arquivo é local e ignorado pelo Git. O bundle público não contém token e consulta somente documentos publicados.
