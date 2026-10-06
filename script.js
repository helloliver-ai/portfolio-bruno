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
    if (isSanityProjectPreview()) {
      await renderSanityProjectPreview();
    } else if (isSanityContentPage()) {
      try {
        await renderCmsPage(content);
      } catch (error) {
        console.warn("Sanity indisponível; usando o conteúdo local de fallback.", error);
        renderPage(content);
      }
    } else {
      renderPage(content);
    }
  } catch (error) {
    console.error("Não foi possível carregar o conteúdo do site.", error);
    renderLoadError();
  }
});

function isSanityContentPage() {
  const page = getCurrentPage();
  return page === "work" || page === "project";
}

function isSanityProjectPreview() {
  const params = new URLSearchParams(window.location.search);
  return getCurrentPage() === "project" && params.get("sanity-preview") === "1";
}

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
  const link = createElement("a", "site-footer__email");
  const label = createElement("span", "site-footer__label", site.footer?.label || "contato@olabruno.com");
  link.href = createMailto(email, site.footer?.emailSubject);
  link.setAttribute("aria-label", `${label.textContent}: ${email}`);
  link.appendChild(label);
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
  const archiveLink = createElement("button", "pill-button work-archive-link");
  const archiveLabel = String(work.archiveLabel || "ARCHIVES").replace(/↓/g, "").trim();
  const archiveArrow = document.createElement("img");
  const title = createElement("h1", "work-title");
  archiveLink.type = "button";
  archiveLink.setAttribute("aria-label", `${archiveLabel} — menu de arquivos em breve`);
  archiveArrow.className = "work-archive-link__arrow";
  archiveArrow.src = DOWN_ARROW_ICON;
  archiveArrow.alt = "";
  archiveArrow.width = 92;
  archiveArrow.height = 106;
  archiveLink.append(createElement("span", "work-archive-link__label", archiveLabel), archiveArrow);
  title.append(createElement("span", "", work.titleEn || "Projects/"), document.createTextNode(" "), createElement("strong", "", work.titlePt || "Projetos"));
  intro.append(archiveLink, title);

  const board = createElement("section", "work-board");
  const hoverCover = createElement("figure", "work-hover-cover");
  const hoverCoverImage = document.createElement("img");
  const list = createElement("div", "work-project-list");
  const projects = getPublishedProjects(work.projects || []);

  hoverCover.setAttribute("aria-hidden", "true");
  hoverCoverImage.alt = "";
  hoverCover.appendChild(hoverCoverImage);
  list.id = "project-list";
  list.setAttribute("aria-label", "Projetos");
  projects.forEach((project) => {
    const row = createWorkProjectRow(project);
    bindWorkHoverCover(row.querySelector(".work-project-row__title-link"), hoverCover, hoverCoverImage, project);
    list.appendChild(row);
  });
  for (let index = projects.length; index < WORK_VISIBLE_ROWS; index += 1) {
    const emptyRow = createElement("div", "work-project-row work-project-row--empty");
    emptyRow.setAttribute("aria-hidden", "true");
    list.appendChild(emptyRow);
  }
  board.append(hoverCover, list);
  root.replaceChildren(intro, board);
}

function createWorkProjectRow(project) {
  const row = createElement("article", "work-project-row");
  const meta = createElement("div", "work-project-row__meta");
  const title = createElement("h2", "work-project-row__title");
  const titleLink = createElement(project.slug ? "a" : "span", "work-project-row__title-link");
  const viewport = createElement("span", "work-project-row__title-viewport");
  const track = createElement("span", "work-project-row__title-track");
  const titleText = project.title || "";
  const titlePrimary = createElement("span", "work-project-row__title-copy", titleText);
  const titleDuplicate = createElement("span", "work-project-row__title-copy", titleText);
  const titleDuplicate2 = createElement("span", "work-project-row__title-copy", titleText);
  const titleDuplicate3 = createElement("span", "work-project-row__title-copy", titleText);
  [titleDuplicate, titleDuplicate2, titleDuplicate3].forEach((copy) => {
    copy.setAttribute("aria-hidden", "true");
  });

  track.append(titlePrimary, titleDuplicate, titleDuplicate2, titleDuplicate3);
  viewport.appendChild(track);
  titleLink.appendChild(viewport);
  if (project.slug) {
    titleLink.href = `project.html?slug=${encodeURIComponent(project.slug)}`;
    titleLink.setAttribute("aria-label", titleText);
  }
  const localizedType = normalizeLocalizedText(project.projectType || project.category);
  meta.append(
    createElement("span", "work-project-row__client", project.client || ""),
    createWorkProjectType(localizedType),
    createElement("span", "work-project-row__year", project.year || "")
  );
  title.appendChild(titleLink);
  row.append(meta, title);
  return row;
}

