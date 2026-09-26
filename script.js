const storageKey = "alaqard-static-care-guide-v2";

const externalLinks = {
  providers: "https://www.abcop.org/abc-directory",
  support: "https://amputee-coalition.org/service/find-support-services/"
};

const userTypes = [
  {
    id: "amputee",
    title: "Person with limb loss",
    desc: "I am navigating limb loss and want a clearer path through prosthetic care."
  },
  {
    id: "parent",
    title: "Parent or guardian",
    desc: "I am supporting a child with limb loss or limb difference."
  },
  {
    id: "caregiver",
    title: "Caregiver or supporter",
    desc: "I help someone manage appointments, decisions, rehabilitation, or next steps."
  }
];

const amputationLevels = {
  upper: [
    "Partial hand",
    "Wrist disarticulation",
    "Transradial",
    "Elbow disarticulation",
    "Transhumeral",
    "Shoulder disarticulation"
  ],
  lower: [
    "Partial foot",
    "Ankle disarticulation",
    "Transtibial",
    "Knee disarticulation",
    "Transfemoral",
    "Hip disarticulation"
  ]
};

const lifestyles = ["Daily living", "Active", "Work-focused", "Sport-focused"];

const processSteps = [
  {
    id: "Referral",
    what: "A physician, surgeon, rehabilitation professional, or other member of the care team may connect the patient with prosthetic and rehabilitation services.",
    who: "Physician or surgeon, rehabilitation team, prosthetist, family or caregiver",
    prepare: "Bring available medical records, discharge information, medication information, and questions about what happens next."
  },
  {
    id: "Evaluation",
    what: "The care team reviews health, limb condition, function, daily activities, goals, and readiness for rehabilitation or prosthetic use.",
    who: "Prosthetist, physician or physiatrist, physical therapist, occupational therapist, family or caregiver",
    prepare: "Think about your daily activities, mobility needs, work or school demands, pain, transportation, and personal goals."
  },
  {
    id: "Measurement",
    what: "The prosthetist evaluates the residual limb and records measurements or other information needed to design and fit a prosthesis.",
    who: "Prosthetist and, depending on the case, technicians or rehabilitation professionals",
    prepare: "Report skin problems, swelling, pressure-sensitive areas, changes in limb size, and activities you want the device to support."
  },
  {
    id: "Fitting",
    what: "A prosthetic socket and components are fitted and adjusted. More than one visit may be needed as comfort, alignment, and function are evaluated.",
    who: "Prosthetist, technician, and rehabilitation professionals as needed",
    prepare: "Describe pressure, discomfort, instability, control problems, or changes in your residual limb as specifically as possible."
  },
  {
    id: "Training",
    what: "Physical or occupational therapy may focus on safe prosthetic use, mobility, balance, daily activities, strength, range of motion, and device management.",
    who: "Physical therapist, occupational therapist, prosthetist, patient, family or caregiver",
    prepare: "Bring the prosthesis and any related equipment, and identify the tasks and environments that matter most in your daily life."
  },
  {
    id: "Follow-Up",
    what: "Ongoing care can include fit checks, adjustments, repairs, skin monitoring, rehabilitation updates, and reassessment as the body, goals, or activity level change.",
    who: "Prosthetist, rehabilitation professionals, physician or other clinicians as needed",
    prepare: "Track fit changes, skin issues, pain, wear time, device problems, and activities that are becoming easier or harder."
  }
];

