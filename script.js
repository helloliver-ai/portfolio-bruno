const CONTENT_URL = "data/site-content.json";
const MARQUEE_SPEED = 240;
const MARQUEE_REPEAT_COUNT = 4;
const PREVIEW_FADE_DELAY = 80;

document.addEventListener("DOMContentLoaded", async () => {
  try {
    const content = await loadSiteContent();

    renderSharedLayout(content);
    renderCurrentPage(content);
  } catch (error) {
    console.error("Não foi possível carregar o conteúdo do site.", error);
  }
});

async function loadSiteContent() {
  const response = await fetch(CONTENT_URL, {
    cache: "no-store",
  });

  if (!response.ok) {
    throw new Error(`Falha ao carregar ${CONTENT_URL}: ${response.status}`);
  }

  return response.json();
}

function getCurrentPage() {
  return document.body.dataset.page || "home";
}

function renderSharedLayout(content) {
  renderHeader(content.site);
  renderFooter(content.site);
}

function renderHeader(site) {
  const header = document.getElementById("site-header");

  if (!header) {
    return;
  }

  const currentPage = getCurrentPage();
  const homeNavigationLabels = {
    home: "HOME",
    work: "PROJECTS",
    about: "ABOUT + CONTACT",
  };
  const nav = document.createElement("nav");

  nav.className = "portfolio-nav";
  nav.setAttribute("aria-label", "Navegação principal");

  site.navigation.forEach((item) => {
    const link = document.createElement("a");

    link.href = item.url;
    link.className = "portfolio-nav__link";
    link.textContent = currentPage === "home"
      ? homeNavigationLabels[item.page] || item.label
      : item.label;

    if (item.page === currentPage || (currentPage === "project" && item.page === "work")) {
      link.setAttribute("aria-current", "page");
    }

    nav.appendChild(link);
  });

  header.replaceChildren(nav);
}

function renderFooter(site) {
  const footer = document.getElementById("site-footer");

  if (!footer) {
    return;
  }

  const currentPage = getCurrentPage();
  const footerInner = document.createElement("div");
  const footerLeft = document.createElement("div");
  const footerLinks = document.createElement("nav");
  const cta = document.createElement("a");

  footerInner.className = "footer-inner";
  footerLeft.className = "footer-left";
  footerLinks.className = "footer-links";
  footerLinks.setAttribute("aria-label", "Navegação do rodapé");

  footerLeft.append(
    createFooterText("footer-question", site.footer.question),
    createFooterText("footer-sub", site.footer.subtitle),
    createFooterArrow()
  );

  cta.href = createMailto(site.footer.email, site.footer.emailSubject);
  cta.className = "footer-cta";
  cta.id = "contact-email";
  cta.textContent = site.footer.ctaLabel;

  site.navigation.forEach((item) => {
    const link = document.createElement("a");

    link.href = item.url;
    link.className = "footer-nav-link";
    link.textContent = item.label;

    if (item.page === currentPage) {
      link.setAttribute("aria-current", "page");
    }

    footerLinks.appendChild(link);
  });

  footerInner.append(footerLeft, cta);
  footer.replaceChildren(footerInner, footerLinks);
}

function createFooterText(className, text) {
  const wrapper = document.createElement("span");
  const dot = document.createElement("span");

  wrapper.className = className;
  dot.className = "footer-dot";
  dot.setAttribute("aria-hidden", "true");

  wrapper.append(dot, document.createTextNode(text));
  return wrapper;
}

function createFooterArrow() {
  const arrow = document.createElement("span");

  arrow.className = "footer-arrow";
  arrow.setAttribute("aria-hidden", "true");
  arrow.textContent = "⟵";

  return arrow;
}

function createMailto(email, subject) {
  return `mailto:${email}?subject=${encodeURIComponent(subject)}`;
}

function renderCurrentPage(content) {
  const page = getCurrentPage();

  if (page === "home") {
    renderHome(content.home);
    return;
  }

  if (page === "work") {
    renderWorkPage(content.work);
    return;
  }

  if (page === "about") {
    renderAbout(content.about);
    return;
  }

  if (page === "project") {
    renderProjectPage(content.work);
  }
}

function renderHome(home) {
  const title = document.getElementById("home-hero-title");
  const portraitContainer = document.getElementById("portrait-points");

  if (title) {
    title.textContent = home.title;
  }

  if (portraitContainer) {
    portraitContainer.dataset.image = home.portraitImage;
  }
}