function normalizeLocalizedText(value) {
  if (value && typeof value === "object") return {pt: value.pt || "", en: value.en || ""};
  const text = String(value || "");
  const separator = text.indexOf(" / ");
  if (separator >= 0) return {en: text.slice(0, separator), pt: text.slice(separator + 3)};
  return {pt: text, en: ""};
}

function createWorkProjectType(localized) {
  const wrapper = createElement("span", "work-project-row__type");
  if (localized.pt) {
    const pt = createElement("span", "work-project-row__type-pt", localized.pt);
    pt.lang = "pt-BR";
    wrapper.appendChild(pt);
  }
  if (localized.en) {
    const en = createElement("span", "work-project-row__type-en", localized.en);
    en.lang = "en";
    wrapper.appendChild(en);
  }
  return wrapper;
}

function bindWorkHoverCover(titleLink, cover, image, project) {
  if (!titleLink) return;
  const source = project.thumbnailSrc || project.coverImage || "";
  if (!source) return;
  const supportsHover = window.matchMedia("(hover: hover) and (pointer: fine)");

  const positionCover = (clientX) => {
    const titleBounds = titleLink.getBoundingClientRect();
    cover.style.left = `${clientX}px`;
    const coverHeight = cover.getBoundingClientRect().height;
    const desiredTop = titleBounds.top + (titleBounds.height / 2);
    const safeTop = Math.max((coverHeight / 2) + 12, Math.min(window.innerHeight - (coverHeight / 2) - 12, desiredTop));
    cover.style.top = `${safeTop}px`;
  };

  const show = (clientX) => {
    if (!supportsHover.matches) return;
    image.src = source;
    cover.classList.add("is-visible");
    positionCover(clientX);
  };
  const hide = () => cover.classList.remove("is-visible");

  titleLink.addEventListener("pointerenter", (event) => show(event.clientX));
  titleLink.addEventListener("pointermove", (event) => positionCover(event.clientX));
  titleLink.addEventListener("pointerleave", hide);
  titleLink.addEventListener("focus", () => {
    const bounds = titleLink.getBoundingClientRect();
    show(bounds.left + (bounds.width / 2));
  });
  titleLink.addEventListener("blur", hide);
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
    createMediaSlot(media[0], "project-media-slot project-media-slot--hero project-content-block--wide"),
    createProjectSummary(project),
    createProjectMediaPair(media[1], media[2]),
    createMediaSlot(media[3], "project-media-slot project-media-slot--wide"),
    createProjectDetails(project),
    createProjectNavigation(project, projects)
  );
  root.replaceChildren(caseStudy);
}

async function renderCmsPage(content) {
  document.body.classList.add("is-cms-mode");
  const runtime = await import("./assets/js/sanity-cms.js");
  const page = getCurrentPage();

  if (page === "work") {
    const sanityProjects = await runtime.fetchPublishedProjects();
    const projects = (sanityProjects || []).map((project) => {
      const thumbnail = project.thumbnail?.image?.asset ? project.thumbnail : project.cover;
      return {
        title: project.title,
        client: project.client,
        projectType: project.projectType || {},
        year: project.year,
        slug: project.slug,
        order: project.workOrder,
        published: true,
        thumbnailSrc: runtime.sanityImageUrl(thumbnail?.image, {width: 900, height: 1100}),
      };
    });
    renderWork({
      ...content.work,
      projects,
    });
    return;
  }

  if (page === "project") {
    const params = new URLSearchParams(window.location.search);
    const slug = params.get("slug") || "cms-schema-validation-test";
    const [project, projects] = await Promise.all([
      runtime.fetchPublishedProject(slug),
      runtime.fetchPublishedProjects(),
    ]);
    if (!project) throw new Error(`Projeto Sanity não encontrado para o slug “${slug}”.`);
    renderSanityProject(project, runtime, {projects});
  }
}

