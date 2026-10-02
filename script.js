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
    if (isCmsMode()) {
      await renderCmsPage(content);
    } else if (isSanityProjectPreview()) {
      await renderSanityProjectPreview();
    } else {
      renderPage(content);
    }
  } catch (error) {
    console.error("Não foi possível carregar o conteúdo do site.", error);
    renderLoadError();
  }
});

function isCmsMode() {
  const page = getCurrentPage();
  return (page === "work" || page === "project") && new URLSearchParams(window.location.search).get("cms") === "1";
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
  projects.forEach((project) => {
    const row = createWorkProjectRow(project);
    if (project.thumbnailSrc) {
      const showThumbnail = () => {
        featureImage.src = project.thumbnailSrc;
        featureImage.alt = project.thumbnailAlt || "";
      };
      row.addEventListener("mouseenter", showThumbnail);
      row.addEventListener("focus", showThumbnail);
    }
    list.appendChild(row);
  });
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
  if (project.slug) {
    const cmsQuery = project.cms ? "&cms=1" : "";
    row.href = `project.html?slug=${encodeURIComponent(project.slug)}${cmsQuery}`;
  }
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
        projectType: project.projectType?.pt || project.projectType?.en || "",
        year: project.year,
        slug: project.slug,
        order: project.workOrder,
        published: true,
        cms: true,
        thumbnailSrc: runtime.sanityImageUrl(thumbnail?.image, {width: 900, height: 1100}),
        thumbnailAlt: thumbnail?.decorative ? "" : thumbnail?.alt || "",
      };
    });
    const firstProject = projects[0];
    renderWork({
      ...content.work,
      projects,
      featureImage: firstProject?.thumbnailSrc || content.work.featureImage,
      featureImageAlt: firstProject?.thumbnailSrc ? firstProject.thumbnailAlt : content.work.featureImageAlt,
    });
    return;
  }

  if (page === "project") {
    const params = new URLSearchParams(window.location.search);
    const slug = params.get("slug") || "cms-schema-validation-test";
    const locale = params.get("lang") === "en" ? "en" : "pt";
    const [project, projects] = await Promise.all([
      runtime.fetchPublishedProject(slug),
      runtime.fetchPublishedProjects(),
    ]);
    if (!project) throw new Error(`Projeto Sanity não encontrado para o slug “${slug}”.`);
    renderSanityProject(project, locale, runtime, {cmsMode: true, projects});
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
    const locale = params.get("lang") === "en" ? "en" : "pt";
    const response = await fetch(`/api/preview/project?slug=${encodeURIComponent(slug)}`, {
      cache: "no-store",
      credentials: "same-origin",
    });
    const payload = await response.json();
    if (!response.ok) throw new Error(payload.error || `Preview request failed: ${response.status}`);
    renderSanityProject(payload.project, locale, runtime);
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

function renderSanityProject(project, locale, runtime, options = {}) {
  const root = document.getElementById("project-root");
  if (!root) return;

  document.documentElement.lang = locale === "en" ? "en" : "pt-BR";
  document.title = "Project preview | Bruno Oliveira";

  const caseStudy = createElement("article", "project-case-study project-case-study--cms");
  caseStudy.dataset.sanity = runtime.sanityDataAttribute({
    id: project._id,
    type: project._type,
    path: "contentBlocks",
  });

  caseStudy.append(
    createSanityLanguageSwitch(locale),
    createSanityMedia(project.cover, "cover", "project-media-slot project-media-slot--hero", project, runtime, { width: 1880, height: 859 }),
    createSanityProjectSummary(project, locale, runtime),
    createSanityBlocks(project, locale, runtime),
    createSanityCredits(project, runtime),
    createProjectNavigation(project, options.projects?.length ? options.projects : [project], {cms: options.cmsMode})
  );
  root.replaceChildren(caseStudy);
}

function createSanityLanguageSwitch(locale) {
  const nav = createElement("nav", "sanity-preview-language");
  nav.setAttribute("aria-label", "Preview language");
  ["pt", "en"].forEach((language) => {
    const link = createElement("a", "sanity-preview-language__link", language.toUpperCase());
    const url = new URL(window.location.href);
    url.searchParams.set("lang", language);
    link.href = `${url.pathname}${url.search}`;
    if (locale === language) link.setAttribute("aria-current", "page");
    nav.appendChild(link);
  });
  return nav;
}

function createSanityProjectSummary(project, locale, runtime) {
  const summary = createElement("section", "project-summary");
  const title = createElement("h1", "project-summary__title", project.title || "Untitled project");
  const meta = createElement("div", "project-summary__meta");
  const type = createElement("p", "", project.projectType?.[locale] || project.projectType?.pt || project.projectType?.en || "");
  const year = createElement("p", "", project.year || "");
  const credits = createElement("button", "project-summary__credits", locale === "en" ? "full credits↓" : "créditos completos↓");

  title.dataset.sanity = runtime.sanityDataAttribute({id: project._id, path: "title"});
  type.dataset.sanity = runtime.sanityDataAttribute({id: project._id, path: `projectType.${locale}`});
  year.dataset.sanity = runtime.sanityDataAttribute({id: project._id, path: "year"});
  credits.type = "button";
  credits.addEventListener("click", () => {
    document.getElementById("project-cms-credits")?.scrollIntoView({behavior: "smooth", block: "start"});
  });
  meta.append(type, year, credits);
  summary.append(title, meta);
  return summary;
}

function createSanityBlocks(project, locale, runtime) {
  const blocks = createElement("div", "project-content-blocks");
  blocks.dataset.sanity = runtime.sanityDataAttribute({id: project._id, path: "contentBlocks"});
  blocks.dataset.sanityDragFlow = "vertical";

  (project.contentBlocks || []).forEach((block) => {
    const blockPath = `contentBlocks[_key==\"${block._key}\"]`;
    const element = createSanityBlock(block, blockPath, project, locale, runtime);
    if (!element) return;
    element.dataset.sanity = runtime.sanityDataAttribute({id: project._id, path: blockPath});
    blocks.appendChild(element);
  });
  return blocks;
}

function createSanityBlock(block, blockPath, project, locale, runtime) {
  if (block._type === "fullWidthMedia") {
    return createSanityMedia(block.media, `${blockPath}.media`, "project-content-block project-content-block--full", project, runtime, {width: 1920, height: 1080});
  }
  if (block._type === "wideMedia") {
    return createSanityMedia(block.media, `${blockPath}.media`, "project-content-block project-content-block--wide", project, runtime, {width: 1880, height: 1056});
  }
  if (block._type === "textBlock") {
    const section = createElement("section", `project-content-block project-text-block project-text-block--${block.placement || "wide"}`);
    section.appendChild(createSanityLocalizedText(block.content, locale, `${blockPath}.content`, project, runtime));
    return section;
  }
  if (block._type === "twoColumns") {
    const row = createElement("section", "project-content-block project-two-columns");
    row.append(
      createSanityColumn(block.left, `${blockPath}.left`, project, locale, runtime),
      createSanityColumn(block.right, `${blockPath}.right`, project, locale, runtime)
    );
    return row;
  }
  if (block._type === "vimeoBlock") {
    return createSanityVimeo(block, blockPath, project, locale, runtime, block.layout === "fullWidth" ? "full" : "wide");
  }
  if (block._type === "spacerBlock") {
    const spacer = createElement("div", `project-content-block project-spacer project-spacer--${block.size || "medium"}`);
    spacer.setAttribute("aria-hidden", "true");
    return spacer;
  }
  return null;
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
  image.alt = media.decorative ? "" : media.alt || "";
  image.loading = path === "cover" ? "eager" : "lazy";
  image.decoding = "async";
  image.dataset.sanity = runtime.sanityDataAttribute({id: project._id, path: `${path}.image`});
  figure.appendChild(image);

  const caption = media.caption?.pt || media.caption?.en;
  if (caption) figure.appendChild(createElement("figcaption", "project-media-caption", caption));
  return figure;
}

function createSanityLocalizedText(content, locale, path, project, runtime) {
  const article = createElement("article", "project-localized-text");
  const localized = content?.[locale] || content?.pt || content?.en || {};
  article.dataset.sanity = runtime.sanityDataAttribute({id: project._id, path: `${path}.${locale}`});

  if (localized.title) article.appendChild(createElement("h2", "project-localized-text__title", localized.title));
  if (localized.subtitle) article.appendChild(createElement("p", "project-localized-text__subtitle", localized.subtitle));
  if (localized.body?.length) {
    const body = createElement("div", "project-localized-text__body");
    renderPortableText(body, localized.body);
    article.appendChild(body);
  }
  return article;
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

function createSanityColumn(column = {}, path, project, locale, runtime) {
  const item = createElement("div", `project-column project-column--${column.kind || "empty"}`);
  item.dataset.sanity = runtime.sanityDataAttribute({id: project._id, path});
  if (column.kind === "image") {
    item.appendChild(createSanityMedia(column.image, `${path}.image`, "project-column__media", project, runtime, {width: 928, height: 859}));
  } else if (column.kind === "text") {
    item.appendChild(createSanityLocalizedText(column.text, locale, `${path}.text`, project, runtime));
  } else if (column.kind === "vimeo") {
    item.appendChild(createSanityVimeo(column.vimeo, `${path}.vimeo`, project, locale, runtime, "column"));
  } else {
    item.setAttribute("aria-hidden", "true");
  }
  return item;
}

function createSanityVimeo(video = {}, path, project, locale, runtime, layout) {
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
    autoplay: video.autoplay ? "1" : "0",
    loop: video.loop ? "1" : "0",
    muted: video.muted ? "1" : "0",
    title: "0",
    byline: "0",
    portrait: "0",
  });
  iframe.src = `https://player.vimeo.com/video/${id}?${query.toString()}`;
  iframe.title = video.caption?.[locale] || "Vimeo video";
  iframe.loading = "lazy";
  iframe.allow = "autoplay; fullscreen; picture-in-picture";
  iframe.allowFullscreen = true;
  frame.appendChild(iframe);
  figure.appendChild(frame);

  const caption = video.caption?.[locale] || video.caption?.pt || video.caption?.en;
  if (caption) figure.appendChild(createElement("figcaption", "project-media-caption", caption));
  return figure;
}

