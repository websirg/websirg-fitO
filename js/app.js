/**
 * IRONPULSE FITNESS - Public Website Controller
 * Interactive Timetable, BMI Health Tool, Modal Enrollment & LocalStorage Sync
 */

// Class Schedule Timetable Data
const SCHEDULE_DATA = {
  monday: [
    { time: "06:00 AM - 07:15 AM", title: "Heavy Bench & Chest Hypertrophy", coach: "Marcus Vance", room: "Iron Arena 1", level: "Intermediate" },
    { time: "08:00 AM - 09:00 AM", title: "High-Octane CrossFit WOD", coach: "Elena Rostova", room: "Functional Turf", level: "All Levels" },
    { time: "11:00 AM - 12:00 PM", title: "Spine Mobility & Flow Yoga", coach: "Priya Sharma", room: "Mind & Body Studio", level: "Beginner" },
    { time: "05:30 PM - 06:45 PM", title: "Deadlift Mechanics & Raw Power", coach: "Devraj Singh", room: "Lifting Platforms", level: "Advanced" },
    { time: "07:30 PM - 08:30 PM", title: "HIIT Fat Burn & Core Assault", coach: "Elena Rostova", room: "Sprint Studio", level: "All Levels" }
  ],
  tuesday: [
    { time: "06:30 AM - 07:30 AM", title: "Leg Day Destruction (Squats & Hacks)", coach: "Marcus Vance", room: "Iron Arena 1", level: "Advanced" },
    { time: "09:00 AM - 10:00 AM", title: "Olympic Weightlifting Clean & Jerk", coach: "Devraj Singh", room: "Lifting Platforms", level: "Intermediate" },
    { time: "12:00 PM - 01:00 PM", title: "Deep Hip & Hamstring Release", coach: "Priya Sharma", room: "Mind & Body Studio", level: "All Levels" },
    { time: "06:00 PM - 07:15 PM", title: "Metabolic Calorie Meltdown", coach: "Elena Rostova", room: "Functional Turf", level: "All Levels" },
    { time: "08:00 PM - 09:00 PM", title: "Arm & Shoulder Cannon Hypertrophy", coach: "Marcus Vance", room: "Free Weights Zone", level: "Intermediate" }
  ],
  wednesday: [
    { time: "06:00 AM - 07:15 AM", title: "Back Width & Lat Pulldown Mastery", coach: "Marcus Vance", room: "Iron Arena 1", level: "Intermediate" },
    { time: "08:30 AM - 09:30 AM", title: "Endurance Rowers & Ski-Erg Blast", coach: "Elena Rostova", room: "Sprint Studio", level: "Intermediate" },
    { time: "05:00 PM - 06:00 PM", title: "Vinyasa Dynamic Flow", coach: "Priya Sharma", room: "Mind & Body Studio", level: "Beginner" },
    { time: "06:30 PM - 07:45 PM", title: "Strongman Farmers Carry & Yoke", coach: "Devraj Singh", room: "Heavy Rig Zone", level: "Advanced" }
  ],
  thursday: [
    { time: "06:30 AM - 07:30 AM", title: "Push Protocol (Overhead Press & Triceps)", coach: "Marcus Vance", room: "Iron Arena 1", level: "Intermediate" },
    { time: "09:00 AM - 10:00 AM", title: "Kettlebell Swing & Snatch Conditioning", coach: "Elena Rostova", room: "Functional Turf", level: "All Levels" },
    { time: "05:30 PM - 06:30 PM", title: "Core & Pelvic Stability Workshop", coach: "Priya Sharma", room: "Mind & Body Studio", level: "All Levels" },
    { time: "07:00 PM - 08:15 PM", title: "Powerlifting Squat Max Prep", coach: "Devraj Singh", room: "Lifting Platforms", level: "Advanced" }
  ],
  friday: [
    { time: "06:00 AM - 07:15 AM", title: "Pull Protocol (Barbell Rows & Biceps)", coach: "Marcus Vance", room: "Iron Arena 1", level: "Intermediate" },
    { time: "08:30 AM - 09:30 AM", title: "Battle Ropes & Plyometric Shred", coach: "Elena Rostova", room: "Functional Turf", level: "All Levels" },
    { time: "05:00 PM - 06:00 PM", title: "Restorative Yin Yoga & Sound Bath", coach: "Priya Sharma", room: "Mind & Body Studio", level: "Beginner" },
    { time: "07:00 PM - 08:30 PM", title: "Friday Night Pump & Social Lift", coach: "Team IronPulse", room: "Main Gym Floor", level: "All Levels" }
  ],
  saturday: [
    { time: "07:00 AM - 08:30 AM", title: "Weekend Warrior CrossFit Gauntlet", coach: "Elena Rostova", room: "Main Turf", level: "Open" },
    { time: "09:30 AM - 11:00 AM", title: "Heavy Bench PR Testing Clinic", coach: "Devraj Singh", room: "Lifting Platforms", level: "Intermediate" },
    { time: "04:30 PM - 05:45 PM", title: "Full Body Functional Circuit", coach: "Marcus Vance", room: "Iron Arena 1", level: "All Levels" },
    { time: "06:00 PM - 07:00 PM", title: "Post-Workout Ice Bath & Recovery", coach: "Priya Sharma", room: "Cryo & Sauna Suite", level: "All Members" }
  ]
};

