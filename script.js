const navToggle = document.querySelector(".nav-toggle");
const navLinks = document.querySelector(".nav-links");
const filterButtons = document.querySelectorAll(".filter-button");
const projectCards = document.querySelectorAll(".project-card");
const revealItems = document.querySelectorAll(".reveal");
const reviewGrid = document.querySelector("#review-grid");
const briefForm = document.querySelector("#brief-form");
const chatLaunch = document.querySelector("#chat-launch");
const chatWidget = document.querySelector("#hetu-chat");
const chatClose = document.querySelector("#chat-close");
const chatMessages = document.querySelector("#chat-messages");
const chatForm = document.querySelector("#chat-form");
const chatInput = document.querySelector("#chat-input");
const chatSuggestions = document.querySelectorAll(".chat-suggestions button");

const reviewEntries = [
  {
    label: "Invitation card feedback",
    title: "Wedding and event reviews can be added here",
    text: "Once an invitation project is delivered, the client name, event type, and real feedback can be published in this card.",
    slot: "Prepared for future invite feedback",
  },
  {
    label: "Website feedback",
    title: "Website clients can be highlighted clearly",
    text: "This layout is ready for live feedback after a launch, including what was built and how the client felt about the final result.",
    slot: "Prepared for future website feedback",
  },
  {
    label: "Reels editing feedback",
    title: "Short-form editing reviews can appear in the same style",
    text: "Reel clients can share how the pacing, captions, and visual style helped their content feel stronger and more modern.",
    slot: "Prepared for future reels feedback",
  },
  {
    label: "Branding feedback",
    title: "Branding and brochure feedback fits neatly in this section",
    text: "Once branding or brochure work is delivered, this card can hold real comments about clarity, visual polish, and presentation quality.",
    slot: "Prepared for future branding feedback",
  },
  {
    label: "Creator support feedback",
    title: "Influencer and creator feedback can be showcased professionally",
    text: "Profile pages, kits, and social layouts can later be backed by real creator comments in this same review wall.",
    slot: "Prepared for future creator feedback",
  },
  {
    label: "Support feedback",
    title: "Update and after-launch support can also be reviewed here",
    text: "This slot is ready for feedback about response speed, content changes, and the overall support experience after the first delivery.",
    slot: "Prepared for future support feedback",
  },
];

const chatKnowledge = [
  {
    keywords: ["website", "web", "landing", "portfolio", "site"],
    reply:
      "For a website, I usually suggest a strong hero section, clear services, project visuals, trust-building blocks, WhatsApp contact, and a simple call to action. If you tell me the business type, I can suggest a homepage structure.",
  },
  {
    keywords: ["invitation", "invite", "card", "wedding", "birthday"],
    reply:
      "For invitation work, I can suggest luxury, floral, minimal, royal, modern social, or bright youthful styles. Share the event type, colors, and date format you want, and I can guide the concept.",
  },
  {
    keywords: ["brochure", "flyer", "menu", "print"],
    reply:
      "Brochure work is best when the content is split into clear sections like services, pricing, highlights, and contact details. A clean hierarchy makes the design look more premium and easier to trust.",
  },
  {
    keywords: ["reel", "video", "edit", "instagram", "short"],
    reply:
      "For reels editing, I can suggest a fast hook in the first seconds, subtitle styling, punchy cuts, matching cover art, and a clearer end CTA so the content feels more professional.",
  },
  {
    keywords: ["influencer", "creator", "media kit", "profile", "collab"],
    reply:
      "Influencer support can include profile visuals, highlight covers, media kit pages, story templates, and a clean page that helps brands understand your style and value quickly.",
  },
  {
    keywords: ["brand", "branding", "logo", "color", "font", "identity"],
    reply:
      "Branding works best when colors, fonts, post templates, brochure layout, and website sections all feel connected. I can suggest a simple brand direction if you tell me your niche and vibe.",
  },
  {
    keywords: ["price", "budget", "cost", "charge"],
    reply:
      "Pricing depends on scope, revisions, and delivery type. Small invitation work can stay budget-friendly, while websites, reels, and branding packs scale by complexity. Send the brief and I can help shape the right package.",
  },
  {
    keywords: ["time", "delivery", "deadline", "urgent"],
    reply:
      "Fast delivery is possible for smaller layouts and single-page work. The best approach is to share your deadline, required sections, and reference style so the workflow stays clear from the start.",
  },
  {
    keywords: ["backend", "support", "update", "form", "whatsapp"],
    reply:
      "Website support can include WhatsApp buttons, contact flow planning, section edits, content updates, and post-launch polish. If you need advanced backend systems later, the project can be scoped separately.",
  },
  {
    keywords: ["interior", "room", "mood", "showcase"],
    reply:
      "Interior pages look strongest with mood boards, materials, color swatches, sectioned room views, and short descriptive notes that keep the presentation premium and easy to scan.",
  },
];

function shuffle(list) {
  const copy = [...list];

  for (let index = copy.length - 1; index > 0; index -= 1) {
    const swapIndex = Math.floor(Math.random() * (index + 1));
    [copy[index], copy[swapIndex]] = [copy[swapIndex], copy[index]];
  }

  return copy;
}