function getVimeoId(url = "") {
  const match = String(url).match(/vimeo\.com\/(?:video\/)?(\d+)/);
  return match?.[1] || "";
}

function createSanityCredits(project, runtime) {
  const section = createElement("section", "project-cms-credits");
  const content = createElement("div", "project-cms-credits__content");
  section.id = "project-cms-credits";
  section.dataset.sanity = runtime.sanityDataAttribute({id: project._id, path: "credits"});
  section.appendChild(createBilingualHeading("Credits", "créditos"));
  (project.credits || []).forEach((credit) => {
    const item = createElement("p", "project-cms-credit");
    item.dataset.sanity = runtime.sanityDataAttribute({id: project._id, path: `credits[_key==\"${credit._key}\"]`});
    if (credit.label) item.appendChild(createElement("strong", "", `${credit.label}: `));
    item.appendChild(document.createTextNode(credit.value || ""));
    content.appendChild(item);
  });
  section.appendChild(content);
  return section;
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

function createProjectNavigation(project, projects, options = {}) {
  const nav = createElement("nav", "project-navigation");
  const index = projects.findIndex((item) => item.slug === project.slug);
  const previous = projects.length > 1 ? projects[(index - 1 + projects.length) % projects.length] : null;
  const next = projects.length > 1 ? projects[(index + 1) % projects.length] : null;
  const cmsQuery = options.cms ? "&cms=1" : "";
  const workUrl = options.cms ? "work.html?cms=1" : "work.html";
  nav.setAttribute("aria-label", "Navegação entre projetos");
  nav.append(
    createPageNavLink(previous ? `project.html?slug=${encodeURIComponent(previous.slug)}${cmsQuery}` : workUrl, "left", previous ? `Projeto anterior: ${previous.title}` : "Voltar para Work"),
    createPageNavLink(workUrl, "up", "Voltar para Work"),
    createPageNavLink(next ? `project.html?slug=${encodeURIComponent(next.slug)}${cmsQuery}` : workUrl, "right", next ? `Próximo projeto: ${next.title}` : "Voltar para Work")
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
