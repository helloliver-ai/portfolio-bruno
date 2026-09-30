const CONTENT_URL = "data/site-content.json";
const PAGE_NAV_ICON = "assets/icons/page-nav.svg";
const EXTERNAL_ARROW_ICON = "assets/icons/arrow-ne.svg";
const DOWN_ARROW_ICON = "assets/icons/arrow-down.svg";
const WORK_VISIBLE_ROWS = 5;

document.addEventListener("DOMContentLoaded", async () => {
  try {
    const content = await loadSiteContent();
    renderHeader(content.site);
    renderFooter(content.site);
    renderPage(content);
  } catch (error) {
    console.error("Não foi possível carregar o conteúdo do site.", error);
    renderLoadError();
  }
});

async function loadSiteContent() {
  const response = await fetch(CONTENT_URL, { cache: "no-store" });
  if (!response.ok) throw new Error(`Falha ao carregar ${CONTENT_URL}: ${response.status}`);
  return response.json();
}

function getCurrentPage() {
  return document.body.dataset.page || "home";
}

function renderPage(content) {
  const page = getCurrentPage();
  if (page === "home") renderHome(content.home, content.site);
  if (page === "about") renderAbout(content.about, content.site);
  if (page === "work") renderWork(content.work);
  if (page === "project") renderProject(content.work);
}

function renderHeader(site) {
  const header = document.getElementById("site-header");
  if (!header) return;

  const currentPage = getCurrentPage();
  const nav = createElement("nav", "portfolio-nav");
  nav.setAttribute("aria-label", "Navegação principal");

  (site.navigation || []).forEach((item) => {
    const link = createElement("a", "portfolio-nav__link", item.label);
    const isCurrent = item.page === currentPage ||
      (currentPage === "project" && item.page === "work");
    link.href = item.url;
    if (isCurrent) link.setAttribute("aria-current", "page");
    nav.appendChild(link);
  });

  header.replaceChildren(nav);
}

function renderFooter(site) {
  const footer = document.getElementById("site-footer");
  if (!footer) return;

  const email = site.footer?.email || "contato@olabruno.com";
  const link = createElement("a", "site-footer__email", email);
  link.href = createMailto(email, site.footer?.emailSubject);
  footer.replaceChildren(link);
}

function renderHome(home, site) {
  const portrait = document.getElementById("portrait-points");
  const identity = document.getElementById("home-identity");
  const title = document.getElementById("home-hero-title");

  if (portrait) portrait.dataset.image = home.portraitImage || "";

  if (title && home.hero) {
    const eyebrow = createElement("span", "", home.hero.eyebrow || "hey, I am/");
    const name = createElement("strong", "", home.hero.name || "olá, sou o bruno =)");
    title.replaceChildren(eyebrow, name);
  }

  if (identity) {
    const email = site.footer?.email || "contato@olabruno.com";
    const lines = home.identity || ["graphic designer", email, "19° 55' S 43° 56' O"];
    lines.forEach((line, index) => {
      if (index === 1 && line.includes("@")) {
        const emailLink = createElement("a", "", line);
        emailLink.href = createMailto(line);
        identity.appendChild(emailLink);
      } else {
        identity.appendChild(document.createTextNode(line));
      }
      if (index < lines.length - 1) identity.appendChild(document.createElement("br"));
    });
  }
}

