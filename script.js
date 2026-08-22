const storageKey = "alaqard-static-care-guide-v1";

    const userTypes = [
      {
        id: "amputee",
        title: "Amputee",
        desc: "I need a clear starting point into prosthetic care."
      },
      {
        id: "parent",
        title: "Parent",
        desc: "My child has a newborn limb difference and I need guidance."
      },
      {
        id: "caregiver",
        title: "Caregiver",
        desc: "I help someone navigate appointments, decisions, and next steps."
      }
    ];

    const amputationLevels = {
      upper: ["Partial hand", "Wrist disarticulation", "Transradial", "Elbow disarticulation", "Transhumeral", "Shoulder disarticulation"],
      lower: ["Partial foot", "Ankle disarticulation", "Transtibial", "Knee disarticulation", "Transfemoral", "Hip disarticulation"]
    };

    const lifestyles = ["Daily living", "Active", "Work-focused", "Sport-focused"];

    const processSteps = [
      {
        id: "Referral",
        what: "A physician, surgeon, pediatric specialist, or care team points the user toward prosthetic care services.",
        who: "Physician, surgeon, discharge planner, pediatric specialist, family support",
        prepare: "Bring medical records, discharge notes, and questions about next steps."
      },
      {
        id: "Evaluation",
        what: "Condition, goals, physical status, and readiness are reviewed to determine what path makes sense.",
        who: "Prosthetist, physician, PT, OT, family or caregiver",
        prepare: "Know daily needs, pain issues, transportation limits, and activity goals."
      },
      {
        id: "Measurement",
        what: "Residual limb shape, size, skin condition, and fit requirements are documented.",
        who: "Prosthetist, technician, sometimes therapist",
        prepare: "Wear comfortable clothing, note skin issues, and be ready for multiple measurements."
      },
      {
        id: "Fitting",
        what: "A prosthetic device or test socket is fitted, adjusted, and checked for comfort and function.",
        who: "Prosthetist, technician, sometimes physician or therapist",
        prepare: "Report pressure points, discomfort, instability, or control issues clearly."
      },
      {
        id: "Training",
        what: "The user learns how to use the device safely and effectively in daily life or specialized activities.",
        who: "PT, OT, prosthetist, family or caregiver",
        prepare: "List tasks needed most: walking, dressing, work tasks, grip control, or sports movement."
      },
      {
        id: "Follow-Up",
        what: "Adjustments, repairs, skin checks, comfort checks, and performance reviews happen over time.",
        who: "Prosthetist, physician, therapist, patient support system",
        prepare: "Track fit problems, wear schedule, skin changes, and functional improvements."
      }
    ];

    const resourceLibrary = [
      {
        id: "understanding",
        title: "Understanding Limb Loss",
        items: [
          {
            title: "What changes first",
            body: [
              "Physical healing and emotional adjustment often happen at the same time.",
              "Early confusion usually comes from not knowing the order of care steps.",
              "The first goal is not choosing the final device. It is understanding the care path."
            ]
          },
          {
            title: "Questions to answer early",
            body: [
              "What limb level is involved?",
              "What does the person need to do daily?",
              "Who is leading the process right now?"
            ]
          }
        ]
      },
      {
        id: "prosthetic-types",
        title: "Types of Prosthetics",
        items: [
          {
            title: "Different devices serve different goals",
            body: [
              "Some devices prioritize comfort and daily use.",
              "Some prioritize strength, control, or activity return.",
              "A good match depends on limb level, body condition, goals, and training needs."
            ]
          },
          {
            title: "How to think about choice",
            body: [
              "Do not ask only what prosthetic exists.",
              "Ask what function is needed first, what the body can support, and what training will be required."
            ]
          }
        ]
      },
      {
        id: "expect",
        title: "What to Expect",
        items: [
          {
            title: "The process is staged",
            body: [
              "Referral usually comes before device discussion.",
              "Evaluation and measurement usually happen before fitting.",
              "Training and follow-up continue after the first device is received."
            ]
          },
          {
            title: "What slows people down",
            body: [
              "Missing paperwork",
              "Unclear goals",
              "Insurance uncertainty",
              "Repeated intake across providers"
            ]
          }
        ]
      },
      {
        id: "appointment",
        title: "First Appointment Preparation",
        items: [
          {
            title: "Bring structure into the visit",
            body: [
              "Know the limb level and healing status.",
              "Write down the top tasks that need help.",
              "Bring records, insurance information, and questions."
            ]
          },
          {
            title: "What to ask",
            body: [
              "What is the immediate next step after this appointment?",
              "What information is still missing?",
              "What kind of follow-up timeline should be expected?"
            ]
          }
        ]
      },
      {
        id: "financial",
        title: "Financial / Insurance Basics",
        items: [
          {
            title: "Start with the basics",
            body: [
              "Verify what plan is active.",
              "Ask what documentation is required for prosthetic approval.",
              "Track every provider and insurer request in one place."
            ]
          },
          {
            title: "What creates delays",
            body: [
              "Missing authorizations",
              "Incomplete supporting records",
              "Not knowing who is responsible for the next submission"
            ]
          }
        ]
      },
      {
        id: "pediatric",
        title: "Pediatric / Newborn Pathway",
        onlyFor: "parent",
        items: [
          {
            title: "Parent emphasis",
            body: [
              "The early goal is understanding development, function, and support options, not rushing a device decision.",
              "Questions often center on milestones, adaptation, family education, and long-term planning.",
              "The pathway should explain specialists, timing, and realistic next steps."
            ]
          },
          {
            title: "Who may be involved",
            body: [
              "Pediatric physician",
              "Prosthetist",
              "OT or PT",
              "Family support system"
            ]
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
      document.querySelectorAll(".view").forEach(v => v.classList.remove("active"));
      document.getElementById(viewId).classList.add("active");
      document.querySelectorAll(".nav-btn").forEach(btn => {
        btn.classList.toggle("active", btn.dataset.viewBtn === viewId);
      });
    }

    function renderUserChoices() {
      const box = document.getElementById("userChoices");
      box.innerHTML = "";
      userTypes.forEach(item => {
        const btn = document.createElement("button");
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
      select.innerHTML = `<option value="">Select amputation level</option>` +
        currentOptions.map(level => `<option value="${level}">${level}</option>`).join("");
      select.value = state.amputationLevel || "";
    }

    function renderSummary() {
      const user = userTypes.find(x => x.id === state.userType);
      document.getElementById("summaryUser").textContent = user ? user.title : "Not selected";
      document.getElementById("summaryLimb").textContent =
        state.limbType ? (state.limbType === "upper" ? "Upper limb" : "Lower limb") : "Not selected";
      document.getElementById("summaryLevel").textContent = state.amputationLevel || "Not selected";
      document.getElementById("summaryLifestyle").textContent = state.lifestyle || "Not selected";
    }

    function renderProfileTags() {
      const tags = document.getElementById("profileTags");
      const map = [
        state.userType || "No user type",
        state.limbType || "No limb type",
        state.amputationLevel || "No level",
        state.lifestyle || "No lifestyle"
      ];
      tags.innerHTML = map.map(item => `<span class="tag">${item}</span>`).join("");
    }

    function renderResources() {
      const holder = document.getElementById("resourceAccordions");
      holder.innerHTML = "";
      const filtered = resourceLibrary.filter(section => !section.onlyFor || section.onlyFor === state.userType);

      filtered.forEach((section, i) => {
        const card = document.createElement("div");
        card.className = "card accordion" + (i === 0 ? " open" : "");
        const bodyHtml = section.items.map(module => `
          <div class="module">
            <h4>${module.title}</h4>
            ${module.body.map(line => `<div class="bullet">${line}</div>`).join("")}
          </div>
        `).join("");

        card.innerHTML = `
          <button class="head">
            <span>${section.title}</span>
            <span>${i === 0 ? "−" : "+"}</span>
          </button>
          <div class="desc">Short, structured modules. No long paragraphs.</div>
          <div class="body">${bodyHtml}</div>
        `;

        const head = card.querySelector(".head");
        const symbol = head.querySelector("span:last-child");
        head.addEventListener("click", () => {
          card.classList.toggle("open");
          symbol.textContent = card.classList.contains("open") ? "−" : "+";
        });

        holder.appendChild(card);
      });
    }

    function renderFlowButtons() {
      const holder = document.getElementById("flowButtons");
      holder.innerHTML = "";
      processSteps.forEach((step, i) => {
        const btn = document.createElement("button");
        btn.className = "step-btn" + (i === activeProcessStep ? " active" : "");
        btn.innerHTML = `<div class="step-num">${i+1}</div><div>${step.id}</div>`;
        btn.addEventListener("click", () => {
          activeProcessStep = i;
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

    function openActionModal(type) {
      const title = document.getElementById("modalTitle");
      const body = document.getElementById("modalBody");
      if (type === "intake") {
        title.textContent = "Start Intake";
        body.textContent = "This is a placeholder link into the existing intake system. In production, the stored profile would carry forward into structured intake.";
      } else {
        title.textContent = "Find Providers";
        body.textContent = "This is a placeholder link into the existing matching system. In production, the stored profile would drive provider recommendations.";
      }
      document.getElementById("actionModal").classList.add("show");
    }

    function closeActionModal() {
      document.getElementById("actionModal").classList.remove("show");
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
    }

    document.querySelectorAll("[data-view-btn]").forEach(btn => {
      btn.addEventListener("click", () => setView(btn.dataset.viewBtn));
    });

    document.getElementById("continueGateway").addEventListener("click", () => {
      setView("pathway");
    });

    document.getElementById("continuePathway").addEventListener("click", () => {
      setView("resources");
    });

    document.getElementById("resetPathway").addEventListener("click", () => {
      state.limbType = "";
      state.amputationLevel = "";
      state.lifestyle = "";
      saveState();
      renderAll();
    });

    document.getElementById("limbType").addEventListener("change", e => {
      state.limbType = e.target.value;
      state.amputationLevel = "";
      saveState();
      renderAll();
    });

    document.getElementById("ampLevel").addEventListener("change", e => {
      state.amputationLevel = e.target.value;
      saveState();
      renderAll();
    });

    document.querySelectorAll("[data-action]").forEach(btn => {
      btn.addEventListener("click", () => openActionModal(btn.dataset.action));
    });

    document.getElementById("closeModal").addEventListener("click", closeActionModal);
    document.getElementById("closeModal2").addEventListener("click", closeActionModal);
    document.getElementById("actionModal").addEventListener("click", e => {
      if (e.target.id === "actionModal") closeActionModal();
    });

    renderAll();
    setView("gateway");