function renderAbout(about) {
  const title = document.getElementById("about-title");
  const textContainer = document.getElementById("about-text");

  document.title = "About | Bruno Oliveira";

  if (title) {
    title.innerHTML = "olá, sou o<br>bruno";
  }

  if (!textContainer) {
    return;
  }

  const fragment = document.createDocumentFragment();

  about.paragraphs.forEach((paragraph, index) => {
    const text = document.createElement("p");

    text.className = "about-text";
    if (index === 0) {
      const lead = document.createElement("strong");
      lead.textContent = "PT ";
      text.append(lead, document.createTextNode(paragraph));
    } else {
      text.textContent = paragraph;
    }
    fragment.appendChild(text);
  });

  textContainer.replaceChildren(fragment);
}

function renderWorkPage(work) {
  renderProjects(getPublishedProjects(work.projects || []));
  renderArchive(work.archive || [], work.miscUrl);
  setupProjectPreview();
  updateMarqueesWhenReady();
  window.addEventListener("resize", requestMarqueeUpdate);
}

function getPublishedProjects(projects) {
  return projects
    .filter((project) => project.published !== false)
    .sort((firstProject, secondProject) => {
      return (firstProject.order ?? Number.MAX_SAFE_INTEGER) -
        (secondProject.order ?? Number.MAX_SAFE_INTEGER);
    });
}

function renderProjects(projects) {
  const projectsList = document.getElementById("projects-list");
  const fragment = document.createDocumentFragment();

  if (!projectsList) {
    return;
  }

  projects.forEach((project) => {
    fragment.appendChild(createProjectItem(project));
  });

  projectsList.replaceChildren(fragment);
}

function createProjectItem(project) {
  const item = document.createElement("article");
  const meta = document.createElement("div");
  const titleRow = document.createElement("div");
  const bullet = document.createElement("span");

  item.className = "project-item";
  item.dataset.image = project.coverImage || "";
  item.dataset.title = project.title;

  meta.className = "project-meta-top";
  meta.append(
    createMetaField(project.category),
    createMetaField(project.client),
    createProjectStatus(project)
  );

  titleRow.className = "project-title-row";
  bullet.className = "project-bullet";
  bullet.setAttribute("aria-hidden", "true");

  titleRow.append(bullet, createProjectTitle(project));
  item.append(meta, titleRow);

  return item;
}

function createMetaField(text) {
  const field = document.createElement("span");

  field.className = "meta-field";
  field.textContent = text || "";

  return field;
}

function createProjectStatus(project) {
  const field = document.createElement("span");

  field.className = "meta-field";

  if (project.status === "comingSoon") {
    const badge = document.createElement("span");

    badge.className = "badge-status";
    badge.textContent = "ⓒⓞⓜⓘⓝⓖ ⓢⓞⓞⓝ";
    field.appendChild(badge);

    return field;
  }

  if (project.badge === "new") {
    const badge = document.createElement("span");

    badge.className = "badge-new";
    badge.textContent = "ⓝⓔⓦ";
    field.append(badge, document.createTextNode(` ${project.year || ""}`));

    return field;
  }

  field.textContent = project.year || "";
  return field;
}

function createProjectTitle(project) {
  const hasLink = Boolean(project.slug);
  const titleElement = document.createElement(hasLink ? "a" : "span");
  const marquee = document.createElement("div");

  titleElement.className = hasLink ? "project-title-link" : "project-title-link no-link";
  marquee.className = "marquee-wrapper";

  if (hasLink) {
    titleElement.href = `project.html?slug=${encodeURIComponent(project.slug)}`;
  }

  for (let index = 0; index < MARQUEE_REPEAT_COUNT; index += 1) {
    const text = document.createElement("span");

    text.className = "marquee-text";
    text.textContent = project.title;

    if (index > 0) {
      text.setAttribute("aria-hidden", "true");
    }

    marquee.appendChild(text);
  }

  titleElement.appendChild(marquee);
  return titleElement;
}