let sanityPreviewEventSource;
let sanityPreviewRefreshTimer;

async function renderSanityProjectPreview() {
  const root = document.getElementById("project-root");
  if (!root) return;

  document.body.classList.add("is-sanity-preview");
  const runtime = await import("./assets/js/sanity-preview.js");

  const refresh = async () => {
    const params = new URLSearchParams(window.location.search);
    const slug = params.get("slug") || "cms-schema-validation-test";
    const response = await fetch(`/api/preview/project?slug=${encodeURIComponent(slug)}`, {
      cache: "no-store",
      credentials: "same-origin",
    });
    const payload = await response.json();
    if (!response.ok) throw new Error(payload.error || `Preview request failed: ${response.status}`);
    renderSanityProject(payload.project, runtime);
  };

  await refresh();
  runtime.startVisualEditing();

  sanityPreviewEventSource?.close();
  sanityPreviewEventSource = new EventSource("/api/preview/events", { withCredentials: true });
  sanityPreviewEventSource.addEventListener("project", () => {
    window.clearTimeout(sanityPreviewRefreshTimer);
    sanityPreviewRefreshTimer = window.setTimeout(() => {
      refresh().catch((error) => console.error("Sanity preview refresh failed.", error));
    }, 180);
  });
  sanityPreviewEventSource.addEventListener("error", (error) => {
    console.error("Sanity preview live connection failed.", error);
  });
}

function renderSanityProject(project, runtime, options = {}) {
  const root = document.getElementById("project-root");
  if (!root) return;

  document.documentElement.lang = "pt-BR";
  document.title = "Project preview | Bruno Oliveira";

  const caseStudy = createElement("article", "project-case-study project-case-study--cms");
  caseStudy.dataset.sanity = runtime.sanityDataAttribute({
    id: project._id,
    type: project._type,
    path: "contentBlocks",
  });

  caseStudy.append(
    createSanityMedia(project.cover, "cover", getProjectMediaClass(project.heroLayout, true), project, runtime, getProjectMediaDimensions(project.heroLayout, true)),
    createSanityProjectSummary(project, runtime),
    createSanityBlocks(project, runtime),
    createProjectNavigation(project, options.projects?.length ? options.projects : [project])
  );
  root.replaceChildren(caseStudy);
}

function createSanityProjectSummary(project, runtime) {
  const summary = createElement("section", "project-summary");
  const title = createElement("h1", "project-summary__title", project.title || "Untitled project");
  const meta = createElement("div", "project-summary__meta");
  const type = createBilingualInlineText(project.projectType, "project-summary__type");
  const year = createElement("p", "", project.year || "");
  const credits = createCreditsAccordion(project.credits || [], runtime, project);

  title.dataset.sanity = runtime.sanityDataAttribute({id: project._id, path: "title"});
  type.dataset.sanity = runtime.sanityDataAttribute({id: project._id, path: "projectType"});
  year.dataset.sanity = runtime.sanityDataAttribute({id: project._id, path: "year"});
  meta.append(type, year, credits);
  summary.append(title, meta);
  return summary;
}

function createSanityBlocks(project, runtime) {
  const blocks = createElement("div", "project-content-blocks");
  blocks.dataset.sanity = runtime.sanityDataAttribute({id: project._id, path: "contentBlocks"});
  blocks.dataset.sanityDragFlow = "vertical";

  (project.contentBlocks || []).forEach((block) => {
    const blockPath = `contentBlocks[_key==\"${block._key}\"]`;
    const element = createSanityBlock(block, blockPath, project, runtime);
    if (!element) return;
    element.dataset.sanity = runtime.sanityDataAttribute({id: project._id, path: blockPath});
    blocks.appendChild(element);
  });
  return blocks;
}