function renderAbout(about, site) {
  const root = document.getElementById("about-page");
  if (!root) return;

  const intro = createElement("section", "about-intro");
  const title = createElement("h1", "about-hero-title");
  const eyebrow = createElement("span", "about-hero-title__eyebrow", about.hero?.eyebrow || "");
  const name = createElement("strong", "about-hero-title__name", about.hero?.name || "");
  const photo = createElement("figure", "about-photo");
  const image = document.createElement("img");
  const bios = createElement("div", "about-bios");
  const contactBelow = createElement("button", "pill-button about-contact-below", about.ctas?.contactBelow || "CONTACT BELOW ↓");

  title.append(eyebrow, name);
  image.src = about.photo || "";
  image.alt = about.photoAlt || "";
  photo.appendChild(image);
  bios.append(createBiography("en", about.bio?.en), createBiography("pt", about.bio?.pt));
  contactBelow.type = "button";
  contactBelow.addEventListener("click", () => {
    document.getElementById("contact")?.scrollIntoView({ behavior: "smooth", block: "start" });
  });
  intro.append(photo, title, bios, contactBelow);

  const lower = createElement("section", "about-lower");
  const contactColumn = createElement("div", "about-contact-column");
  const identity = createAboutIdentity(about.contact);
  const createCta = createElement("a", "pill-button about-create-cta", about.ctas?.create || "");
  const socialList = createSocialList(about.socials || []);
  const backTop = createPageNavLink("#top", "up", "Voltar ao topo");
  const professional = createElement("div", "about-professional");

  createCta.href = createMailto(about.contact?.email || site.footer?.email, "Vamos criar algo juntos");
  backTop.classList.add("about-back-top");
  professional.append(createExperience(about.experience), createEducation(about.education));
  contactColumn.append(identity, createCta, socialList, backTop);
  lower.append(contactColumn, professional);
  root.replaceChildren(intro, lower);
}

function createBiography(language, content = {}) {
  const article = createElement("article", `about-bio about-bio--${language}`);
  const first = document.createElement("p");
  const label = createElement("strong", "about-bio__label", content.label || language.toUpperCase());
  const second = createElement("p", "", content.detail || "");
  first.append(label, document.createTextNode(content.lead ? ` ${content.lead}` : ""));
  article.append(first, second);
  return article;
}

function createAboutIdentity(contact = {}) {
  const identity = createElement("p", "about-identity");
  const lines = [`/${contact.role || ""}`, contact.city || "", contact.region || ""];
  lines.forEach((line, index) => {
    identity.appendChild(document.createTextNode(line));
    if (index < lines.length - 1) identity.appendChild(document.createElement("br"));
  });
  return identity;
}

function createSocialList(socials) {
  const list = createElement("div", "about-socials");
  list.id = "contact";

  socials.forEach((social) => {
    const item = createElement("div", "social-item");
    const label = createElement(social.url ? "a" : "span", "social-item__link");
    label.append(document.createTextNode(social.label || ""), createExternalArrow());
    if (social.url) {
      label.href = social.url;
      label.target = "_blank";
      label.rel = "noreferrer";
    }
    item.appendChild(label);
    list.appendChild(item);
  });
  return list;
}

function createExperience(experience = {}) {
  const section = createElement("section", "about-experience");
  section.appendChild(createSectionHeading(experience.title || "experiência", experience.translation || "experience"));

  (experience.entries || []).forEach((entry) => {
    const item = createElement("article", "experience-item");
    const company = createElement(entry.url ? "a" : "span", "experience-item__company");
    company.append(document.createTextNode(entry.company || ""), createExternalArrow());
    if (entry.url) {
      company.href = entry.url;
      company.target = "_blank";
      company.rel = "noreferrer";
    }
    item.append(company, createElement("p", "", entry.role || ""), createElement("p", "", entry.period || ""));
    section.appendChild(item);
  });
  return section;
}

function createEducation(education = {}) {
  const section = createElement("section", "about-education");
  section.append(
    createSectionHeading(education.title || "educação", education.translation || "education"),
    createElement("p", "about-education__course", education.course || ""),
    createElement("p", "about-education__school", education.school || "")
  );
  return section;
}

function createSectionHeading(primary, secondary) {
  const heading = createElement("h2", "section-heading");
  const arrow = createElement("span", "section-heading__arrow");
  const icon = document.createElement("img");
  icon.src = DOWN_ARROW_ICON;
  icon.alt = "";
  icon.width = 92;
  icon.height = 106;
  arrow.appendChild(icon);
  heading.append(arrow, document.createTextNode(primary), createElement("em", "", ` / ${secondary}`));
  return heading;
}

