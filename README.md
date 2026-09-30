# Portfolio Bruno

Implementação estática do portfólio de Bruno Oliveira, reconstruída a partir do Figma atual. O projeto usa HTML, CSS e JavaScript sem framework e mantém conteúdo e apresentação separados para facilitar uma futura integração com CMS.

## Páginas

- `index.html`: Home e hero interativo.
- `about.html`: About, contato, experiência, educação e links sociais.
- `work.html`: listagem de projetos.
- `project.html?slug=<slug>`: template reutilizável de projeto.

## Estrutura

- `data/site-content.json`: fonte única de conteúdo.
- `script.js`: componentes compartilhados, renderização e navegação.
- `style.css`: sistema visual e responsividade.
- `portrait-points.js`: retrato interativo da Home.
- `assets/`: imagens, mídia de projetos e ícones do Figma.

Slots vazios em Work e Project são intencionais: eles preservam a estrutura visual prevista para receber conteúdo futuro do CMS sem introduzir dados fictícios.

## Executar localmente

```bash
python3 -m http.server 8000
```

Acesse `http://127.0.0.1:8000`.