const resourceLibrary = [
  {
    id: "start-here",
    title: "Start Here: Understanding Prosthetic Care",
    items: [
      {
        title: "Artificial Limbs",
        source: "MedlinePlus — U.S. National Library of Medicine",
        summary: "A plain-language overview of artificial limbs, why a prosthesis may be used, and links to additional patient information about limb loss and prosthetic care.",
        url: "https://medlineplus.gov/artificiallimbs.html",
        linkText: "Open MedlinePlus"
      },
      {
        title: "Prosthetic FAQs for the New Amputee",
        source: "Amputee Coalition",
        summary: "Answers common questions about deciding whether to use a prosthesis, choosing a prosthetist, fitting, rehabilitation, follow-up, maintenance, and support.",
        url: "https://amputee-coalition.org/resources/prosthetic-faqs-for-the-new-amputee/",
        linkText: "Read the FAQ"
      }
    ]
  },
  {
    id: "rehabilitation",
    title: "Physical Therapy & Rehabilitation",
    items: [
      {
        title: "Below-Knee Amputation: Physical Therapy Guide",
        source: "ChoosePT — American Physical Therapy Association",
        summary: "Covers rehabilitation after transtibial amputation, including mobility, strength, range of motion, residual-limb care, prosthetic fitting, gait training, and return to activity.",
        url: "https://www.choosept.com/guide/physical-therapy-guide-below-knee-amputation",
        linkText: "Read the PT guide"
      },
      {
        title: "Above-Knee Amputation: Physical Therapy Guide",
        source: "ChoosePT — American Physical Therapy Association",
        summary: "Explains how physical therapy may support recovery after transfemoral amputation, including mobility, positioning, strengthening, prosthetic training, and gait training.",
        url: "https://www.choosept.com/guide/physical-therapy-guide-above-knee-amputation",
        linkText: "Read the PT guide"
      },
      {
        title: "Physical Therapy Guide to Phantom Limb Pain",
        source: "ChoosePT — American Physical Therapy Association",
        summary: "Explains phantom limb pain and describes physical-therapy approaches that may be used as part of individualized pain management and rehabilitation.",
        url: "https://www.choosept.com/guide/physical-therapy-guide-phantom-limb-pain",
        linkText: "Read the pain guide"
      },
      {
        title: "Getting the Most Out of Physical Therapy",
        source: "Amputee Coalition",
        summary: "A patient-focused overview of rehabilitation phases, from pre-operative and post-operative care through prosthetic training, reintegration, and maintenance.",
        url: "https://amputee-coalition.org/resources/getting-the-most-out-of-physical-therapy-fs/",
        linkText: "Read the rehabilitation guide"
      }
    ]
  },
  {
    id: "professionals",
    title: "Find Professionals & Clinics",
    items: [
      {
        title: "ABC Directory: Certified Professionals and Accredited Facilities",
        source: "American Board for Certification in Orthotics, Prosthetics & Pedorthics",
        summary: "Search by location for ABC-certified practitioners or ABC-accredited orthotic and prosthetic facilities, and verify current certification or accreditation status.",
        url: "https://www.abcop.org/abc-directory",
        linkText: "Search the ABC Directory"
      },
      {
        title: "Find a Physical Therapist",
        source: "ChoosePT — American Physical Therapy Association",
        summary: "Search for physical therapists by location and filter by specialty, telehealth, or home-visit options. Contact the clinic directly to confirm experience with limb loss or prosthetic rehabilitation.",
        url: "https://www.choosept.com/find-a-pt",
        linkText: "Search for a PT"
      },
      {
        title: "VA Amputation Specialty Care",
        source: "U.S. Department of Veterans Affairs",
        summary: "Information for eligible Veterans and service members about the VA Amputation System of Care, including rehabilitation, prosthetic services, and specialized amputation-care teams.",
        url: "https://www.rehab.va.gov/asoc/",
        linkText: "Open VA Amputation Services"
      }
    ]
  },
  {
    id: "coverage",
    title: "Coverage & Cost Information",
    items: [
      {
        title: "Medicare Coverage for Artificial Eyes & Limbs",
        source: "Medicare.gov",
        summary: "Explains Medicare Part B coverage for medically necessary artificial arms, legs, and eyes when ordered by a doctor or other health care provider, including general cost-sharing information.",
        url: "https://www.medicare.gov/coverage/artificial-eyes-limbs",
        linkText: "Review Medicare coverage"
      },
      {
        title: "Questions About Prosthetic Coverage",
        source: "Amputee Coalition",
        summary: "The Amputee Coalition's prosthetic FAQ discusses common insurance questions and points users to additional coverage and reimbursement support through its National Limb Loss Resource Center.",
        url: "https://amputee-coalition.org/resources/prosthetic-faqs-for-the-new-amputee/",
        linkText: "Review insurance guidance"
      }
    ]
  },
  {
    id: "support",
    title: "Peer & Community Support",
    items: [
      {
        title: "National Limb Loss Resource Center & Support Services",
        source: "Amputee Coalition",
        summary: "Access free educational resources, information and referral support, peer connections, and programs for people with limb loss or limb difference and their families.",
        url: "https://amputee-coalition.org/service/find-support-services/",
        linkText: "Open support services"
      },
      {
        title: "Find a Support Group",
        source: "Amputee Coalition",
        summary: "Find in-person and virtual support-group options for people with limb loss or limb difference and family members who support them.",
        url: "https://amputee-coalition.org/service/find-a-support-group/",
        linkText: "Find a support group"
      }
    ]
  },
  {
    id: "pediatric",
    title: "Pediatric & Family Resources",
    onlyFor: "parent",
    items: [
      {
        title: "Pediatric Limb Loss and Limb Difference: An Introduction for Parents",
        source: "Amputee Coalition",
        summary: "An introductory resource for families covering congenital and acquired limb difference, care-team considerations, prosthetic decisions, growth, rehabilitation, and additional family resources.",
        url: "https://amputee-coalition.org/resources/pediatric-limb-loss-and-limb-difference-an-introduction-for-parents/",
        linkText: "Read the parent guide"
      },
      {
        title: "Youth & Family Support",
        source: "Amputee Coalition",
        summary: "Programs and resources for young people with limb loss or limb difference, parents, and caregivers, including peer support, family guidance, and youth opportunities.",
        url: "https://amputee-coalition.org/empowering-the-next-generation/",
        linkText: "Open youth & family resources"
      }
    ]
  }
];

