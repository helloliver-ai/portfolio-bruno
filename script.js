const CONTENT_URL = "data/site-content.json";
const MARQUEE_SPEED = 240;
const MARQUEE_REPEAT_COUNT = 4;
const PREVIEW_FADE_DELAY = 80;

document.addEventListener("DOMContentLoaded", async () => {
  try {
    const content = await loadSiteContent();

    if (getCurrentPage() === "about") {
      renderFigmaAbout(content.about, content.site);
      return;
    }

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
    link.textContent = (currentPage === "home" || currentPage === "work" || currentPage === "about")
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
  const kicker = document.getElementById("about-kicker");
  const portrait = document.getElementById("about-portrait");
  const textContainer = document.getElementById("about-text");
  const detailsContainer = document.getElementById("about-details");

  document.title = "About | Bruno Oliveira";

  if (portrait && about.portrait) {
    portrait.src = about.portrait.src || portrait.src;
    portrait.alt = about.portrait.alt || portrait.alt;
  }

  if (kicker) {
    kicker.textContent = about.headline?.kicker || "[headline kicker]";
  }

  if (title) {
    const lines = about.headline?.lines || ["[headline]"];
    const fragment = document.createDocumentFragment();

    lines.forEach((line, index) => {
      const lineElement = document.createElement("span");

      lineElement.className = "about-title__line";
      if (index === 0 && line.startsWith("am/ ")) {
        const prefix = document.createElement("span");

        prefix.className = "about-title__prefix";
        prefix.textContent = "am/ ";
        lineElement.append(prefix, document.createTextNode(line.slice(4)));
      } else {
        lineElement.textContent = line;
      }
      fragment.appendChild(lineElement);
    });

    title.replaceChildren(fragment);
  }

  if (textContainer) {
    const fragment = document.createDocumentFragment();

    fragment.append(
      createAboutBio("en", about.biography?.en),
      createAboutBio("pt", about.biography?.pt)
    );
    textContainer.replaceChildren(fragment);
  }

  if (detailsContainer) {
    detailsContainer.replaceChildren(createAboutDetails(about));
  }
}

function createAboutBio(language, paragraphs) {
  const section = document.createElement("section");
  const label = document.createElement("span");
  const copy = Array.isArray(paragraphs) && paragraphs.length
    ? paragraphs
    : ["[Placeholder — adicionar biografia.]"];

  section.className = `about-bio about-bio--${language}`;
  label.className = "about-bio__label";
  label.textContent = language.toUpperCase();
  section.appendChild(label);

  copy.forEach((paragraph) => {
    const text = document.createElement("p");

    text.className = "about-text";
    text.textContent = paragraph;
    section.appendChild(text);
  });

  return section;
}

function createAboutDetails(about) {
  const fragment = document.createDocumentFragment();
  const contact = document.createElement("div");
  const location = document.createElement("p");
  const socials = document.createElement("div");
  const professional = document.createElement("div");

  contact.className = "about-contact";
  contact.id = "contact";
  location.className = "about-location";
  location.replaceChildren(...(about.location || ["[location]"]).map((line) => {
    const lineElement = document.createElement("span");

    lineElement.textContent = line;
    return lineElement;
  }));

  socials.className = "about-socials";
  (about.socialLinks || []).forEach((social) => {
    socials.appendChild(createAboutSocial(social));
  });
  const locationArrow = document.createElement("span");

  locationArrow.className = "about-location-arrow";
  locationArrow.setAttribute("aria-hidden", "true");
  locationArrow.textContent = "↓";
  contact.append(location, locationArrow, socials);

  professional.className = "about-professional";
  professional.append(
    createAboutProfessionalColumn("experiência", "experience", about.experience || [], "experience"),
    createAboutProfessionalColumn("educação", "education", about.education || [], "education")
  );

  fragment.append(contact, professional);
  return fragment;
}

function createAboutSocial(social) {
  const hasUrl = Boolean(social.url);
  const socialElement = document.createElement(hasUrl ? "a" : "span");

  socialElement.className = "about-social-link";
socialElement.textContent = social.label || "[social]";

  if (hasUrl) {
    socialElement.href = social.url;
    socialElement.target = "_blank";
    socialElement.rel = "noreferrer";
  } else {
    socialElement.classList.add("is-unavailable");
    socialElement.setAttribute("aria-disabled", "true");
  }

  return socialElement;
}

function createAboutProfessionalColumn(labelPt, labelEn, items, type) {
  const column = document.createElement("section");
  const arrow = document.createElement("span");
  const heading = document.createElement("h2");
  const list = document.createElement("div");

  column.className = "about-professional-column";
  arrow.className = "about-section-arrow";
  arrow.setAttribute("aria-hidden", "true");
  arrow.textContent = "↓";
  heading.className = "about-professional-heading";
  heading.append(document.createTextNode(labelPt), document.createTextNode(" / "));
  const english = document.createElement("em");
  english.textContent = labelEn;
  heading.appendChild(english);
  list.className = "about-professional-list";

  getOrderedItems(items).forEach((item) => {
    list.appendChild(createAboutProfessionalItem(item, type));
  });

  column.append(arrow, heading, list);
  return column;
}

function getOrderedItems(items) {
  return [...items].sort((firstItem, secondItem) => (firstItem.order ?? 0) - (secondItem.order ?? 0));
}

function createAboutProfessionalItem(item, type) {
  const entry = document.createElement("article");
  const title = type === "education"
    ? item.course || "[Placeholder — adicionar curso.]"
    : item.institution || "[Placeholder — adicionar instituição.]";
  const titleElement = document.createElement(item.url ? "a" : "strong");
  const details = type === "experience"
    ? [item.role, item.period]
    : [item.institution, item.location, item.period];

  entry.className = "about-professional-item";
  titleElement.className = "about-professional-item__title";
  titleElement.textContent = title;
  if (item.url) {
    titleElement.href = item.url;
    titleElement.target = "_blank";
    titleElement.rel = "noreferrer";
  }
  entry.appendChild(titleElement);

  details.filter(Boolean).forEach((detail) => {
    const line = document.createElement("span");

    line.textContent = detail;
    entry.appendChild(line);
  });

  return entry;
}

function renderWorkPage(work) {
  renderProjects(getPublishedProjects(work.projects || []));
  renderArchive(work.archive || [], work.miscUrl);
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
  const content = document.createElement("div");
  const meta = document.createElement("div");
  const titleRow = document.createElement("div");
  const bullet = document.createElement("span");

  item.className = "project-item";
  item.dataset.title = project.title;
  content.className = "project-item__content";

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
  content.append(meta, titleRow);
  item.append(content, createProjectPreview(project));

  return item;
}

function createProjectPreview(project) {
  const preview = document.createElement("aside");
  const frame = document.createElement("div");
  const meta = document.createElement("div");
  const title = document.createElement("h2");
  const details = document.createElement("p");
  const image = document.createElement("img");
  const imageUrl = project.workPreviewImage || project.coverImage || "";

  preview.className = "project-preview";
  preview.setAttribute("aria-hidden", "true");
  frame.className = "project-preview__frame";
  meta.className = "project-preview__meta";
  title.textContent = project.title || "";
  details.textContent = [project.category, project.client, project.year].filter(Boolean).join(" · ");
  image.className = "project-preview__image";
  image.src = imageUrl;
  image.alt = "";
  image.loading = "eager";
  image.decoding = "async";

  if (!imageUrl) {
    preview.classList.add("project-preview--empty");
  }

  meta.append(title, details);
  frame.append(meta, image);
  preview.appendChild(frame);
  return preview;
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

// About desktop: frame 18:14 no Figma. Mantido isolado para não afetar Home/Work.
function renderFigmaAbout(about, site) {
  const page = document.getElementById("about-page");

  if (!page) {
    return;
  }

  document.title = "About | Bruno Oliveira";

  const canvas = createFigmaElement("section", "about-canvas");
  const navigation = createFigmaAboutNavigation(about.navigation || site.navigation || []);
  const photo = createFigmaElement("figure", "about-photo");
  const image = document.createElement("img");
  const hero = createFigmaElement("h1", "about-hero");

  image.src = about.photo;
  image.alt = about.photoAlt;
  photo.appendChild(image);

  hero.append(
    createFigmaElement("span", "about-hero__eyebrow", about.hero.eyebrow),
    document.createTextNode(" "),
    createFigmaElement("span", "about-hero__name", about.hero.name)
  );

  const contactBelow = createFigmaAboutPill(
  "about-contact-below",
  about.ctas.contactBelow
);

contactBelow.addEventListener("click", () => {
  document.querySelector(".about-socials")?.scrollIntoView({
    behavior: "smooth",
    block: "start"
  });
});

  canvas.append(
    navigation,
    createFigmaAboutRules(),
    photo,
    hero,
    createFigmaAboutBio("en", about.bio.en),
    createFigmaAboutBio("pt", about.bio.pt),
    contactBelow,
    createFigmaAboutContact(about.contact),
    createFigmaAboutExperience(about.experience),
    createFigmaAboutEducation(about.education),
    createFigmaAboutPill("about-create", about.ctas.create),
    createFigmaAboutSocials(about.socials),
    createFigmaAboutScrollControl(),
    createFigmaAboutEmail(about.contact.email)
  );

  page.replaceChildren(canvas);
}

function createFigmaAboutNavigation(items) {
  const navigation = createFigmaElement("nav", "about-navigation");

  navigation.setAttribute("aria-label", "Navegação principal");

  items.forEach((item) => {
    const link = document.createElement("a");

    link.className = `about-navigation__link about-navigation__link--${item.page}`;
    link.href = item.url;
    link.textContent = item.label;

    if (item.page === "about") {
      link.setAttribute("aria-current", "page");
    }

    navigation.appendChild(link);
  });

  return navigation;
}

function createFigmaAboutRules() {
  const rules = createFigmaElement("div", "about-rules");
  const names = [
    "top", "navigation", "intro", "photo-column", "main-column",
    "navigation-left", "navigation-right", "profile-bottom", "experience-top",
    "experience-bottom", "social-bottom", "page-bottom",
  ];

  names.forEach((name) => {
    rules.appendChild(createFigmaElement("span", `about-rule about-rule--${name}`));
  });

  return rules;
}

function createFigmaAboutBio(language, content) {
  const bio = createFigmaElement("article", `about-bio about-bio--${language}`);
  const first = document.createElement("p");
  const label = createFigmaElement("strong", "about-bio__label", content.label);
  const lead = document.createTextNode(` ${content.lead}`);
  const second = createFigmaElement("p", "", content.detail);

  first.append(label, lead);
  bio.append(first, second);
  return bio;
}

function createFigmaAboutPill(className, label) {
  const wrapper = createFigmaElement("div", `about-pill ${className}`);
  const pill = createFigmaElement("div", "about-pill__shape");
  const text = createFigmaElement("span", "about-pill__text", label);

  pill.appendChild(text);
  wrapper.appendChild(pill);
  return wrapper;
}

function createFigmaAboutContact(contactData) {
  const contact = createFigmaElement("p", "about-contact");

  contact.append(
    document.createTextNode(`/${contactData.role}`),
    document.createElement("br"),
    document.createTextNode(contactData.city),
    document.createElement("br"),
    document.createTextNode(contactData.region)
  );

  return contact;
}

function createFigmaAboutExperience(experience) {
  const section = createFigmaElement("section", "about-experience");
  const heading = createFigmaAboutSectionHeading(experience.title, experience.translation);
  const entries = createFigmaElement("div", "about-experience__entries");

  experience.entries.forEach((entry) => {
    const item = createFigmaElement("article", "about-experience__entry");

    item.append(
      createFigmaElement("p", "about-experience__company", `${entry.company}↗`),
      createFigmaElement("p", "", entry.role),
      createFigmaElement("p", "", entry.period)
    );
    entries.appendChild(item);
  });

  section.append(heading, entries);
  return section;
}

function createFigmaAboutEducation(education) {
  const section = createFigmaElement("section", "about-education");
  const heading = createFigmaAboutSectionHeading(education.title, education.translation);

  section.append(
    heading,
    createFigmaElement("p", "about-education__course", education.course),
    createFigmaElement("p", "about-education__school", education.school)
  );
  return section;
}

function createFigmaAboutSectionHeading(title, translation) {
  const heading = createFigmaElement("h2", "about-section-heading");
  const arrow = createFigmaElement("span", "about-section-heading__arrow", "↓");
  const label = createFigmaElement("span", "about-section-heading__label", title);
  const secondary = createFigmaElement("em", "", ` / ${translation}`);

  heading.append(arrow, label, secondary);
  return heading;
}

function createFigmaAboutSocials(items) {
  const socials = createFigmaElement("div", "about-socials");

  items.forEach((item) => {
    socials.appendChild(createFigmaElement("p", "social-link", item.label));
  });

  return socials;
}

function createFigmaAboutEmail(email) {
  const contact = createFigmaElement("p", "email-contact");
  const text = createFigmaElement("span", "email-contact__text", email);

  contact.appendChild(text);
  return contact;
}

function createFigmaAboutScrollControl() {
  const control = createFigmaElement("div", "about-scroll-control");

  control.setAttribute("aria-hidden", "true");
  control.appendChild(createFigmaElement("span", "about-scroll-control__arrow", "↑"));
  return control;
}

function createFigmaElement(tagName, className = "", text = "") {
  const element = document.createElement(tagName);

  if (className) {
    element.className = className;
  }

  if (text) {
    element.textContent = text;
  }

  return element;
}