// Render Schedule Items
function renderSchedule(day) {
  const container = document.getElementById("scheduleContent");
  if (!container) return;

  const items = SCHEDULE_DATA[day] || SCHEDULE_DATA.monday;
  
  container.innerHTML = `
    <div class="schedule-grid">
      ${items.map(item => `
        <div class="schedule-card">
          <div class="schedule-time">
            <i class="fa-regular fa-clock"></i>
            <span>${item.time}</span>
          </div>
          <div class="schedule-info">
            <h4 class="schedule-title">${item.title}</h4>
            <div class="schedule-coach">
              <i class="fa-solid fa-user-ninja"></i> Coach: <strong>${item.coach}</strong>
            </div>
            <div class="schedule-room">
              <i class="fa-solid fa-location-dot"></i> ${item.room}
            </div>
          </div>
          <div class="schedule-action">
            <span class="level-tag">${item.level}</span>
            <button class="btn btn-sm btn-outline-neon reserve-spot-btn" data-class="${item.title}">
              Reserve Slot
            </button>
          </div>
        </div>
      `).join("")}
    </div>
  `;

  // Attach Reserve buttons
  container.querySelectorAll(".reserve-spot-btn").forEach(btn => {
    btn.addEventListener("click", () => {
      const cls = btn.getAttribute("data-class");
      openJoinModal({
        notes: `Interest in Class: ${cls}`
      });
    });
  });
}

// Interactive BMI Calculator Logic
function setupBmiCalculator() {
  const form = document.getElementById("bmiForm");
  const resultBox = document.getElementById("bmiResultBox");
  const valDisplay = document.getElementById("bmiValueDisplay");
  const badgeDisplay = document.getElementById("bmiCategoryBadge");
  const barFill = document.getElementById("bmiBarFill");
  const adviceDisplay = document.getElementById("bmiAdviceText");

  if (!form || !resultBox) return;

  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const heightCm = parseFloat(document.getElementById("bmiHeight").value);
    const weightKg = parseFloat(document.getElementById("bmiWeight").value);
    const goal = document.getElementById("bmiGoal").value;

    if (!heightCm || !weightKg || heightCm <= 0 || weightKg <= 0) {
      alert("Please enter valid height and weight values.");
      return;
    }

    const heightM = heightCm / 100;
    const bmi = (weightKg / (heightM * heightM)).toFixed(1);

    valDisplay.textContent = bmi;

    let category = "";
    let categoryClass = "";
    let fillPercent = 50;
    let advice = "";

    if (bmi < 18.5) {
      category = "UNDERWEIGHT";
      categoryClass = "badge-under";
      fillPercent = 20;
      advice = "Recommended Protocol: Lean Bulk Program. Aim for a caloric surplus of 300-500 kcal daily with 2g of protein per kg of bodyweight, focusing on heavy compound barbell movements.";
    } else if (bmi >= 18.5 && bmi < 25) {
      category = "OPTIMAL & HEALTHY";
      categoryClass = "badge-normal";
      fillPercent = 50;
      advice = "Recommended Protocol: Body Recomposition & Hypertrophy. Maintain maintenance calories with high-density protein. Prioritize progressive overload in 8-12 rep range.";
    } else if (bmi >= 25 && bmi < 30) {
      category = "OVERWEIGHT / MUSCULAR";
      categoryClass = "badge-over";
      fillPercent = 75;
      advice = "Recommended Protocol: Targeted Fat Loss & Conditioning. Incorporate 3x weekly HIIT circuits along with resistance training to drop body fat percentage while preserving strength.";
    } else {
      category = "OBESE CATEGORY";
      categoryClass = "badge-obese";
      fillPercent = 95;
      advice = "Recommended Protocol: Structured Caloric Deficit & Low-Impact Strength. Start with steady-state cardio, joint-friendly machine resistance, and custom macro-coaching.";
    }

    badgeDisplay.textContent = category;
    badgeDisplay.className = `bmi-badge-pill ${categoryClass}`;
    barFill.style.width = `${fillPercent}%`;
    adviceDisplay.textContent = advice;

    resultBox.style.display = "block";
    resultBox.scrollIntoView({ behavior: "smooth", block: "nearest" });
  });
}