const state = loadState();
let activeView = "gateway";
let activeProcessStep = 0;

function loadState() {
  try {
    return JSON.parse(localStorage.getItem(storageKey)) || {
      userType: "",
      limbType: "",
      amputationLevel: "",
      lifestyle: ""
    };
  } catch {
    return { userType: "", limbType: "", amputationLevel: "", lifestyle: "" };
  }
}

function saveState() {
  localStorage.setItem(storageKey, JSON.stringify(state));
}

function updateProgress() {
  const values = [state.userType, state.limbType, state.amputationLevel, state.lifestyle];
  const filled = values.filter(Boolean).length;
  const pct = Math.round((filled / values.length) * 100);
  document.getElementById("progressText").textContent = pct + "%";
  document.getElementById("progressFill").style.width = pct + "%";
}

function setView(viewId) {
  activeView = viewId;
  document.querySelectorAll(".view").forEach(view => view.classList.remove("active"));
  document.getElementById(viewId).classList.add("active");

  document.querySelectorAll(".nav-btn").forEach(btn => {
    btn.classList.toggle("active", btn.dataset.viewBtn === viewId);
  });

  window.scrollTo({ top: 0, behavior: "smooth" });
}

function renderUserChoices() {
  const box = document.getElementById("userChoices");
  box.innerHTML = "";

  userTypes.forEach(item => {
    const btn = document.createElement("button");
    btn.type = "button";
    btn.className = "choice" + (state.userType === item.id ? " active" : "");
    btn.innerHTML = `<strong>${item.title}</strong><small>${item.desc}</small>`;

    btn.addEventListener("click", () => {
      state.userType = item.id;
      saveState();
      renderAll();
    });

    box.appendChild(btn);
  });
}

function renderLifestyleChoices() {
  const box = document.getElementById("lifestyleChoices");
  box.innerHTML = "";

  lifestyles.forEach(item => {
    const btn = document.createElement("button");
    btn.type = "button";
    btn.className = "pill" + (state.lifestyle === item ? " active" : "");
    btn.textContent = item;

    btn.addEventListener("click", () => {
      state.lifestyle = item;
      saveState();
      renderAll();
    });

    box.appendChild(btn);
  });
}

function renderLevelOptions() {
  const select = document.getElementById("ampLevel");
  const currentOptions = state.limbType ? amputationLevels[state.limbType] : [];

  select.disabled = !state.limbType;
  select.innerHTML = `<option value="">Select amputation level</option>` +
    currentOptions.map(level => `<option value="${level}">${level}</option>`).join("");
  select.value = state.amputationLevel || "";
}

function renderSummary() {
  const user = userTypes.find(item => item.id === state.userType);

  document.getElementById("summaryUser").textContent = user ? user.title : "Not selected";
  document.getElementById("summaryLimb").textContent =
    state.limbType ? (state.limbType === "upper" ? "Upper limb" : "Lower limb") : "Not selected";
  document.getElementById("summaryLevel").textContent = state.amputationLevel || "Not selected";
  document.getElementById("summaryLifestyle").textContent = state.lifestyle || "Not selected";
}

function renderProfileTags() {
  const tags = document.getElementById("profileTags");
  const user = userTypes.find(item => item.id === state.userType);

  const values = [
    user ? user.title : "No user type selected",
    state.limbType ? (state.limbType === "upper" ? "Upper limb" : "Lower limb") : "No limb classification",
    state.amputationLevel || "No amputation level",
    state.lifestyle || "No lifestyle priority"
  ];

  tags.innerHTML = values.map(item => `<span class="tag">${item}</span>`).join("");
}