function renderReviewGrid() {
  if (!reviewGrid) {
    return;
  }

  const selected = shuffle(reviewEntries).slice(0, 4);

  reviewGrid.innerHTML = selected
    .map(
      (entry) => `
        <article class="review-card reveal is-visible">
          <div class="review-card-label">${entry.label}</div>
          <h3>${entry.title}</h3>
          <p>${entry.text}</p>
          <strong>${entry.slot}</strong>
        </article>
      `
    )
    .join("");
}

function appendChatMessage(role, text) {
  if (!chatMessages) {
    return;
  }

  const article = document.createElement("article");
  article.className = `chat-message ${role}`;

  const paragraph = document.createElement("p");
  paragraph.textContent = text;
  article.appendChild(paragraph);
  chatMessages.appendChild(article);
  chatMessages.scrollTop = chatMessages.scrollHeight;
}

function getHetuReply(message) {
  const normalizedMessage = message.toLowerCase();

  if (!normalizedMessage.trim()) {
    return "Tell me what you want to create and I will suggest a structure, style direction, or service fit.";
  }

  if (normalizedMessage.includes("hi") || normalizedMessage.includes("hello") || normalizedMessage.includes("hey")) {
    return "Hi. Tell me your project type, style, and goal, and I will suggest a direction for it.";
  }

  const match = chatKnowledge.find((entry) =>
    entry.keywords.some((keyword) => normalizedMessage.includes(keyword))
  );

  if (match) {
    return match.reply;
  }

  return "A strong start is to define your goal, audience, colors, and what action you want the client to take. If you tell me whether this is for a website, card, reel, brochure, or brand, I can give a sharper idea.";
}

function setChatOpenState(isOpen) {
  if (!chatLaunch || !chatWidget) {
    return;
  }

  chatLaunch.setAttribute("aria-expanded", String(isOpen));
  chatWidget.classList.toggle("open", isOpen);
  chatWidget.setAttribute("aria-hidden", String(!isOpen));

  if (isOpen && chatInput) {
    chatInput.focus();
  }
}

if (navToggle && navLinks) {
  navToggle.addEventListener("click", () => {
    const expanded = navToggle.getAttribute("aria-expanded") === "true";
    navToggle.setAttribute("aria-expanded", String(!expanded));
    navLinks.classList.toggle("open", !expanded);
  });

  navLinks.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      navToggle.setAttribute("aria-expanded", "false");
      navLinks.classList.remove("open");
    });
  });
}

filterButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const selectedFilter = button.dataset.filter;

    filterButtons.forEach((item) => {
      item.classList.remove("active");
      item.setAttribute("aria-pressed", "false");
    });
    button.classList.add("active");
    button.setAttribute("aria-pressed", "true");

    projectCards.forEach((card) => {
      const matches = selectedFilter === "all" || card.dataset.category === selectedFilter;
      card.classList.toggle("hidden", !matches);
    });
  });
});

if ("IntersectionObserver" in window) {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) {
          return;
        }

        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);
      });
    },
    { threshold: 0.18 }
  );

  revealItems.forEach((item) => observer.observe(item));
} else {
  revealItems.forEach((item) => item.classList.add("is-visible"));
}

renderReviewGrid();

if (briefForm) {
  briefForm.addEventListener("submit", (event) => {
    event.preventDefault();

    const formData = new FormData(briefForm);
    const name = formData.get("name");
    const service = formData.get("service");
    const budget = formData.get("budget");
    const timeline = formData.get("timeline");
    const message = formData.get("message");

    const whatsappMessage = [
      "Hello Hetu, I want to discuss a project.",
      `Name: ${name}`,
      `Service: ${service}`,
      `Budget: ${budget}`,
      `Timeline: ${timeline}`,
      `Project idea: ${message}`,
    ].join("\n");

    const url = `https://wa.me/919313805058?text=${encodeURIComponent(whatsappMessage)}`;
    window.open(url, "_blank", "noopener");
  });
}

if (chatLaunch) {
  chatLaunch.addEventListener("click", () => {
    const isOpen = chatLaunch.getAttribute("aria-expanded") === "true";
    setChatOpenState(!isOpen);
  });
}

if (chatClose) {
  chatClose.addEventListener("click", () => {
    setChatOpenState(false);
  });
}

chatSuggestions.forEach((button) => {
  button.addEventListener("click", () => {
    const question = button.dataset.question;
    appendChatMessage("user", question);
    appendChatMessage("bot", getHetuReply(question));
    setChatOpenState(true);
  });
});

if (chatForm && chatInput) {
  chatForm.addEventListener("submit", (event) => {
    event.preventDefault();

    const message = chatInput.value.trim();
    if (!message) {
      return;
    }

    appendChatMessage("user", message);
    appendChatMessage("bot", getHetuReply(message));
    chatInput.value = "";
  });
}

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") {
    setChatOpenState(false);
  }
});
