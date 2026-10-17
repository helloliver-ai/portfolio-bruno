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

## Composição bilíngue

Não existe idioma ativo ou toggle. Texto PT e EN são independentes e podem aparecer juntos. O padrão visual de PT é preto/normal e de EN é laranja/itálico. `Editorial style` permite somente Black, White, Orange, Italic e Bold; campos não definidos usam o padrão. No Portable Text, os decorators continuam aplicando os estilos dos trechos.

`Credits PT` e `Credits EN` são listas independentes. Os créditos antigos continuam disponíveis em `Legacy credits` e aparecem como PT até que a lista PT seja definida. `Credits PT: []` esconde os créditos antigos. O título expansível usa ambas as versões em itálico.

Alt PT/EN permanecem separados. Um único atributo HTML `alt` usa PT primeiro, ou EN quando só ele existe; imagens decorativas usam `alt=""`. As validações de acessibilidade anteriores foram preservadas. Captions de imagens e Vimeo mostram todos os idiomas preenchidos.

## About & contact

O item `About & contact` abre o documento único `aboutPage`. Ao criá-lo, os campos iniciais preservam os contatos e entradas do JSON local. E-mail permite editar label, label da lista social e destino `mailto:`. WhatsApp aceita URL ou número internacional; LinkedIn e Behance aceitam URL. Destinos inexistentes continuam vazios.

Experiência e Educação são listas reordenáveis com conteúdo somente PT. Os headings mantêm campos PT/EN e overrides editoriais. O frontend usa o documento publicado; quando ele não existe ou o CMS está indisponível, usa o JSON. Não é necessário migrar nem republicar os Projects existentes.

## Testes locais

Em `studio/`, execute `npm run typecheck`, `npm test`, `npm run build:preview` e `npm run build`. `npm run preview` funciona sem `.env.local` para conteúdo publicado; o token continua obrigatório apenas para draft preview autenticado pelo Presentation.

Se 8080 estiver ocupado, `PORT=8081 npm run preview` serve o HTML e os metadados em 8081. Consultas diretas do navegador ao Sanity dependem das origens CORS já autorizadas: use 8080 para a revisão visual quando 8081 não estiver autorizada. Não amplie CORS apenas para executar os testes.

## Search & sharing no Cloudflare

O template estático sozinho não entrega metadados por slug. A Pages Function em `functions/_middleware.js` atende apenas `/project` e `/project.html` e insere title, description, canonical, Open Graph e Twitter Card no HTML da resposta, consultando somente documentos publicados. Não depende de JavaScript do crawler nem de token privado.

Imagem social: `seo.shareImage`, depois `thumbnail.image`, depois `cover.image`. A URL pública do Sanity transforma a imagem em JPEG de 1200 × 630. Canonical e `og:url` usam `https://portfolio-bruno.pages.dev/project?slug=...`, sem parâmetros de preview. Um futuro domínio próprio pode ser configurado em `SITE_URL` no Cloudflare.

Para testar a Function sem publicar, rode `npx wrangler pages dev . --port 8788 --compatibility-date=2026-10-01` na raiz e leia o HTML bruto de `http://localhost:8788/project?slug=instituto-hahaha-10-anos` com curl ou View Source. O frontend nesta porta também depende de CORS Sanity; testar o HTML bruto não executa JS.

Na futura publicação, o Cloudflare precisa incluir `functions/` e `_routes.json` via Git integration ou Wrangler Pages; upload exclusivamente estático pelo painel não inclui Functions. Nenhum deploy foi realizado nesta alteração. A confirmação do card real do WhatsApp exige publicar esta Function e uma nova consulta do crawler; previews antigos podem permanecer em cache.