function renderWork(work) {
  const root = document.getElementById("work-page");
  if (!root) return;

  const intro = createElement("section", "work-intro");
  const archiveLink = createElement("a", "pill-button work-archive-link", work.archiveLabel || "ARCHIVES↓");
  const title = createElement("h1", "work-title");
  archiveLink.href = "#project-list";
  title.append(createElement("span", "", work.titleEn || "Projects/"), document.createTextNode(" "), createElement("strong", "", work.titlePt || "Projetos"));
  intro.append(archiveLink, title);

  const board = createElement("section", "work-board");
  const feature = createElement("figure", "work-feature");
  const featureImage = document.createElement("img");
  const list = createElement("div", "work-project-list");
  const projects = getPublishedProjects(work.projects || []);

  featureImage.src = work.featureImage || "";
  featureImage.alt = work.featureImageAlt || "";
  feature.appendChild(featureImage);
  list.id = "project-list";
  list.setAttribute("aria-label", "Projetos");
  projects.forEach((project) => list.appendChild(createWorkProjectRow(project)));
  for (let index = projects.length; index < WORK_VISIBLE_ROWS; index += 1) {
    const emptyRow = createElement("div", "work-project-row work-project-row--empty");
    emptyRow.setAttribute("aria-hidden", "true");
    list.appendChild(emptyRow);
  }
  board.append(feature, list);
  root.replaceChildren(intro, board);
}

function createWorkProjectRow(project) {
  const row = createElement(project.slug ? "a" : "article", "work-project-row");
  const meta = createElement("div", "work-project-row__meta");
  const title = createElement("h2", "work-project-row__title", project.title || "");
  if (project.slug) row.href = `project.html?slug=${encodeURIComponent(project.slug)}`;
  meta.append(
    createElement("span", "", project.client || ""),
    createElement("span", "", project.projectType || project.category || ""),
    createElement("span", "", project.year || "")
  );
  row.append(meta, title);
  return row;
}

function renderProject(work) {
  const root = document.getElementById("project-root");
  const projects = getPublishedProjects(work.projects || []);
  const slug = new URLSearchParams(window.location.search).get("slug");
  const project = projects.find((item) => item.slug === slug) || projects[0];
  if (!root) return;
  if (!project) {
    root.replaceChildren(createElement("p", "project-empty", "Nenhum projeto publicado."));
    return;
  }

  document.title = `${project.title || "Projeto"} | Bruno Oliveira`;
  const caseStudy = createElement("article", "project-case-study");
  const media = getProjectMedia(project);
  caseStudy.append(
    createMediaSlot(media[0], "project-media-slot project-media-slot--hero"),
    createProjectSummary(project),
    createProjectMediaPair(media[1], media[2]),
    createMediaSlot(media[3], "project-media-slot project-media-slot--wide"),
    createProjectDetails(project),
    createProjectNavigation(project, projects)
  );
  root.replaceChildren(caseStudy);
}

function getProjectMedia(project) {
  const items = [];
  if (project.coverImage) items.push({ src: project.coverImage, alt: project.coverAlt || project.title || "" });
  (project.gallery || []).forEach((item) => items.push(item));
  while (items.length < 4) items.push(null);
  return items.slice(0, 4);
}

function createMediaSlot(media, className) {
  const figure = createElement("figure", className);
  if (media?.src) {
    const image = document.createElement("img");
    image.src = media.src;
    image.alt = media.alt || "";
    image.loading = className.includes("hero") ? "eager" : "lazy";
    image.decoding = "async";
    figure.appendChild(image);
  } else {
    figure.classList.add("is-empty");
    figure.setAttribute("aria-label", "Slot de mídia preparado para o CMS");
  }
  return figure;
}

function createProjectMediaPair(first, second) {
  const pair = createElement("div", "project-media-pair");
  pair.append(createMediaSlot(first, "project-media-slot"), createMediaSlot(second, "project-media-slot"));
  return pair;
}

