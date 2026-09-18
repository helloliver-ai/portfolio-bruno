const CONTENT_URL = "data/site-content.json";
const MARQUEE_SPEED = 240;
const MARQUEE_REPEAT_COUNT = 4;
const PREVIEW_FADE_DELAY = 80;

document.addEventListener("DOMContentLoaded", async () => {
  try {
    const content = await loadSiteContent();

    if (getCurrentPage() === "about") {
      renderAbout(content.about, content.site);
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
  const nav = document.createElement("nav");

  nav.className = "portfolio-nav";
  nav.setAttribute("aria-label", "Navegação principal");

  site.navigation.forEach((item) => {
    const link = document.createElement("a");

    link.href = item.url;
    link.className = "portfolio-nav__link";
    link.textContent = item.label;

    if (item.page === currentPage) {
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

function renderAbout(about, site) {
  const page = document.getElementById("about-page");

  if (!page) {
    return;
  }

  document.title = "About | Bruno Oliveira";

  const canvas = createElement("section", "about-canvas");
  const navigation = createAboutNavigation(about.navigation || site.navigation || []);
  const photo = createElement("figure", "about-photo");
  const image = document.createElement("img");
  const hero = createElement("h1", "about-hero");

  image.src = about.photo;
  image.alt = about.photoAlt;
  photo.appendChild(image);

  hero.append(
    createElement("span", "about-hero__eyebrow", about.hero.eyebrow),
    document.createTextNode(" "),
    createElement("span", "about-hero__name", about.hero.name)
  );

  canvas.append(
    navigation,
    createAboutRules(),
    photo,
    hero,
    createAboutBio("en", about.bio.en),
    createAboutBio("pt", about.bio.pt),
    createAboutPill("about-contact-below", about.ctas.contactBelow),
    createAboutContact(about.contact),
    createAboutExperience(about.experience),
    createAboutEducation(about.education),
    createAboutPill("about-create", about.ctas.create),
    createAboutSocials(about.socials),
    createAboutScrollControl(),
    createElement("p", "about-email", about.contact.email)
  );

  page.replaceChildren(canvas);
}

function createAboutNavigation(items) {
  const navigation = createElement("nav", "about-navigation");

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

function createAboutRules() {
  const rules = createElement("div", "about-rules");
  const names = [
    "top",
    "navigation",
    "intro",
    "photo-column",
    "main-column",
    "navigation-left",
    "navigation-right",
    "profile-bottom",
    "experience-top",
    "experience-bottom",
    "social-bottom",
    "page-bottom",
  ];

  names.forEach((name) => {
    rules.appendChild(createElement("span", `about-rule about-rule--${name}`));
  });

  return rules;
}

function createAboutBio(language, content) {
  const bio = createElement("article", `about-bio about-bio--${language}`);
  const first = document.createElement("p");
  const label = createElement("strong", "about-bio__label", content.label);
  const lead = document.createTextNode(` ${content.lead}`);
  const second = createElement("p", "", content.detail);

  first.append(label, lead);
  bio.append(first, second);
  return bio;
}

function createAboutPill(className, label) {
  const wrapper = createElement("div", `about-pill ${className}`);
  const pill = createElement("div", "about-pill__shape");
  const text = createElement("span", "about-pill__text", label);

  pill.appendChild(text);
  wrapper.appendChild(pill);
  return wrapper;
}

function createAboutContact(contactData) {
  const contact = createElement("p", "about-contact");

  contact.append(
    document.createTextNode(`/${contactData.role}`),
    document.createElement("br"),
    document.createTextNode(contactData.city),
    document.createElement("br"),
    document.createTextNode(contactData.region)
  );

  return contact;
}

function createAboutExperience(experience) {
  const section = createElement("section", "about-experience");
  const heading = createAboutSectionHeading(experience.title, experience.translation);
  const entries = createElement("div", "about-experience__entries");

  experience.entries.forEach((entry) => {
    const item = createElement("article", "about-experience__entry");

    item.append(
      createElement("p", "about-experience__company", `${entry.company}↗`),
      createElement("p", "", entry.role),
      createElement("p", "", entry.period)
    );
    entries.appendChild(item);
  });

  section.append(heading, entries);
  return section;
}

function createAboutEducation(education) {
  const section = createElement("section", "about-education");
  const heading = createAboutSectionHeading(education.title, education.translation);

  section.append(
    heading,
    createElement("p", "about-education__course", education.course),
    createElement("p", "about-education__school", education.school)
  );
  return section;
}

function createAboutSectionHeading(title, translation) {
  const heading = createElement("h2", "about-section-heading");
  const arrow = createElement("span", "about-section-heading__arrow", "↓");
  const label = createElement("span", "about-section-heading__label", title);
  const secondary = createElement("em", "", ` / ${translation}`);

  heading.append(arrow, label, secondary);
  return heading;
}

function createAboutSocials(items) {
  const socials = createElement("div", "about-socials");

  items.forEach((item) => {
    socials.appendChild(createElement("p", "about-socials__item", `${item.label}↗`));
  });

  return socials;
}

function createAboutScrollControl() {
  const control = createElement("div", "about-scroll-control");

  control.setAttribute("aria-hidden", "true");
  control.appendChild(createElement("span", "about-scroll-control__arrow", "↑"));
  return control;
}

function createElement(tagName, className = "", text = "") {
  const element = document.createElement(tagName);

  if (className) {
    element.className = className;
  }

  if (text) {
    element.textContent = text;
  }

  return element;
}

function renderWorkPage(work) {
  renderProjects(work.projects || []);
  renderArchive(work.archive || [], work.miscUrl);
  setupProjectPreview();
  updateMarqueesWhenReady();
  window.addEventListener("resize", requestMarqueeUpdate);
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
  item.dataset.image = project.image || "";
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
  const hasLink = Boolean(project.url) && project.status !== "comingSoon";
  const titleElement = document.createElement(hasLink ? "a" : "span");
  const marquee = document.createElement("div");

  titleElement.className = hasLink ? "project-title-link" : "project-title-link no-link";
  marquee.className = "marquee-wrapper";

  if (hasLink) {
    titleElement.href = project.url;
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