function createSanityBlock(block, blockPath, project, runtime) {
  if (block._type === "mediaBlock") {
    return createSanityMedia(
      block.media,
      `${blockPath}.media`,
      getProjectMediaClass(block.layout),
      project,
      runtime,
      getProjectMediaDimensions(block.layout)
    );
  }
  if (block._type === "fullWidthMedia") {
    return createSanityMedia(block.media, `${blockPath}.media`, "project-content-block project-content-block--full", project, runtime, {width: 1920, height: 1080});
  }
  if (block._type === "wideMedia") {
    return createSanityMedia(block.media, `${blockPath}.media`, "project-content-block project-content-block--wide", project, runtime, {width: 1880, height: 1056});
  }
  if (block._type === "textBlock") {
    const section = createElement("section", `project-content-block project-text-block project-text-block--${block.placement || "wide"}`);
    section.appendChild(createSanityLocalizedText(block.content, `${blockPath}.content`, project, runtime));
    return section;
  }
  if (block._type === "twoColumns") {
    const row = createElement("section", "project-content-block project-two-columns");
    row.append(
      createSanityColumn(block.left, `${blockPath}.left`, project, runtime),
      createSanityColumn(block.right, `${blockPath}.right`, project, runtime)
    );
    return row;
  }
  if (block._type === "vimeoBlock") {
    return createSanityVimeo(block, blockPath, project, runtime, block.layout === "fullWidth" ? "full" : "wide");
  }
  if (block._type === "spacerBlock") {
    const spacer = createElement("div", `project-content-block project-spacer project-spacer--${block.size || "medium"}`);
    spacer.setAttribute("aria-hidden", "true");
    return spacer;
  }
  return null;
}

function getProjectMediaClass(layout = "wide", hero = false) {
  const prefix = hero ? "project-media-slot project-media-slot--hero" : "project-content-block";
  if (layout === "fullWidth") return `${prefix} project-content-block--full`;
  if (layout === "halfLeft") return `${prefix} project-content-block--half project-content-block--halfLeft`;
  if (layout === "halfRight") return `${prefix} project-content-block--half project-content-block--halfRight`;
  return `${prefix} project-content-block--wide`;
}

function getProjectMediaDimensions(layout = "wide", hero = false) {
  if (layout === "fullWidth") return {width: 1920, height: 1080};
  if (layout === "halfLeft" || layout === "halfRight") return {width: 928, height: 859};
  if (hero) return {width: 1880, height: 859};
  return {width: 1880, height: 1056};
}

function createSanityMedia(media, path, className, project, runtime, dimensions) {
  const figure = createElement("figure", className);
  const imageData = media?.image;
  const imageUrl = runtime.sanityImageUrl(imageData, dimensions);
  figure.dataset.sanity = runtime.sanityDataAttribute({id: project._id, path: `${path}.image`});

  if (!imageUrl) {
    figure.classList.add("is-empty");
    figure.setAttribute("aria-label", "Image not set");
    return figure;
  }

  const image = document.createElement("img");
  image.src = imageUrl;
  const preferredAlt = getPreferredImageAlt(media);
  image.alt = preferredAlt.text;
  if (preferredAlt.language) image.lang = preferredAlt.language;
  image.loading = path === "cover" ? "eager" : "lazy";
  image.decoding = "async";
  image.dataset.sanity = runtime.sanityDataAttribute({id: project._id, path: `${path}.image`});
  figure.appendChild(image);
  return figure;
}

function getPreferredImageAlt(media = {}) {
  if (media.decorative) return {text: "", language: ""};
  if (typeof media.alt === "string") return {text: media.alt, language: ""};
  const languages = Array.isArray(navigator.languages) && navigator.languages.length
    ? navigator.languages
    : [navigator.language || "en"];
  const prefersPortuguese = languages[0]?.toLowerCase().startsWith("pt");
  if (prefersPortuguese) return {text: media.alt?.pt || media.alt?.en || "", language: "pt-BR"};
  return {text: media.alt?.en || media.alt?.pt || "", language: "en"};
}

