# Modelo de Portfólio Limpo (Template) - Bruno Oliveira

Este é um modelo em branco (template) otimizado da página de portfólio "Work" inspirada no site de referência. Toda a informação pessoal e arquivos originais foram removidos e substituídos por dados de exemplo e imagens locais genéricas.

As animações de marquee, o efeito elástico do cursor flutuante e a responsividade mobile foram preservadas.

## 📂 Estrutura do Projeto

*   `index.html`: Contém a estrutura de navegação, a tabela de projetos genérica (Breno: alterei os nomes das seções para fazer um menu como o exemplo), a seção de arquivos antigos e as redes sociais.
*   `style.css`: Controla o design visual, cores, fontes (Inter e Syne do Google Fonts) e animações responsivas (Breno: estou configurando o tamanho e caracteristicas do navbar).
*   `script.js`: Implementa o efeito premium da imagem flutuante seguindo o cursor do mouse de forma suave (lerp).
*   `assets/`: Pasta contendo as imagens geométricas geradas que servem como pré-visualização padrão (`placeholder-1.png` a `placeholder-4.png`).

---

## 🛠️ Como Personalizar o Portfólio

Para colocar as informações reais do seu irmão, edite o arquivo `index.html`: BRENO: Futuramenbte vou precisar configurar um CMS para ele poder adicionar, remover e substituir infomrações do proprio site

### 1. Alterar o Nome no Cabeçalho
Procure por:
```html
<a href="#" id="nav-logo">SEU NOME</a>
BRENO: removi o nome do cabeçalho
```
Substitua `SEU NOME` pelo nome do seu irmão. Altere também no `<title>` da página. (REMOVIDO)

### 2. Adicionar ou Editar Projetos
Cada linha da tabela de projetos é representada por uma div com a classe `project-row`. 
Exemplo de linha de projeto:

```html
<div class="project-row" role="listitem" data-image="assets/placeholder-1.png">
  <div class="project-col col-category">Design Gráfico + Editorial</div>
  <div class="project-col col-star"><span class="star-icon">★</span></div>
  <div class="project-col col-title">
    <a href="#" class="project-link">
      <div class="marquee-wrapper">
        <span class="marquee-text">Projeto de Exemplo 01</span>
        <span class="marquee-text" aria-hidden="true">Projeto de Exemplo 01</span>
        <span class="marquee-text" aria-hidden="true">Projeto de Exemplo 01</span>
        <span class="marquee-text" aria-hidden="true">Projeto de Exemplo 01</span>
      </div>
    </a>
  </div>
  <div class="project-col col-client">Editora Exemplo</div>
  <div class="project-col col-year"><span class="badge-new">ⓝⓔⓦ</span> 2025 — 26</div>
</div>
```

**Para personalizar:**
*   **Imagem de fundo (Preview):** Altere o valor do atributo `data-image="..."` para o caminho da imagem correspondente dentro da pasta `assets/`. Exemplo: `assets/projeto1.jpg` ou `assets/projeto1.png`.
*   **Categoria:** Altere o texto dentro de `<div class="project-col col-category">`.
*   **Nome do Projeto:** Altere o texto dos 4 blocos `<span class="marquee-text">` (mantenha os 4 iguais para que a animação lateral funcione perfeitamente).
*   **Link do Projeto:** Altere o `href="#"` do link para a página do projeto ou troque por `<span>` com a classe `project-link no-click` caso seja apenas demonstrativo e não tenha link.
*   **Cliente & Ano:** Altere os textos correspondentes nas colunas de cliente e ano.

### 3. Substituir as Imagens de Pré-visualização
Coloque os arquivos de imagem ou GIFs reais do seu irmão dentro da pasta `assets/` e atualize os atributos `data-image` no `index.html`.

### 4. Configurar E-mail e Redes Sociais
Vá até a parte inferior (footer) do arquivo `index.html`:
*   **E-mail:** Altere o link `mailto:` para o e-mail real:
    `href="mailto:emaildoirmao@provedor.com?subject=Olá!"`
*   **Instagram & Behance:** Altere o `href` dos links sociais para os perfis reais:
    `href="https://www.instagram.com/usuario/"`

---

## 💻 Como Visualizar Localmente
Basta dar um duplo clique no arquivo `index.html` para abri-lo em qualquer navegador. 

Se quiser rodar em um servidor local de desenvolvimento para testar o comportamento em tempo real, você pode abrir este diretório no terminal e rodar:
```bash
# Se tiver o Node instalado:
npx serve .
# Ou usando Python:
python3 -m http.server 8000
```
Depois, acesse `http://localhost:8000` no seu navegador.