function createProjectSummary(project) {
  const summary = createElement("section", "project-summary");
  const meta = createElement("div", "project-summary__meta");
  const credits = createElement("button", "project-summary__credits", "full credits↓");
  credits.type = "button";
  credits.addEventListener("click", () => {
    document.getElementById("project-details")?.scrollIntoView({ behavior: "smooth", block: "start" });
  });
  meta.append(createElement("p", "", project.projectType || project.category || ""), credits);
  summary.append(createElement("h1", "project-summary__title", project.title || ""), meta);
  return summary;
}

function createProjectDetails(project) {
  const details = createElement("section", "project-details");
  const credits = createElement("div", "project-credits");
  const copy = createElement("div", "project-copy");
  const creditText = createElement("div", "project-credits__content");
  const en = createElement("article", "project-language project-language--en");
  const pt = createElement("article", "project-language project-language--pt");
  details.id = "project-details";

  (project.credits || []).forEach((credit) => {
    const value = createElement("p", "", credit.value || "");
    if (credit.label) value.dataset.label = credit.label;
    creditText.appendChild(value);
  });
  en.append(createElement("strong", "", "EN"), document.createTextNode(project.descriptionEn ? ` ${project.descriptionEn}` : ""));
  pt.append(createElement("strong", "", "PT"), document.createTextNode(project.descriptionPt ? ` ${project.descriptionPt}` : ""));
  credits.append(createBilingualHeading("Credits", "créditos"), creditText);
  copy.append(createBilingualHeading("Projeto", "project"), en, pt);
  details.append(credits, copy);
  return details;
}

function createBilingualHeading(primary, secondary) {
  const heading = createElement("h2", "bilingual-heading");
  heading.append(document.createTextNode(primary), createElement("em", "", ` / ${secondary}`));
  return heading;
}

function createProjectNavigation(project, projects) {
  const nav = createElement("nav", "project-navigation");
  const index = projects.findIndex((item) => item.slug === project.slug);
  const previous = projects.length > 1 ? projects[(index - 1 + projects.length) % projects.length] : null;
  const next = projects.length > 1 ? projects[(index + 1) % projects.length] : null;
  nav.setAttribute("aria-label", "Navegação entre projetos");
  nav.append(
    createPageNavLink(previous ? `project.html?slug=${encodeURIComponent(previous.slug)}` : "work.html", "left", previous ? `Projeto anterior: ${previous.title}` : "Voltar para Work"),
    createPageNavLink("work.html", "up", "Voltar para Work"),
    createPageNavLink(next ? `project.html?slug=${encodeURIComponent(next.slug)}` : "work.html", "right", next ? `Próximo projeto: ${next.title}` : "Voltar para Work")
  );
  return nav;
}

function createPageNavLink(href, direction, label) {
  const link = createElement("a", `page-nav page-nav--${direction}`);
  const image = document.createElement("img");
  link.href = href;
  link.setAttribute("aria-label", label);
  image.src = PAGE_NAV_ICON;
  image.alt = "";
  image.width = 92;
  image.height = 92;
  link.appendChild(image);
  return link;
}

function createExternalArrow() {
  const image = document.createElement("img");
  image.className = "external-arrow";
  image.src = EXTERNAL_ARROW_ICON;
  image.alt = "";
  image.width = 57;
  image.height = 50;
  return image;
}

function getPublishedProjects(projects) {
  return projects
    .filter((project) => project.published !== false)
    .sort((first, second) => (first.order ?? 999) - (second.order ?? 999));
}

function createMailto(email, subject = "") {
  const query = subject ? `?subject=${encodeURIComponent(subject)}` : "";
  return `mailto:${email || "contato@olabruno.com"}${query}`;
}

function createElement(tagName, className = "", text = "") {
  const element = document.createElement(tagName);
  if (className) element.className = className;
  if (text) element.textContent = text;
  return element;
}

function renderLoadError() {
  const root = document.querySelector("main");
  if (root) root.replaceChildren(createElement("p", "load-error", "Não foi possível carregar esta página."));
}