// Public Toast System
function showPublicToast(title, message, isSuccess = true) {
  const container = document.getElementById("toastContainer");
  if (!container) return;

  const toast = document.createElement("div");
  toast.className = `public-toast ${isSuccess ? 'toast-success' : 'toast-info'}`;
  toast.innerHTML = `
    <div class="toast-content">
      <strong>${title}</strong>
      <p>${message}</p>
    </div>
    <button class="toast-close">&times;</button>
  `;

  toast.querySelector(".toast-close").addEventListener("click", () => toast.remove());
  container.appendChild(toast);

  setTimeout(() => {
    toast.remove();
  }, 4500);
}

// Open Public Join Modal with Plan Pre-selected
function openJoinModal(options = {}) {
  const modal = document.getElementById("joinModal");
  const planSelect = document.getElementById("regPlan");

  if (!modal) return;

  if (options.plan && planSelect) {
    // Attempt to match select options
    for (let opt of planSelect.options) {
      if (opt.value.includes(options.plan)) {
        opt.selected = true;
        break;
      }
    }
  }

  modal.classList.add("active");
}

function setupModalAndEnrollment() {
  const modal = document.getElementById("joinModal");
  const closeBtn = document.getElementById("closeJoinModal");
  const form = document.getElementById("publicJoinForm");

  // Plan Button Triggers
  document.querySelectorAll(".join-plan-btn").forEach(btn => {
    btn.addEventListener("click", () => {
      const plan = btn.getAttribute("data-plan");
      openJoinModal({ plan });
    });
  });

  const headerJoinBtn = document.getElementById("headerJoinBtn");
  if (headerJoinBtn) {
    headerJoinBtn.addEventListener("click", (e) => {
      // Allow scroll or open modal
    });
  }

  if (closeBtn && modal) {
    closeBtn.addEventListener("click", () => modal.classList.remove("active"));
    modal.addEventListener("click", (e) => {
      if (e.target === modal) modal.classList.remove("active");
    });
  }

  // Handle Form Submission -> Sync to Admin Panel Storage!
  if (form) {
    form.addEventListener("submit", (e) => {
      e.preventDefault();

      const fullName = document.getElementById("regFullName").value.trim();
      const phone = document.getElementById("regPhone").value.trim();
      const email = document.getElementById("regEmail").value.trim();
      const planVal = document.getElementById("regPlan").value;
      const payStatus = document.getElementById("regPayStatus").value;

      const [planName, planFeeStr] = planVal.split("|");
      const totalFee = Number(planFeeStr || 4999);
      const paidAmount = payStatus === "Paid" ? totalFee : 0;

      let duration = "3 Months";
      let monthsToAdd = 3;
      if (planName.includes("Standard")) {
        duration = "1 Month";
        monthsToAdd = 1;
      } else if (planName.includes("VIP")) {
        duration = "12 Months";
        monthsToAdd = 12;
      }

      const today = new Date();
      const startDate = today.toISOString().split("T")[0];
      const expiry = new Date(today);
      expiry.setMonth(expiry.getMonth() + monthsToAdd);
      const expiryDate = expiry.toISOString().split("T")[0];

      // Load existing members from LocalStorage
      const STORAGE_KEY = "ironpulse_gym_members_v1";
      let members = [];
      try {
        const raw = localStorage.getItem(STORAGE_KEY);
        if (raw) members = JSON.parse(raw);
      } catch (err) {
        members = [];
      }

      const nextId = "IP-" + (1000 + members.length + 1);
      const newMember = {
        id: nextId,
        name: fullName,
        phone,
        email,
        gender: "Male",
        plan: planName,
        duration,
        totalFee,
        paidAmount,
        paymentMode: payStatus === "Paid" ? "UPI / QR" : "Pending",
        startDate,
        expiryDate,
        emergency: "Self Registered Online",
        status: payStatus,
        createdAt: new Date().toISOString()
      };

      members.unshift(newMember);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(members));

      // Reset and close modal
      form.reset();
      modal.classList.remove("active");

      showPublicToast(
        "Registration Successful! 🎉",
        `Welcome to IronPulse, ${fullName}! Your ID is ${nextId}. Record synced to Admin Panel.`
      );
    });
  }
}