function renderProjectPage(work) {
  const root = document.getElementById("project-root");
  const projects = getPublishedProjects(work.projects || []);
  const slug = new URLSearchParams(window.location.search).get("slug");
  const project = projects.find((item) => item.slug === slug);

  if (!root) {
    return;
  }

  if (!project) {
    renderProjectNotFound(root);
    return;
  }

  document.title = `${project.title} | Bruno Oliveira`;

  const descriptionMeta = document.querySelector('meta[name="description"]');
  if (descriptionMeta && project.shortDescription) {
    descriptionMeta.content = project.shortDescription;
  }

  if (project.status === "placeholder") {
    renderProjectPlaceholder(root);
    return;
  }

  document.body.classList.remove("project-is-placeholder");
  root.replaceChildren(createProjectContent(project, projects));
}

function renderProjectNotFound(root) {
  document.title = "Projeto não encontrado | Bruno Oliveira";
  document.body.classList.add("project-is-placeholder");

  const section = document.createElement("section");
  const title = document.createElement("h1");
  const link = document.createElement("a");

  section.className = "project-placeholder";
  title.textContent = "projeto não encontrado";
  link.href = "work.html";
  link.textContent = "← voltar para Work";
  section.append(title, link);
  root.replaceChildren(section);
}

function renderProjectPlaceholder(root) {
  document.body.classList.add("project-is-placeholder");

  const section = document.createElement("section");
  const title = document.createElement("h1");
  const link = document.createElement("a");

  section.className = "project-placeholder";
  title.textContent = "gayzinha, para de procrastinar e vai preparar os seus projetos!";
  link.href = "work.html";
  link.textContent = "← voltar para Work";
  section.append(title, link);
  root.replaceChildren(section);
}

function createProjectContent(project, projects) {
  const article = document.createElement("article");
  const heading = document.createElement("header");
  const title = document.createElement("h1");
  const meta = document.createElement("dl");

  article.className = "project-case-study";
  heading.className = "project-case-study__header";
  title.className = "project-case-study__title";
  title.textContent = project.title;
  meta.className = "project-case-study__meta";

  appendProjectMeta(meta, "Category / categoria", project.category);
  appendProjectMeta(meta, "Client / cliente", project.client);
  appendProjectMeta(meta, "Year / ano", project.year);
  heading.append(title, meta);
  article.append(heading);

  if (project.coverImage) {
    article.append(createProjectImage(project.coverImage, project.title, "project-cover"));
  }

  if (Array.isArray(project.gallery) && project.gallery.length > 0) {
    article.append(createProjectGallery(project.gallery));
  }

  article.append(
    createProjectDescription(project),
    createProjectCredits(project.credits || []),
    createProjectNavigation(project, projects)
  );

  return article;
}

function appendProjectMeta(list, label, value) {
  if (!value) {
    return;
  }

  const group = document.createElement("div");
  const term = document.createElement("dt");
  const detail = document.createElement("dd");

  term.textContent = label;
  detail.textContent = value;
  group.append(term, detail);
  list.appendChild(group);
}

function createProjectImage(src, alt, className) {
  const figure = document.createElement("figure");
  const image = document.createElement("img");

  figure.className = className;
  image.src = src;
  image.alt = alt || "";
  image.loading = className === "project-cover" ? "eager" : "lazy";
  image.decoding = "async";
  figure.appendChild(image);

  return figure;
}

function createProjectGallery(gallery) {
  const section = document.createElement("section");

  section.className = "project-gallery";
  section.setAttribute("aria-label", "Galeria do projeto");

  gallery.forEach((item) => {
    const media = createProjectImage(item.src, item.alt, "project-media");

    if (item.layout === "full") {
      media.classList.add("project-media--full");
    }

    section.appendChild(media);
  });

  return section;
}

function createProjectDescription(project) {
  const section = document.createElement("section");
  const heading = document.createElement("h2");
  const english = document.createElement("div");
  const portuguese = document.createElement("div");
  const englishLabel = document.createElement("h3");
  const portugueseLabel = document.createElement("h3");
  const englishText = document.createElement("p");
  const portugueseText = document.createElement("p");

  section.className = "project-description";
  heading.textContent = "The project / O projeto";
  englishLabel.textContent = "EN";
  portugueseLabel.textContent = "PT";
  englishText.textContent = project.descriptionEn || "[Placeholder — add the final English project description.]";
  portugueseText.textContent = project.descriptionPt || "[Placeholder — adicionar o texto definitivo do projeto em português.]";
  english.append(englishLabel, englishText);
  portuguese.append(portugueseLabel, portugueseText);
  section.append(heading, english, portuguese);

  return section;
}