function createSanityLocalizedText(content, path, project, runtime) {
  const pair = createElement("div", "project-localized-pair");
  ["pt", "en"].forEach((locale) => {
    const localized = content?.[locale];
    if (!localized) return;
    const language = locale === "pt" ? "pt-BR" : "en";
    const article = createElement("article", `project-localized-text project-localized-text--${locale}`);
    article.lang = language;
    article.dataset.sanity = runtime.sanityDataAttribute({id: project._id, path: `${path}.${locale}`});

    if (localized.title) article.appendChild(createElement("h2", "project-localized-text__title", localized.title));
    if (localized.subtitle) article.appendChild(createElement("p", "project-localized-text__subtitle", localized.subtitle));
    if (localized.body?.length) {
      const body = createElement("div", "project-localized-text__body");
      renderPortableText(body, localized.body);
      article.appendChild(body);
    }
    pair.appendChild(article);
  });
  return pair;
}

function renderPortableText(container, blocks) {
  blocks.filter((block) => block?._type === "block").forEach((block) => {
    const paragraph = document.createElement("p");
    const definitions = new Map((block.markDefs || []).map((definition) => [definition._key, definition]));
    (block.children || []).forEach((child) => {
      let node = document.createTextNode(child.text || "");
      (child.marks || []).slice().reverse().forEach((mark) => {
        let wrapper;
        if (mark === "strong") wrapper = document.createElement("strong");
        if (mark === "em") wrapper = document.createElement("em");
        if (["colorBlack", "colorWhite", "colorOrange"].includes(mark)) {
          wrapper = document.createElement("span");
          wrapper.className = `portable-color portable-${mark}`;
        }
        const definition = definitions.get(mark);
        if (definition?._type === "link") {
          wrapper = document.createElement("a");
          wrapper.href = definition.href;
          wrapper.rel = "noreferrer";
        }
        if (wrapper) {
          wrapper.appendChild(node);
          node = wrapper;
        }
      });
      paragraph.appendChild(node);
    });
    container.appendChild(paragraph);
  });
}

function createSanityColumn(column = {}, path, project, runtime) {
  const item = createElement("div", `project-column project-column--${column.kind || "empty"}`);
  item.dataset.sanity = runtime.sanityDataAttribute({id: project._id, path});
  if (column.kind === "image") {
    item.appendChild(createSanityMedia(column.image, `${path}.image`, "project-column__media", project, runtime, {width: 928, height: 859}));
  } else if (column.kind === "text") {
    item.appendChild(createSanityLocalizedText(column.text, `${path}.text`, project, runtime));
  } else if (column.kind === "vimeo") {
    item.appendChild(createSanityVimeo(column.vimeo, `${path}.vimeo`, project, runtime, "column"));
  } else {
    item.setAttribute("aria-hidden", "true");
  }
  return item;
}

function createSanityVimeo(video = {}, path, project, runtime, layout) {
  const figure = createElement("figure", `project-content-block project-vimeo project-vimeo--${layout}`);
  figure.dataset.sanity = runtime.sanityDataAttribute({id: project._id, path});
  const id = getVimeoId(video.vimeoUrl);
  if (!id) {
    figure.classList.add("is-empty");
    figure.setAttribute("aria-label", "Vimeo URL not set");
    return figure;
  }

  const frame = createElement("div", "project-vimeo__frame");
  const iframe = document.createElement("iframe");
  const query = new URLSearchParams({
    autopause: "0",
    controls: "0",
    unmute_button: "0",
    volume: "0",
    keyboard: "0",
    autoplay: video.autoplay ? "1" : "0",
    loop: video.loop ? "1" : "0",
    muted: video.muted ? "1" : "0",
    title: "0",
    byline: "0",
    portrait: "0",
  });
  iframe.src = `https://player.vimeo.com/video/${id}?${query.toString()}`;
  iframe.title = "Vimeo video";
  iframe.loading = "lazy";
  iframe.allow = "autoplay; fullscreen; picture-in-picture";
  iframe.allowFullscreen = true;
  frame.appendChild(iframe);
  figure.appendChild(frame);
  return figure;
}