// Contact Form Handler
function setupContactForm() {
  const contactForm = document.getElementById("contactForm");
  if (!contactForm) return;

  contactForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const name = document.getElementById("contactName").value;
    contactForm.reset();
    showPublicToast(
      "Inquiry Received!",
      `Thank you, ${name}. Our head coach will contact you within 15 minutes.`
    );
  });
}

// Sticky Navbar Scroll & Mobile Navigation Handler
function setupNavbar() {
  const navbar = document.getElementById("navbar");
  const menuToggle = document.getElementById("menuToggle");
  const navLinks = document.getElementById("navLinks");

  window.addEventListener("scroll", () => {
    if (window.scrollY > 50) {
      navbar?.classList.add("scrolled");
    } else {
      navbar?.classList.remove("scrolled");
    }
  });

  if (menuToggle && navLinks) {
    menuToggle.addEventListener("click", (e) => {
      e.stopPropagation();
      navLinks.classList.toggle("open");
      const icon = menuToggle.querySelector("i");
      if (icon) {
        if (navLinks.classList.contains("open")) {
          icon.className = "fa-solid fa-xmark";
        } else {
          icon.className = "fa-solid fa-bars";
        }
      }
    });

    // Close when clicking outside
    document.addEventListener("click", (e) => {
      if (!navLinks.contains(e.target) && !menuToggle.contains(e.target)) {
        navLinks.classList.remove("open");
        const icon = menuToggle.querySelector("i");
        if (icon) icon.className = "fa-solid fa-bars";
      }
    });

    // Close when clicking a link
    navLinks.querySelectorAll(".nav-item").forEach(link => {
      link.addEventListener("click", () => {
        navLinks.classList.remove("open");
        const icon = menuToggle.querySelector("i");
        if (icon) icon.className = "fa-solid fa-bars";
      });
    });
  }

  // Active page detection
  const currentPath = window.location.pathname.split("/").pop() || "index.html";
  document.querySelectorAll(".nav-links .nav-item").forEach(item => {
    const href = item.getAttribute("href");
    if (href === currentPath || (currentPath === "" && href === "index.html")) {
      item.classList.add("active");
    } else if (href && !href.startsWith("#") && href !== currentPath) {
      item.classList.remove("active");
    }
  });
}

// Schedule Tab Switching
function setupScheduleTabs() {
  const tabs = document.querySelectorAll("#scheduleTabs .tab-btn");
  tabs.forEach(tab => {
    tab.addEventListener("click", () => {
      tabs.forEach(t => t.classList.remove("active"));
      tab.classList.add("active");
      const day = tab.getAttribute("data-day");
      renderSchedule(day);
    });
  });

  // Initial render: Monday
  renderSchedule("monday");
}

// Initial Boot
document.addEventListener("DOMContentLoaded", () => {
  setupNavbar();
  setupScheduleTabs();
  setupBmiCalculator();
  setupModalAndEnrollment();
  setupContactForm();
});