function renderResources() {
  const holder = document.getElementById("resourceAccordions");
  holder.innerHTML = "";

  const filtered = resourceLibrary.filter(section => !section.onlyFor || section.onlyFor === state.userType);

  filtered.forEach((section, index) => {
    const card = document.createElement("section");
    card.className = "card accordion" + (index === 0 ? " open" : "");

    const bodyHtml = section.items.map(item => `
      <article class="module">
        <div class="resource-source">${item.source}</div>
        <h4>${item.title}</h4>
        <p>${item.summary}</p>
        <a class="resource-link" href="${item.url}" target="_blank" rel="noopener noreferrer">
          ${item.linkText} <span aria-hidden="true">↗</span>
        </a>
      </article>
    `).join("");

    card.innerHTML = `
      <button class="head" type="button" aria-expanded="${index === 0 ? "true" : "false"}">
        <span>${section.title}</span>
        <span class="accordion-symbol" aria-hidden="true">${index === 0 ? "−" : "+"}</span>
      </button>
      <div class="body">${bodyHtml}</div>
    `;

    const head = card.querySelector(".head");
    const symbol = card.querySelector(".accordion-symbol");

    head.addEventListener("click", () => {
      card.classList.toggle("open");
      const isOpen = card.classList.contains("open");
      head.setAttribute("aria-expanded", String(isOpen));
      symbol.textContent = isOpen ? "−" : "+";
    });

    holder.appendChild(card);
  });
}

function renderFlowButtons() {
  const holder = document.getElementById("flowButtons");
  holder.innerHTML = "";

  processSteps.forEach((step, index) => {
    const btn = document.createElement("button");
    btn.type = "button";
    btn.className = "step-btn" + (index === activeProcessStep ? " active" : "");
    btn.innerHTML = `<div class="step-num">${index + 1}</div><div>${step.id}</div>`;

    btn.addEventListener("click", () => {
      activeProcessStep = index;
      renderFlowButtons();
      renderProcessDetail();
    });

    holder.appendChild(btn);
  });
}

function renderProcessDetail() {
  const step = processSteps[activeProcessStep];
  document.getElementById("processTitle").textContent = step.id;
  document.getElementById("processWhat").textContent = step.what;
  document.getElementById("processWho").textContent = step.who;
  document.getElementById("processPrepare").textContent = step.prepare;
}

function updateContinueButtons() {
  document.getElementById("continueGateway").disabled = !state.userType;

  const profileComplete = Boolean(
    state.userType &&
    state.limbType &&
    state.amputationLevel &&
    state.lifestyle
  );

  document.getElementById("continuePathway").disabled = !profileComplete;
}

function renderAll() {
  renderUserChoices();
  renderLifestyleChoices();
  renderLevelOptions();
  document.getElementById("limbType").value = state.limbType || "";
  renderSummary();
  renderProfileTags();
  renderResources();
  renderFlowButtons();
  renderProcessDetail();
  updateProgress();
  updateContinueButtons();
}

document.querySelectorAll("[data-view-btn]").forEach(btn => {
  btn.addEventListener("click", () => setView(btn.dataset.viewBtn));
});

document.getElementById("continueGateway").addEventListener("click", () => {
  if (state.userType) setView("pathway");
});

document.getElementById("continuePathway").addEventListener("click", () => {
  const complete = state.userType && state.limbType && state.amputationLevel && state.lifestyle;
  if (complete) setView("resources");
});

document.getElementById("resetPathway").addEventListener("click", () => {
  state.limbType = "";
  state.amputationLevel = "";
  state.lifestyle = "";
  saveState();
  renderAll();
});

document.getElementById("limbType").addEventListener("change", event => {
  state.limbType = event.target.value;
  state.amputationLevel = "";
  saveState();
  renderAll();
});

document.getElementById("ampLevel").addEventListener("change", event => {
  state.amputationLevel = event.target.value;
  saveState();
  renderAll();
});

document.querySelectorAll("[data-action]").forEach(btn => {
  btn.addEventListener("click", () => {
    const action = btn.dataset.action;

    if (action === "profile") {
      setView("pathway");
      return;
    }

    if (externalLinks[action]) {
      window.open(externalLinks[action], "_blank", "noopener,noreferrer");
    }
  });
});

renderAll();
setView(activeView);