function getVimeoId(url = "") {
  const match = String(url).match(/vimeo\.com\/(?:video\/)?(\d+)/);
  return match?.[1] || "";
}

function createBilingualInlineText(content = {}, className = "") {
  const localized = normalizeLocalizedText(content);
  const wrapper = createElement("p", className);
  if (localized.pt) {
    const pt = createElement("span", `${className}__pt`, localized.pt);
    pt.lang = "pt-BR";
    wrapper.appendChild(pt);
  }
  if (localized.pt && localized.en) wrapper.appendChild(document.createTextNode(" / "));
  if (localized.en) {
    const en = createElement("span", `${className}__en`, localized.en);
    en.lang = "en";
    wrapper.appendChild(en);
  }
  return wrapper;
}

function createCreditsAccordion(credits = [], runtime, project = {}) {
  const accordion = createElement("div", "project-credits-accordion");
  const trigger = createElement("button", "project-summary__credits");
  const label = createElement("span", "project-summary__credits-label");
  const en = createElement("span", "project-summary__credits-en", "Full credits");
  const pt = createElement("span", "project-summary__credits-pt", "Créditos completos");
  const arrow = createElement("span", "project-summary__credits-arrow", "↓");
  const panel = createElement("div", "project-credits-accordion__panel");
  const safeId = String(project.slug || project._id || "project").replace(/[^a-z0-9_-]+/gi, "-");
  panel.id = `project-credits-${safeId}`;
  panel.hidden = true;
  en.lang = "en";
  pt.lang = "pt-BR";
  label.append(en, document.createTextNode(" / "), pt);
  trigger.type = "button";
  trigger.setAttribute("aria-expanded", "false");
  trigger.setAttribute("aria-controls", panel.id);
  trigger.append(label, arrow);

  credits.forEach((credit) => {
    const item = createElement("p", "project-cms-credit");
    if (runtime && project._id && credit._key) {
      item.dataset.sanity = runtime.sanityDataAttribute({id: project._id, path: `credits[_key==\"${credit._key}\"]`});
    }
    if (credit.label) item.appendChild(createElement("strong", "", `${credit.label}: `));
    item.appendChild(document.createTextNode(credit.value || ""));
    panel.appendChild(item);
  });

  if (runtime && project._id) {
    accordion.dataset.sanity = runtime.sanityDataAttribute({id: project._id, path: "credits"});
  }
  trigger.addEventListener("click", () => {
    const expanded = trigger.getAttribute("aria-expanded") === "true";
    trigger.setAttribute("aria-expanded", String(!expanded));
    panel.hidden = expanded;
  });
  accordion.append(trigger, panel);
  return accordion;
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
  const credits = createCreditsAccordion(project.credits || [], null, project);
  meta.append(createBilingualInlineText(project.projectType || project.category || "", "project-summary__type"), credits);
  summary.append(createElement("h1", "project-summary__title", project.title || ""), meta);
  return summary;
}

function createProjectDetails(project) {
  const details = createElement("section", "project-details");
  const copy = createElement("div", "project-copy");
  const en = createElement("article", "project-language project-language--en");
  const pt = createElement("article", "project-language project-language--pt");
  details.id = "project-details";

  en.append(createElement("strong", "", "EN"), document.createTextNode(project.descriptionEn ? ` ${project.descriptionEn}` : ""));
  pt.append(createElement("strong", "", "PT"), document.createTextNode(project.descriptionPt ? ` ${project.descriptionPt}` : ""));
  copy.append(createBilingualHeading("Projeto", "project"), en, pt);
  details.appendChild(copy);
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
  const workUrl = "work.html";
  nav.setAttribute("aria-label", "Navegação entre projetos");
  nav.append(
    createPageNavLink(previous ? `project.html?slug=${encodeURIComponent(previous.slug)}` : workUrl, "left", previous ? `Projeto anterior: ${previous.title}` : "Voltar para Work"),
    createPageNavLink(workUrl, "up", "Voltar para Work"),
    createPageNavLink(next ? `project.html?slug=${encodeURIComponent(next.slug)}` : workUrl, "right", next ? `Próximo projeto: ${next.title}` : "Voltar para Work")
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