function createProjectCredits(credits) {
  const section = document.createElement("section");
  const safeCredits = credits.length > 0
    ? credits
    : [{ label: "Credits / créditos", value: "[Placeholder — adicionar créditos do projeto.]" }];

  section.className = "project-credits";
  section.setAttribute("aria-label", "Créditos do projeto");

  safeCredits.forEach((credit) => {
    const item = document.createElement("div");
    const label = document.createElement("h2");
    const value = document.createElement("p");

    label.textContent = credit.label;
    value.textContent = credit.value;
    item.append(label, value);
    section.appendChild(item);
  });

  return section;
}

function createProjectNavigation(project, projects) {
  const nav = document.createElement("nav");
  const currentIndex = projects.findIndex((item) => item.slug === project.slug);
  const previousProject = projects[(currentIndex - 1 + projects.length) % projects.length];
  const nextProject = projects[(currentIndex + 1) % projects.length];

  nav.className = "project-pagination";
  nav.setAttribute("aria-label", "Navegação entre projetos");
  nav.append(
    createProjectNavigationLink(previousProject, "←", "Projeto anterior"),
    createProjectNavigationLink(null, "↑", "Voltar para Work"),
    createProjectNavigationLink(nextProject, "→", "Próximo projeto")
  );

  return nav;
}

function createProjectNavigationLink(project, arrow, label) {
  const link = document.createElement("a");
  const icon = document.createElement("span");
  const text = document.createElement("span");

  link.href = project
    ? `project.html?slug=${encodeURIComponent(project.slug)}`
    : "work.html";
  link.setAttribute("aria-label", project ? `${label}: ${project.title}` : label);
  icon.textContent = arrow;
  text.textContent = label;
  link.append(icon, text);

  return link;
}

function renderArchive(items, miscUrl) {
  const archiveList = document.getElementById("archive-list");
  const miscLink = document.getElementById("misc-link");
  const fragment = document.createDocumentFragment();

  if (!archiveList) {
    return;
  }

  items.forEach((item) => {
    const listItem = document.createElement("li");
    const link = document.createElement("a");
    const arrow = document.createElement("span");
    const detail = document.createElement("span");

    link.href = item.url || "#";
    link.append(document.createTextNode(`${item.title} `));

    arrow.className = "arrow";
    arrow.setAttribute("aria-hidden", "true");
    arrow.textContent = "↳";

    detail.className = "archive-detail";
    detail.textContent = item.detail;

    link.append(arrow, document.createTextNode(" "), detail);
    listItem.appendChild(link);
    fragment.appendChild(listItem);
  });

  archiveList.replaceChildren(fragment);

  if (miscLink) {
    miscLink.href = miscUrl || "#";
  }
}

function setupProjectPreview() {
  const previewImg = document.getElementById("preview-img");
  const projectItems = document.querySelectorAll(".project-item");

  if (!previewImg || projectItems.length === 0) {
    return;
  }

  let currentItem = null;

  projectItems.forEach((item) => {
    item.addEventListener("mouseenter", () => {
      const imageUrl = item.dataset.image;

      if (!imageUrl) {
        return;
      }

      currentItem = item;
      previewImg.classList.remove("visible");

      window.setTimeout(() => {
        if (currentItem !== item) {
          return;
        }

        previewImg.src = imageUrl;
        previewImg.alt = `Prévia do projeto ${item.dataset.title || ""}`.trim();
        previewImg.classList.add("visible");
      }, PREVIEW_FADE_DELAY);
    });

    item.addEventListener("mouseleave", () => {
      currentItem = null;
      previewImg.classList.remove("visible");
    });
  });
}

function updateMarqueesWhenReady() {
  if (document.fonts && document.fonts.ready) {
    document.fonts.ready.then(updateMarquees);
    return;
  }

  requestMarqueeUpdate();
}

function requestMarqueeUpdate() {
  window.requestAnimationFrame(updateMarquees);
}

function updateMarquees() {
  document.querySelectorAll(".marquee-wrapper").forEach((marquee) => {
    const texts = marquee.querySelectorAll(".marquee-text");

    if (texts.length < 2) {
      return;
    }

    const distance = texts[1].offsetLeft - texts[0].offsetLeft;
    const duration = distance / MARQUEE_SPEED;

    marquee.style.setProperty("--marquee-distance", `${distance}px`);
    marquee.style.setProperty("--marquee-duration", `${Math.max(duration, 1)}s`);
  });
}
