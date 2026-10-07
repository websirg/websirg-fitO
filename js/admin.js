/**
 * IRONPULSE FITNESS - Admin Management & Fee Controller
 * Core State, LocalStorage Persistence, Fee Accounting, Aadhaar KYC & Printable Receipts
 */

// Helper to generate a realistic SVG Aadhaar Card mockup data URL
function generateAadhaarMockSvg(name, aadhaarNum, id) {
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="600" height="380" viewBox="0 0 600 380">
    <defs>
      <linearGradient id="flagGrad" x1="0%" y1="0%" x2="100%" y2="0%">
        <stop offset="0%" stop-color="#FF9933" />
        <stop offset="50%" stop-color="#FFFFFF" />
        <stop offset="100%" stop-color="#138808" />
      </linearGradient>
    </defs>
    <!-- Background Card -->
    <rect width="600" height="380" rx="16" fill="#F8FAFC" stroke="#CBD5E1" stroke-width="2"/>
    <rect x="0" y="0" width="600" height="12" rx="6" fill="url(#flagGrad)"/>
    
    <!-- Top Header -->
    <text x="300" y="45" font-family="sans-serif" font-size="16" font-weight="bold" fill="#0F172A" text-anchor="middle">GOVERNMENT OF INDIA / UNIQUE IDENTIFICATION AUTHORITY</text>
    <text x="300" y="65" font-family="sans-serif" font-size="12" fill="#64748B" text-anchor="middle">MEMBER VERIFIED KYC PROOF OF IDENTITY</text>
    <line x1="30" y1="78" x2="570" y2="78" stroke="#E2E8F0" stroke-width="1.5"/>
    
    <!-- Photo Box -->
    <rect x="40" y="100" width="120" height="150" rx="8" fill="#E2E8F0" stroke="#94A3B8" stroke-width="1"/>
    <circle cx="100" cy="150" r="30" fill="#CBD5E1"/>
    <path d="M60 230 C60 195, 140 195, 140 230 Z" fill="#94A3B8"/>
    <text x="100" y="270" font-family="sans-serif" font-size="11" fill="#64748B" text-anchor="middle">PHOTO</text>
    
    <!-- Details -->
    <text x="180" y="125" font-family="sans-serif" font-size="13" fill="#64748B">NAME:</text>
    <text x="180" y="148" font-family="sans-serif" font-size="18" font-weight="bold" fill="#0F172A">${name}</text>
    
    <text x="180" y="180" font-family="sans-serif" font-size="13" fill="#64748B">GYM MEMBER ID / REF:</text>
    <text x="180" y="200" font-family="sans-serif" font-size="15" font-weight="bold" fill="#FF4B00">${id}</text>
    
    <text x="180" y="230" font-family="sans-serif" font-size="13" fill="#64748B">VERIFICATION STATUS:</text>
    <text x="180" y="250" font-family="sans-serif" font-size="14" font-weight="bold" fill="#10B981">AADHAAR BIOMETRIC VERIFIED</text>
    
    <!-- Aadhaar Number Bar -->
    <rect x="30" y="295" width="540" height="55" rx="8" fill="#FEF3C7" stroke="#F59E0B" stroke-width="1.5"/>
    <text x="300" y="333" font-family="monospace" font-size="26" font-weight="bold" fill="#B45309" text-anchor="middle" letter-spacing="4">${aadhaarNum}</text>
  </svg>`;
  return "data:image/svg+xml;charset=utf-8," + encodeURIComponent(svg);
}

// Initial Seed Members Data (preloaded with Aadhaar numbers and KYC document previews)
const DEFAULT_MEMBERS = [
  {
    id: "IP-1001",
    name: "Vikramaditya Rathore",
    phone: "9876543210",
    email: "vikram.rathore@gmail.com",
    gender: "Male",
    aadhaarNumber: "5482 9102 3841",
    aadhaarCopyUrl: generateAadhaarMockSvg("Vikramaditya Rathore", "5482 9102 3841", "IP-1001"),
    plan: "Pro Athlete",
    duration: "3 Months",
    totalFee: 4999,
    paidAmount: 4999,
    paymentMode: "UPI / QR",
    startDate: "2026-08-15",
    expiryDate: "2026-11-15",
    emergency: "+91 9988776655 (Brother)",
    status: "Paid",
    createdAt: "2026-08-15T10:30:00Z"
  },
  {
    id: "IP-1002",
    name: "Aman Preet Singh",
    phone: "9170461130",
    email: "amanpreet@yahoo.com",
    gender: "Male",
    aadhaarNumber: "7821 4452 9013",
    aadhaarCopyUrl: generateAadhaarMockSvg("Aman Preet Singh", "7821 4452 9013", "IP-1002"),
    plan: "Standard Iron",
    duration: "1 Month",
    totalFee: 1999,
    paidAmount: 0,
    paymentMode: "Pending",
    startDate: "2026-10-01",
    expiryDate: "2026-11-01",
    emergency: "+91 9123456789 (Father)",
    status: "Unpaid",
    createdAt: "2026-10-01T09:15:00Z"
  },
  {
    id: "IP-1003",
    name: "Sneha Mukherjee",
    phone: "9811223344",
    email: "sneha.mukh@outlook.com",
    gender: "Female",
    aadhaarNumber: "3290 8122 5541",
    aadhaarCopyUrl: generateAadhaarMockSvg("Sneha Mukherjee", "3290 8122 5541", "IP-1003"),
    plan: "VIP Beast Ultimate",
    duration: "12 Months",
    totalFee: 14999,
    paidAmount: 14999,
    paymentMode: "Credit / Debit Card",
    startDate: "2026-01-10",
    expiryDate: "2027-01-10",
    emergency: "+91 9877001122 (Spouse)",
    status: "Paid",
    createdAt: "2026-01-10T11:00:00Z"
  },
  {
    id: "IP-1004",
    name: "Rohan Kulkarni",
    phone: "9765432109",
    email: "rohan.kulkarni@gmail.com",
    gender: "Male",
    aadhaarNumber: "6102 7741 8932",
    aadhaarCopyUrl: generateAadhaarMockSvg("Rohan Kulkarni", "6102 7741 8932", "IP-1004"),
    plan: "Pro Athlete",
    duration: "3 Months",
    totalFee: 4999,
    paidAmount: 2000,
    paymentMode: "Cash",
    startDate: "2026-09-20",
    expiryDate: "2026-12-20",
    emergency: "+91 9822334455 (Friend)",
    status: "Partial",
    createdAt: "2026-09-20T17:45:00Z"
  },
  {
    id: "IP-1005",
    name: "Ananya Iyer",
    phone: "9823456781",
    email: "ananya.iyer@gmail.com",
    gender: "Female",
    aadhaarNumber: "8891 2341 0029",
    aadhaarCopyUrl: generateAadhaarMockSvg("Ananya Iyer", "8891 2341 0029", "IP-1005"),
    plan: "Standard Iron",
    duration: "1 Month",
    totalFee: 1999,
    paidAmount: 1999,
    paymentMode: "UPI / QR",
    startDate: "2026-09-12",
    expiryDate: "2026-10-12",
    emergency: "+91 9711224455 (Mother)",
    status: "Paid",
    createdAt: "2026-09-12T08:20:00Z"
  },
  {
    id: "IP-1006",
    name: "Karan Johar Verma",
    phone: "9899112233",
    email: "karan.verma@techmail.com",
    gender: "Male",
    aadhaarNumber: "4501 9283 1172",
    aadhaarCopyUrl: generateAadhaarMockSvg("Karan Johar Verma", "4501 9283 1172", "IP-1006"),
    plan: "VIP Beast Ultimate",
    duration: "12 Months",
    totalFee: 14999,
    paidAmount: 5000,
    paymentMode: "Net Banking",
    startDate: "2026-09-01",
    expiryDate: "2027-09-01",
    emergency: "+91 9911882233 (Father)",
    status: "Partial",
    createdAt: "2026-09-01T14:10:00Z"
  },
  {
    id: "IP-1007",
    name: "Simran Kaur",
    phone: "9871122334",
    email: "simran.kaur99@gmail.com",
    gender: "Female",
    aadhaarNumber: "9123 6645 8820",
    aadhaarCopyUrl: generateAadhaarMockSvg("Simran Kaur", "9123 6645 8820", "IP-1007"),
    plan: "Pro Athlete",
    duration: "3 Months",
    totalFee: 4999,
    paidAmount: 0,
    paymentMode: "Pending",
    startDate: "2026-10-05",
    expiryDate: "2027-01-05",
    emergency: "+91 9811002233 (Sister)",
    status: "Unpaid",
    createdAt: "2026-10-05T18:00:00Z"
  },
  {
    id: "IP-1008",
    name: "Devendra Yadav",
    phone: "9123456780",
    email: "devendra.yadav@gmail.com",
    gender: "Male",
    aadhaarNumber: "2201 8841 5590",
    aadhaarCopyUrl: generateAadhaarMockSvg("Devendra Yadav", "2201 8841 5590", "IP-1008"),
    plan: "Standard Iron",
    duration: "1 Month",
    totalFee: 1999,
    paidAmount: 1999,
    paymentMode: "Cash",
    startDate: "2026-09-10",
    expiryDate: "2026-10-10",
    emergency: "+91 9450011223 (Self)",
    status: "Paid",
    createdAt: "2026-09-10T12:00:00Z"
  }
];

const STORAGE_KEY = "ironpulse_gym_members_v2"; // Migrated to v2 with Aadhaar KYC

// App State
let membersState = [];
let activeTab = "all";
let searchQuery = "";
let selectedPlan = "all";
let selectedSort = "recent";

// Initialize Data
function loadMembers() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) {
      membersState = JSON.parse(raw);
    } else {
      membersState = [...DEFAULT_MEMBERS];
      saveMembers();
    }
  } catch (e) {
    console.error("Failed to parse localStorage members:", e);
    membersState = [...DEFAULT_MEMBERS];
  }
}

function saveMembers() {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(membersState));
  } catch (e) {
    console.error("Storage error:", e);
  }
}

// Format Currency
function formatCurrency(amount) {
  return "₹" + Number(amount || 0).toLocaleString("en-IN");
}

// Calculate Days Remaining
function getDaysRemaining(expiryDateStr) {
  const today = new Date("2026-10-08"); // Current anchor time
  const expiry = new Date(expiryDateStr);
  const diffTime = expiry - today;
  return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
}

// Helper: Check if expiring within 14 days
function isExpiringSoon(expiryDateStr) {
  const days = getDaysRemaining(expiryDateStr);
  return days >= 0 && days <= 14;
}

// Aadhaar Formatter (1234 5678 9012)
function formatAadhaarInput(val) {
  const digits = val.replace(/\D/g, "").substring(0, 12);
  const parts = [];
  for (let i = 0; i < digits.length; i += 4) {
    parts.push(digits.substring(i, i + 4));
  }
  return parts.join(" ");
}

// Compute Metrics & KPI Stat Cards
function updateStats() {
  const totalCount = membersState.length;
  let totalCollected = 0;
  let totalDue = 0;
  let paidCount = 0;
  let unpaidCount = 0;
  let expiringCount = 0;

  membersState.forEach(m => {
    const total = Number(m.totalFee || 0);
    const paid = Number(m.paidAmount || 0);
    const due = Math.max(0, total - paid);

    totalCollected += paid;
    totalDue += due;

    if (paid >= total && total > 0) {
      paidCount++;
    } else {
      unpaidCount++;
    }

    if (isExpiringSoon(m.expiryDate)) {
      expiringCount++;
    }
  });

  // Update DOM Elements
  const statTotalMembers = document.getElementById("statTotalMembers");
  const statFeeCollected = document.getElementById("statFeeCollected");
  const statFeeDue = document.getElementById("statFeeDue");
  const statPaidCount = document.getElementById("statPaidCount");
  const statUnpaidCount = document.getElementById("statUnpaidCount");
  const statExpiringCount = document.getElementById("statExpiringCount");
  const statActiveRatio = document.getElementById("statActiveRatio");

  if (statTotalMembers) statTotalMembers.textContent = totalCount;
  if (statFeeCollected) statFeeCollected.textContent = formatCurrency(totalCollected);
  if (statFeeDue) statFeeDue.textContent = formatCurrency(totalDue);
  if (statPaidCount) statPaidCount.textContent = `${paidCount} Members Paid`;
  if (statUnpaidCount) statUnpaidCount.textContent = `${unpaidCount} Members Pending`;
  if (statExpiringCount) statExpiringCount.textContent = expiringCount;

  if (statActiveRatio && totalCount > 0) {
    const ratio = Math.round((paidCount / totalCount) * 100);
    statActiveRatio.textContent = `${ratio}% Collection Rate`;
  }

  // Update Tab & Sidebar Counters
  const tabCountAll = document.getElementById("tabCountAll");
  const tabCountPaid = document.getElementById("tabCountPaid");
  const tabCountUnpaid = document.getElementById("tabCountUnpaid");
  const tabCountExpiring = document.getElementById("tabCountExpiring");

  const sidebarPaid = document.getElementById("sidebarPaidCount");
  const sidebarUnpaid = document.getElementById("sidebarUnpaidCount");
  const sidebarExpiring = document.getElementById("sidebarExpiringCount");

  if (tabCountAll) tabCountAll.textContent = totalCount;
  if (tabCountPaid) tabCountPaid.textContent = paidCount;
  if (tabCountUnpaid) tabCountUnpaid.textContent = unpaidCount;
  if (tabCountExpiring) tabCountExpiring.textContent = expiringCount;

  if (sidebarPaid) sidebarPaid.textContent = paidCount;
  if (sidebarUnpaid) sidebarUnpaid.textContent = unpaidCount;
  if (sidebarExpiring) sidebarExpiring.textContent = expiringCount;
}

// Filter and Sort Members List
function getFilteredMembers() {
  return membersState.filter(m => {
    const total = Number(m.totalFee || 0);
    const paid = Number(m.paidAmount || 0);
    const due = Math.max(0, total - paid);

    // Tab Filter
    if (activeTab === "paid") {
      if (due > 0 || paid === 0) return false;
    } else if (activeTab === "unpaid") {
      if (due <= 0) return false;
    } else if (activeTab === "expiring") {
      if (!isExpiringSoon(m.expiryDate)) return false;
    }

    // Plan Filter
    if (selectedPlan !== "all" && m.plan !== selectedPlan) {
      return false;
    }

    // Search Filter
    if (searchQuery.trim() !== "") {
      const q = searchQuery.toLowerCase().trim();
      const matchName = (m.name || "").toLowerCase().includes(q);
      const matchPhone = (m.phone || "").toLowerCase().includes(q);
      const matchId = (m.id || "").toLowerCase().includes(q);
      const matchEmail = (m.email || "").toLowerCase().includes(q);
      const matchAadhaar = (m.aadhaarNumber || "").replace(/\s/g, "").includes(q.replace(/\s/g, ""));
      if (!matchName && !matchPhone && !matchId && !matchEmail && !matchAadhaar) return false;
    }

    return true;
  }).sort((a, b) => {
    if (selectedSort === "fee-high") {
      return Number(b.totalFee) - Number(a.totalFee);
    } else if (selectedSort === "fee-low") {
      return Number(a.totalFee) - Number(b.totalFee);
    } else if (selectedSort === "expiry") {
      return new Date(a.expiryDate) - new Date(b.expiryDate);
    } else if (selectedSort === "name") {
      return (a.name || "").localeCompare(b.name || "");
    } else {
      return new Date(b.createdAt || b.startDate) - new Date(a.createdAt || a.startDate);
    }
  });
}

// Generate Member Initials
function getInitials(name) {
  if (!name) return "GY";
  const parts = name.trim().split(" ");
  if (parts.length === 1) return parts[0].substring(0, 2).toUpperCase();
  return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
}

// Render Members Table Rows
function renderMembersTable() {
  const tbody = document.getElementById("membersTableBody");
  const emptyBox = document.getElementById("emptyStateBox");
  const displayedCountEl = document.getElementById("displayedMembersCount");
  const totalCountEl = document.getElementById("totalMembersCount");

  if (!tbody) return;

  const filtered = getFilteredMembers();

  if (displayedCountEl) displayedCountEl.textContent = filtered.length;
  if (totalCountEl) totalCountEl.textContent = membersState.length;

  if (filtered.length === 0) {
    tbody.innerHTML = "";
    if (emptyBox) emptyBox.style.display = "block";
    return;
  }

  if (emptyBox) emptyBox.style.display = "none";

  tbody.innerHTML = filtered.map(m => {
    const total = Number(m.totalFee || 0);
    const paid = Number(m.paidAmount || 0);
    const due = Math.max(0, total - paid);

    let statusPill = "";
    if (paid >= total && total > 0) {
      statusPill = `<span class="status-badge badge-paid"><i class="fa-solid fa-check"></i> Paid</span>`;
    } else if (paid === 0) {
      statusPill = `<span class="status-badge badge-unpaid"><i class="fa-solid fa-circle-exclamation"></i> Unpaid (Due)</span>`;
    } else {
      statusPill = `<span class="status-badge badge-partial"><i class="fa-solid fa-clock-rotate-left"></i> Partial (${formatCurrency(paid)})</span>`;
    }

    const daysLeft = getDaysRemaining(m.expiryDate);
    let expiryLabel = "";
    if (daysLeft < 0) {
      expiryLabel = `<span class="expiry-pill expired"><i class="fa-solid fa-ban"></i> Expired (${Math.abs(daysLeft)}d ago)</span>`;
    } else if (daysLeft <= 7) {
      expiryLabel = `<span class="expiry-pill warning"><i class="fa-solid fa-triangle-exclamation"></i> ${daysLeft} days left</span>`;
    } else {
      expiryLabel = `<span class="expiry-pill safe">${m.expiryDate}</span>`;
    }

    const initials = getInitials(m.name);
    const aadhaarDisplay = m.aadhaarNumber ? `<span class="aadhaar-pill-tag"><i class="fa-solid fa-id-card"></i> ${m.aadhaarNumber}</span>` : `<span class="aadhaar-pill-tag text-muted"><i class="fa-solid fa-id-card"></i> Aadhaar: Pending</span>`;

    return `
      <tr class="member-row" data-id="${m.id}">
        <!-- Member ID & Athlete -->
        <td>
          <div class="athlete-cell">
            <div class="athlete-avatar">${initials}</div>
            <div class="athlete-meta">
              <span class="athlete-name">${escapeHtml(m.name)}</span>
              <span class="athlete-id-tag"><i class="fa-solid fa-fingerprint"></i> ${m.id}</span>
            </div>
          </div>
        </td>

        <!-- Contact & Aadhaar Info -->
        <td>
          <div class="contact-cell">
            <a href="tel:${m.phone}" class="contact-phone"><i class="fa-solid fa-phone"></i> +91 ${m.phone}</a>
            <span class="contact-email">${escapeHtml(m.email || 'N/A')}</span>
            ${aadhaarDisplay}
          </div>
        </td>

        <!-- Membership Plan -->
        <td>
          <div class="plan-cell">
            <span class="plan-name-tag">${escapeHtml(m.plan)}</span>
            <span class="plan-sub-tag">${escapeHtml(m.duration || 'Standard')}</span>
          </div>
        </td>

        <!-- Total Fee -->
        <td>
          <div class="fee-cell-total">
            ${formatCurrency(total)}
          </div>
        </td>

        <!-- Paid / Balance -->
        <td>
          <div class="fee-balance-cell">
            <span class="paid-amount text-green">Paid: ${formatCurrency(paid)}</span>
            ${due > 0 ? `<span class="due-amount text-red">Due: ${formatCurrency(due)}</span>` : `<span class="text-muted"><i class="fa-solid fa-shield-check"></i> Cleared</span>`}
          </div>
        </td>

        <!-- Expiry -->
        <td>
          ${expiryLabel}
        </td>

        <!-- Payment Status -->
        <td>
          ${statusPill}
        </td>

        <!-- Actions -->
        <td class="text-right">
          <div class="action-buttons-wrap">
            <button class="action-btn btn-view-profile" title="View Profile & Aadhaar KYC Card" onclick="openProfileModal('${m.id}')">
              <i class="fa-solid fa-address-card"></i> KYC
            </button>
            ${due > 0 ? `
              <button class="action-btn btn-collect-pay" title="Collect Fee / Record Payment" onclick="openPaymentModal('${m.id}')">
                <i class="fa-solid fa-hand-holding-dollar"></i> Collect
              </button>
            ` : `
              <button class="action-btn btn-receipt" title="Print Fee Receipt with Aadhaar" onclick="openReceiptModal('${m.id}')">
                <i class="fa-solid fa-receipt"></i> Invoice
              </button>
            `}
            <button class="action-btn btn-edit" title="Edit Member Details" onclick="editMember('${m.id}')">
              <i class="fa-solid fa-pen-to-square"></i>
            </button>
            <button class="action-btn btn-delete" title="Delete Member" onclick="deleteMember('${m.id}')">
              <i class="fa-solid fa-trash-can"></i>
            </button>
          </div>
        </td>
      </tr>
    `;
  }).join("");
}

// Utility: Escape HTML
function escapeHtml(str) {
  if (!str) return "";
  return String(str)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

// Show Toast Alerts
function showToast(title, message, type = "success") {
  const container = document.getElementById("adminToastContainer");
  if (!container) return;

  const toast = document.createElement("div");
  toast.className = `admin-toast toast-${type}`;
  toast.innerHTML = `
    <div class="toast-icon">
      <i class="fa-solid ${type === 'success' ? 'fa-circle-check' : type === 'warning' ? 'fa-triangle-exclamation' : 'fa-circle-info'}"></i>
    </div>
    <div class="toast-body">
      <strong>${escapeHtml(title)}</strong>
      <p>${escapeHtml(message)}</p>
    </div>
    <button class="toast-close">&times;</button>
  `;

  toast.querySelector(".toast-close").addEventListener("click", () => toast.remove());
  container.appendChild(toast);

  setTimeout(() => {
    toast.classList.add("toast-fade-out");
    setTimeout(() => toast.remove(), 400);
  }, 4000);
}

// Auto-fill Fee when Plan changes
function setupPlanFeeBinding() {
  const planSelect = document.getElementById("formPlan");
  const feeInput = document.getElementById("formTotalFee");
  const paidInput = document.getElementById("formPaidAmount");

  if (!planSelect || !feeInput) return;

  planSelect.addEventListener("change", (e) => {
    let fee = 4999;
    if (e.target.value === "Standard Iron") fee = 1999;
    if (e.target.value === "Pro Athlete") fee = 4999;
    if (e.target.value === "VIP Beast Ultimate") fee = 14999;

    feeInput.value = fee;
    if (paidInput && (!paidInput.value || Number(paidInput.value) === 0 || Number(paidInput.value) === 1999 || Number(paidInput.value) === 4999 || Number(paidInput.value) === 14999)) {
      paidInput.value = fee;
    }
    updateModalBalanceBanner();
  });

  if (feeInput && paidInput) {
    feeInput.addEventListener("input", updateModalBalanceBanner);
    paidInput.addEventListener("input", updateModalBalanceBanner);
  }

  // Aadhaar input auto-formatter
  const aadhaarInput = document.getElementById("formAadhaarNumber");
  if (aadhaarInput) {
    aadhaarInput.addEventListener("input", (e) => {
      e.target.value = formatAadhaarInput(e.target.value);
    });
  }

  // Aadhaar file upload handler
  const aadhaarFileInput = document.getElementById("formAadhaarFile");
  const hiddenDataUrl = document.getElementById("formAadhaarDataUrl");
  const uploadPreview = document.getElementById("aadhaarUploadPreview");
  const thumbImg = document.getElementById("aadhaarThumbImg");
  const removeFileBtn = document.getElementById("removeAadhaarFileBtn");

  if (aadhaarFileInput) {
    aadhaarFileInput.addEventListener("change", (e) => {
      const file = e.target.files[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = function(evt) {
          const dataUrl = evt.target.result;
          hiddenDataUrl.value = dataUrl;
          if (thumbImg) thumbImg.src = dataUrl;
          if (uploadPreview) uploadPreview.style.display = "flex";
        };
        reader.readAsDataURL(file);
      }
    });
  }

  if (removeFileBtn) {
    removeFileBtn.addEventListener("click", () => {
      if (aadhaarFileInput) aadhaarFileInput.value = "";
      if (hiddenDataUrl) hiddenDataUrl.value = "";
      if (uploadPreview) uploadPreview.style.display = "none";
    });
  }
}

function updateModalBalanceBanner() {
  const fee = Number(document.getElementById("formTotalFee")?.value || 0);
  const paid = Number(document.getElementById("formPaidAmount")?.value || 0);
  const due = Math.max(0, fee - paid);
  const balanceEl = document.getElementById("modalBalanceAmount");
  if (balanceEl) {
    balanceEl.textContent = formatCurrency(due);
    balanceEl.className = due > 0 ? "text-red" : "text-green";
  }
}

// Open Add New Member Modal
function openAddMemberModal() {
  const modal = document.getElementById("memberModal");
  const form = document.getElementById("memberForm");
  const title = document.getElementById("modalTitle");
  const sub = document.getElementById("modalSub");
  const editIdInput = document.getElementById("editMemberId");

  if (!modal || !form) return;

  form.reset();
  if (editIdInput) editIdInput.value = "";
  if (title) title.textContent = "Register New Gym Member";
  if (sub) sub.textContent = "Enter member athlete details, attach Aadhaar card and assign plan";

  // Reset Aadhaar preview
  const uploadPreview = document.getElementById("aadhaarUploadPreview");
  const hiddenDataUrl = document.getElementById("formAadhaarDataUrl");
  if (uploadPreview) uploadPreview.style.display = "none";
  if (hiddenDataUrl) hiddenDataUrl.value = "";

  // Set default start date to today
  const startDateInput = document.getElementById("formStartDate");
  if (startDateInput) {
    startDateInput.value = new Date().toISOString().split("T")[0];
  }

  // Defaults
  document.getElementById("formPlan").value = "Pro Athlete";
  document.getElementById("formTotalFee").value = 4999;
  document.getElementById("formPaidAmount").value = 4999;
  updateModalBalanceBanner();

  modal.classList.add("active");
}

// Edit Member
window.editMember = function(memberId) {
  const member = membersState.find(m => m.id === memberId);
  if (!member) return;

  const modal = document.getElementById("memberModal");
  const form = document.getElementById("memberForm");
  const title = document.getElementById("modalTitle");
  const sub = document.getElementById("modalSub");
  const editIdInput = document.getElementById("editMemberId");

  if (!modal || !form) return;

  if (editIdInput) editIdInput.value = member.id;
  if (title) title.textContent = `Edit Member: ${member.name} (${member.id})`;
  if (sub) sub.textContent = "Update contact details, Aadhaar proof or membership fees";

  document.getElementById("formFullName").value = member.name || "";
  document.getElementById("formPhone").value = member.phone || "";
  document.getElementById("formEmail").value = member.email || "";
  document.getElementById("formGender").value = member.gender || "Male";
  document.getElementById("formAadhaarNumber").value = member.aadhaarNumber || "";
  document.getElementById("formPlan").value = member.plan || "Pro Athlete";
  document.getElementById("formTotalFee").value = member.totalFee || 0;
  document.getElementById("formPaidAmount").value = member.paidAmount || 0;
  document.getElementById("formPaymentMode").value = member.paymentMode || "UPI / QR";
  document.getElementById("formStartDate").value = member.startDate || new Date().toISOString().split("T")[0];
  document.getElementById("formEmergency").value = member.emergency || "";

  // Setup Aadhaar preview if present
  const uploadPreview = document.getElementById("aadhaarUploadPreview");
  const thumbImg = document.getElementById("aadhaarThumbImg");
  const hiddenDataUrl = document.getElementById("formAadhaarDataUrl");
  if (member.aadhaarCopyUrl) {
    if (hiddenDataUrl) hiddenDataUrl.value = member.aadhaarCopyUrl;
    if (thumbImg) thumbImg.src = member.aadhaarCopyUrl;
    if (uploadPreview) uploadPreview.style.display = "flex";
  } else {
    if (hiddenDataUrl) hiddenDataUrl.value = "";
    if (uploadPreview) uploadPreview.style.display = "none";
  }

  updateModalBalanceBanner();
  modal.classList.add("active");
};

// Delete Member
window.deleteMember = function(memberId) {
  const member = membersState.find(m => m.id === memberId);
  if (!member) return;

  if (confirm(`Are you sure you want to remove member ${member.name} (${member.id}) from the gym roster?`)) {
    membersState = membersState.filter(m => m.id !== memberId);
    saveMembers();
    updateStats();
    renderMembersTable();
    showToast("Member Removed", `${member.name} was removed from the roster.`, "info");
  }
};

// Save Add/Edit Member Form
function handleSaveMember(e) {
  e.preventDefault();

  const editId = document.getElementById("editMemberId").value;
  const name = document.getElementById("formFullName").value.trim();
  const phone = document.getElementById("formPhone").value.trim();
  const email = document.getElementById("formEmail").value.trim();
  const gender = document.getElementById("formGender").value;
  const aadhaarNumber = document.getElementById("formAadhaarNumber").value.trim();
  let aadhaarCopyUrl = document.getElementById("formAadhaarDataUrl").value;
  const plan = document.getElementById("formPlan").value;
  const totalFee = Number(document.getElementById("formTotalFee").value || 0);
  const paidAmount = Number(document.getElementById("formPaidAmount").value || 0);
  const paymentMode = document.getElementById("formPaymentMode").value;
  const startDate = document.getElementById("formStartDate").value || new Date().toISOString().split("T")[0];
  const emergency = document.getElementById("formEmergency").value.trim();

  // If no file uploaded, generate mock SVG Aadhaar
  if (!aadhaarCopyUrl && aadhaarNumber) {
    aadhaarCopyUrl = generateAadhaarMockSvg(name, aadhaarNumber, editId || "IP-NEW");
  }

  // Determine Duration and calculate Expiry Date
  let duration = "1 Month";
  let monthsToAdd = 1;
  if (plan === "Pro Athlete") {
    duration = "3 Months";
    monthsToAdd = 3;
  } else if (plan === "VIP Beast Ultimate") {
    duration = "12 Months";
    monthsToAdd = 12;
  }

  const sDate = new Date(startDate);
  sDate.setMonth(sDate.getMonth() + monthsToAdd);
  const expiryDate = sDate.toISOString().split("T")[0];

  let status = "Paid";
  if (paidAmount >= totalFee && totalFee > 0) {
    status = "Paid";
  } else if (paidAmount === 0) {
    status = "Unpaid";
  } else {
    status = "Partial";
  }

  if (editId) {
    const idx = membersState.findIndex(m => m.id === editId);
    if (idx !== -1) {
      membersState[idx] = {
        ...membersState[idx],
        name,
        phone,
        email,
        gender,
        aadhaarNumber,
        aadhaarCopyUrl,
        plan,
        duration,
        totalFee,
        paidAmount,
        paymentMode,
        startDate,
        expiryDate,
        emergency,
        status
      };
      showToast("Member Updated", `Successfully updated details for ${name}.`, "success");
    }
  } else {
    const nextId = "IP-" + (1000 + membersState.length + 1);
    const newMember = {
      id: nextId,
      name,
      phone,
      email,
      gender,
      aadhaarNumber,
      aadhaarCopyUrl: aadhaarCopyUrl || generateAadhaarMockSvg(name, aadhaarNumber, nextId),
      plan,
      duration,
      totalFee,
      paidAmount,
      paymentMode,
      startDate,
      expiryDate,
      emergency,
      status,
      createdAt: new Date().toISOString()
    };
    membersState.unshift(newMember);
    showToast("Member Registered", `Welcome ${name}! Assigned ID: ${nextId}.`, "success");
  }

  saveMembers();
  updateStats();
  renderMembersTable();
  document.getElementById("memberModal").classList.remove("active");
}

// Profile & Aadhaar KYC Modal
window.openProfileModal = function(memberId) {
  const member = membersState.find(m => m.id === memberId);
  if (!member) return;

  const modal = document.getElementById("profileModal");
  if (!modal) return;

  document.getElementById("profMemberName").textContent = `${member.name} (${member.id})`;
  document.getElementById("profMemberId").textContent = `Gym Athlete Member ID: ${member.id}`;
  document.getElementById("profAvatar").textContent = getInitials(member.name);
  document.getElementById("profFullName").textContent = member.name;
  document.getElementById("profPlanBadge").textContent = `${member.plan} (${member.duration})`;
  
  const statusBadge = document.getElementById("profStatusBadge");
  if (statusBadge) {
    statusBadge.textContent = member.status;
    statusBadge.className = `status-badge ${member.status === 'Paid' ? 'badge-paid' : member.status === 'Unpaid' ? 'badge-unpaid' : 'badge-partial'}`;
  }

  document.getElementById("profPhone").textContent = `+91 ${member.phone}`;
  document.getElementById("profEmail").textContent = member.email || "No email registered";
  document.getElementById("profStartDate").textContent = member.startDate;
  document.getElementById("profExpiryDate").textContent = member.expiryDate;

  // Aadhaar Details
  const aadhaarDisplay = document.getElementById("profAadhaarDisplay");
  const aadhaarImg = document.getElementById("profAadhaarImg");
  const aadhaarPlaceholder = document.getElementById("profAadhaarPlaceholder");

  if (aadhaarDisplay) {
    aadhaarDisplay.textContent = member.aadhaarNumber || "NOT PROVIDED";
  }

  if (member.aadhaarCopyUrl) {
    if (aadhaarImg) {
      aadhaarImg.src = member.aadhaarCopyUrl;
      aadhaarImg.style.display = "block";
    }
    if (aadhaarPlaceholder) aadhaarPlaceholder.style.display = "none";
  } else {
    if (aadhaarImg) aadhaarImg.style.display = "none";
    if (aadhaarPlaceholder) aadhaarPlaceholder.style.display = "block";
  }

  // Bind Buttons inside profile
  const invoiceBtn = document.getElementById("profPrintInvoiceBtn");
  const editBtn = document.getElementById("profEditBtn");

  if (invoiceBtn) {
    invoiceBtn.onclick = () => {
      modal.classList.remove("active");
      openReceiptModal(member.id);
    };
  }

  if (editBtn) {
    editBtn.onclick = () => {
      modal.classList.remove("active");
      editMember(member.id);
    };
  }

  modal.classList.add("active");
};

// Payment Modal
window.openPaymentModal = function(memberId) {
  const member = membersState.find(m => m.id === memberId);
  if (!member) return;

  const due = Math.max(0, Number(member.totalFee) - Number(member.paidAmount));
  document.getElementById("payMemberId").value = member.id;
  document.getElementById("payMemberName").textContent = `${member.name} (${member.id})`;
  document.getElementById("payCurrentDue").textContent = formatCurrency(due);
  document.getElementById("collectAmount").value = due;
  document.getElementById("collectAmount").max = due;

  document.getElementById("paymentModal").classList.add("active");
};

function handleRecordPayment(e) {
  e.preventDefault();
  const memberId = document.getElementById("payMemberId").value;
  const collectAmount = Number(document.getElementById("collectAmount").value || 0);
  const method = document.getElementById("collectMethod").value;

  const idx = membersState.findIndex(m => m.id === memberId);
  if (idx === -1) return;

  const member = membersState[idx];
  const oldPaid = Number(member.paidAmount || 0);
  const newPaid = oldPaid + collectAmount;
  const total = Number(member.totalFee || 0);

  member.paidAmount = newPaid;
  member.paymentMode = method;
  member.status = newPaid >= total ? "Paid" : "Partial";

  saveMembers();
  updateStats();
  renderMembersTable();

  document.getElementById("paymentModal").classList.remove("active");
  showToast("Fee Collected", `Recorded ₹${collectAmount} payment from ${member.name}.`, "success");

  setTimeout(() => {
    openReceiptModal(member.id);
  }, 500);
}

// Receipt Modal with Aadhaar & Phone Number
window.openReceiptModal = function(memberId) {
  const member = membersState.find(m => m.id === memberId);
  if (!member) return;

  const total = Number(member.totalFee || 0);
  const paid = Number(member.paidAmount || 0);
  const due = Math.max(0, total - paid);

  document.getElementById("rcptNumber").textContent = `REC-2026-${member.id.replace('IP-', '00')}`;
  document.getElementById("rcptDate").textContent = `Date: ${new Date().toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' })}`;
  document.getElementById("rcptMemberName").textContent = member.name;
  document.getElementById("rcptMemberPhone").textContent = `Phone: +91 ${member.phone}`;
  document.getElementById("rcptMemberId").textContent = `Member ID: ${member.id} | Valid till: ${member.expiryDate}`;
  
  // Explicit Aadhaar Number on Invoice
  const rcptAadhaar = document.getElementById("rcptMemberAadhaar");
  if (rcptAadhaar) {
    rcptAadhaar.innerHTML = `<i class="fa-solid fa-id-card"></i> Aadhaar No: <strong>${member.aadhaarNumber || 'Verified on Record'}</strong>`;
  }

  document.getElementById("rcptPlanName").textContent = `${member.plan} Membership Pass`;
  document.getElementById("rcptDuration").textContent = member.duration || "Standard";
  
  const statusPill = document.getElementById("rcptStatusPill");
  if (statusPill) {
    if (paid >= total && total > 0) {
      statusPill.textContent = "PAID IN FULL";
      statusPill.className = "rcpt-status-pill pill-paid";
    } else if (paid === 0) {
      statusPill.textContent = "PAYMENT UNPAID";
      statusPill.className = "rcpt-status-pill pill-unpaid";
    } else {
      statusPill.textContent = "PARTIAL PAYMENT";
      statusPill.className = "rcpt-status-pill pill-partial";
    }
  }

  document.getElementById("rcptTotalFee").textContent = formatCurrency(total);
  document.getElementById("rcptSubTotal").textContent = formatCurrency(total);
  document.getElementById("rcptPaidVal").textContent = formatCurrency(paid);
  document.getElementById("rcptDueVal").textContent = formatCurrency(due);
  document.getElementById("rcptPayMethod").textContent = member.paymentMode || "UPI / Counter Cash";

  document.getElementById("receiptModal").classList.add("active");
};

// Export to CSV with Aadhaar Number
function exportMembersCsv() {
  if (membersState.length === 0) {
    showToast("No Data", "No member records available to export.", "warning");
    return;
  }

  const headers = ["Member ID", "Full Name", "Phone", "Aadhaar Card Number", "Email", "Plan", "Duration", "Total Fee (INR)", "Paid Amount (INR)", "Due Balance (INR)", "Status", "Payment Method", "Start Date", "Expiry Date"];
  
  const rows = membersState.map(m => {
    const total = Number(m.totalFee || 0);
    const paid = Number(m.paidAmount || 0);
    const due = Math.max(0, total - paid);
    return [
      `"${m.id}"`,
      `"${m.name.replace(/"/g, '""')}"`,
      `"${m.phone}"`,
      `"${m.aadhaarNumber || ''}"`,
      `"${m.email || ''}"`,
      `"${m.plan}"`,
      `"${m.duration || ''}"`,
      total,
      paid,
      due,
      `"${m.status}"`,
      `"${m.paymentMode || ''}"`,
      `"${m.startDate}"`,
      `"${m.expiryDate}"`
    ].join(",");
  });

  const csvContent = "data:text/csv;charset=utf-8," + [headers.join(","), ...rows].join("\n");
  const encodedUri = encodeURI(csvContent);
  const link = document.createElement("a");
  link.setAttribute("href", encodedUri);
  link.setAttribute("download", `IronPulse_Gym_Members_Report_${new Date().toISOString().split("T")[0]}.csv`);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);

  showToast("CSV Downloaded", "Members ledger with Aadhaar exported.", "success");
}

// Reset Default Data
function resetSampleData() {
  if (confirm("Reset member database back to initial sample roster? Current additions will be refreshed.")) {
    membersState = [...DEFAULT_MEMBERS];
    saveMembers();
    updateStats();
    renderMembersTable();
    showToast("Database Reset", "Sample gym member records restored.", "info");
  }
}

// Set Up Event Listeners
document.addEventListener("DOMContentLoaded", () => {
  loadMembers();
  updateStats();
  renderMembersTable();
  setupPlanFeeBinding();

  // Live Date Display
  const dateEl = document.getElementById("liveDateDisplay");
  if (dateEl) {
    const now = new Date();
    dateEl.textContent = now.toLocaleDateString("en-IN", { weekday: "short", day: "numeric", month: "short", year: "numeric" });
  }

  // Filter Tabs
  document.querySelectorAll(".filter-tab, .sidebar-link[data-filter]").forEach(btn => {
    btn.addEventListener("click", (e) => {
      e.preventDefault();
      const filter = btn.getAttribute("data-filter");
      if (!filter) return;

      activeTab = filter;

      document.querySelectorAll(".filter-tab").forEach(t => {
        t.classList.toggle("active", t.getAttribute("data-filter") === filter);
      });
      document.querySelectorAll(".sidebar-link[data-filter]").forEach(s => {
        s.classList.toggle("active", s.getAttribute("data-filter") === filter);
      });

      renderMembersTable();
    });
  });

  // Search Input (Name, Phone, Aadhaar, ID)
  const searchInput = document.getElementById("memberSearchInput");
  const clearSearchBtn = document.getElementById("searchClearBtn");

  if (searchInput) {
    searchInput.addEventListener("input", (e) => {
      searchQuery = e.target.value;
      if (clearSearchBtn) {
        clearSearchBtn.style.display = searchQuery ? "block" : "none";
      }
      renderMembersTable();
    });
  }

  if (clearSearchBtn) {
    clearSearchBtn.addEventListener("click", () => {
      searchInput.value = "";
      searchQuery = "";
      clearSearchBtn.style.display = "none";
      renderMembersTable();
    });
  }

  // Plan Filter Dropdown
  const planSelect = document.getElementById("planFilterSelect");
  if (planSelect) {
    planSelect.addEventListener("change", (e) => {
      selectedPlan = e.target.value;
      renderMembersTable();
    });
  }

  // Sort Dropdown
  const sortSelect = document.getElementById("sortFilterSelect");
  if (sortSelect) {
    sortSelect.addEventListener("change", (e) => {
      selectedSort = e.target.value;
      renderMembersTable();
    });
  }

  // Modal Triggers
  const openAddBtn = document.getElementById("openNewMemberModalBtn");
  const openAddHeroBtn = document.getElementById("addNewMemberBtnHero");
  const sidebarAddBtn = document.getElementById("sidebarAddMemberBtn");

  if (openAddBtn) openAddBtn.addEventListener("click", openAddMemberModal);
  if (openAddHeroBtn) openAddHeroBtn.addEventListener("click", openAddMemberModal);
  if (sidebarAddBtn) sidebarAddBtn.addEventListener("click", openAddMemberModal);

  // Close Modals
  document.getElementById("closeMemberModal")?.addEventListener("click", () => {
    document.getElementById("memberModal").classList.remove("active");
  });
  document.getElementById("cancelMemberModal")?.addEventListener("click", () => {
    document.getElementById("memberModal").classList.remove("active");
  });

  document.getElementById("closePaymentModal")?.addEventListener("click", () => {
    document.getElementById("paymentModal").classList.remove("active");
  });
  document.getElementById("cancelPaymentModal")?.addEventListener("click", () => {
    document.getElementById("paymentModal").classList.remove("active");
  });

  document.getElementById("closeReceiptModal")?.addEventListener("click", () => {
    document.getElementById("receiptModal").classList.remove("active");
  });

  document.getElementById("closeProfileModal")?.addEventListener("click", () => {
    document.getElementById("profileModal").classList.remove("active");
  });
  document.getElementById("closeProfileModalBtn")?.addEventListener("click", () => {
    document.getElementById("profileModal").classList.remove("active");
  });

  // Print Receipt
  document.getElementById("printReceiptBtn")?.addEventListener("click", () => {
    window.print();
  });

  // Form Submissions
  document.getElementById("memberForm")?.addEventListener("submit", handleSaveMember);
  document.getElementById("recordPaymentForm")?.addEventListener("submit", handleRecordPayment);

  // Export & Reset
  document.getElementById("exportCsvBtn")?.addEventListener("click", exportMembersCsv);
  document.getElementById("sidebarExportBtn")?.addEventListener("click", exportMembersCsv);
  document.getElementById("sidebarResetBtn")?.addEventListener("click", resetSampleData);

  // Empty state reset button
  document.getElementById("emptyResetFilterBtn")?.addEventListener("click", () => {
    activeTab = "all";
    searchQuery = "";
    selectedPlan = "all";
    if (searchInput) searchInput.value = "";
    if (clearSearchBtn) clearSearchBtn.style.display = "none";
    if (planSelect) planSelect.value = "all";
    
    document.querySelectorAll(".filter-tab").forEach(t => {
      t.classList.toggle("active", t.getAttribute("data-filter") === "all");
    });
    renderMembersTable();
  });

  // Mobile Sidebar Toggle
  const sidebarToggle = document.getElementById("sidebarToggle");
  const sidebar = document.getElementById("adminSidebar");
  if (sidebarToggle && sidebar) {
    sidebarToggle.addEventListener("click", () => {
      sidebar.classList.toggle("open-mobile");
    });
  }

  // Handle URL query parameters
  const urlParams = new URLSearchParams(window.location.search);
  const tabParam = urlParams.get("tab");
  const actionParam = urlParams.get("action");

  if (tabParam && ["all", "paid", "unpaid", "expiring"].includes(tabParam)) {
    activeTab = tabParam;
    document.querySelectorAll(".filter-tab").forEach(t => {
      t.classList.toggle("active", t.getAttribute("data-filter") === tabParam);
    });
    document.querySelectorAll(".sidebar-link[data-filter]").forEach(s => {
      s.classList.toggle("active", s.getAttribute("data-filter") === tabParam);
    });
    renderMembersTable();
  }

  // Setup Invoices Hub & Website CMS View Switcher
  setupViewSwitcher();
  setupInvoicesHub();
  setupCmsEditor();

  if (actionParam === "new") {
    setTimeout(openAddMemberModal, 300);
  }
});

// View Switcher (Dashboard vs Invoices vs CMS)
function switchAdminView(viewName) {
  const dashSection = document.getElementById("sectionDashboard");
  const invoicesSection = document.getElementById("sectionInvoices");
  const cmsSection = document.getElementById("sectionCms");

  if (dashSection) dashSection.style.display = viewName === "dashboard" ? "block" : "none";
  if (invoicesSection) invoicesSection.style.display = viewName === "invoices" ? "block" : "none";
  if (cmsSection) cmsSection.style.display = viewName === "cms" ? "block" : "none";

  // Sidebar link active states
  document.querySelectorAll(".sidebar-link").forEach(link => {
    const linkView = link.getAttribute("data-view");
    if (linkView) {
      link.classList.toggle("active", linkView === viewName);
    } else if (viewName === "dashboard" && link.getAttribute("data-filter") === activeTab) {
      link.classList.add("active");
    } else {
      link.classList.remove("active");
    }
  });

  if (viewName === "invoices") {
    renderInvoicesTable();
  } else if (viewName === "cms") {
    loadCmsToAdminForm();
  }
}

function setupViewSwitcher() {
  document.querySelectorAll(".sidebar-link[data-view]").forEach(link => {
    link.addEventListener("click", (e) => {
      e.preventDefault();
      const view = link.getAttribute("data-view");
      switchAdminView(view);
    });
  });

  // When clicking dashboard/filter links, return to dashboard
  document.querySelectorAll(".sidebar-link[data-filter]").forEach(link => {
    link.addEventListener("click", () => {
      switchAdminView("dashboard");
    });
  });
}

// Invoices Hub Logic
function renderInvoicesTable() {
  const tbody = document.getElementById("invoicesTableBody");
  const searchInput = document.getElementById("invoiceSearchInput");
  const invoicesCountEl = document.getElementById("sidebarInvoicesCount");

  if (!tbody) return;

  if (invoicesCountEl) {
    invoicesCountEl.textContent = membersState.length;
  }

  const query = (searchInput?.value || "").toLowerCase().trim();

  const filtered = membersState.filter(m => {
    if (!query) return true;
    const nameMatch = (m.name || "").toLowerCase().includes(query);
    const idMatch = (m.id || "").toLowerCase().includes(query);
    const phoneMatch = (m.phone || "").includes(query);
    const aadhaarMatch = (m.aadhaarNumber || "").replace(/\s/g, "").includes(query.replace(/\s/g, ""));
    return nameMatch || idMatch || phoneMatch || aadhaarMatch;
  });

  tbody.innerHTML = filtered.map(m => {
    const total = Number(m.totalFee || 0);
    const paid = Number(m.paidAmount || 0);
    const due = Math.max(0, total - paid);
    const invNo = `REC-2026-${m.id.replace('IP-', '00')}`;

    let statusPill = "";
    if (paid >= total && total > 0) {
      statusPill = `<span class="status-badge badge-paid"><i class="fa-solid fa-check"></i> Paid Full</span>`;
    } else if (paid === 0) {
      statusPill = `<span class="status-badge badge-unpaid"><i class="fa-solid fa-clock"></i> Unpaid</span>`;
    } else {
      statusPill = `<span class="status-badge badge-partial">Partial (${formatCurrency(paid)})</span>`;
    }

    return `
      <tr class="member-row">
        <td>
          <span style="font-family: monospace; font-weight: 800; color: var(--cyan);">${invNo}</span>
          <div style="font-size: 0.75rem; color: var(--text-dim);">${m.startDate}</div>
        </td>
        <td>
          <strong style="color: #fff;">${escapeHtml(m.name)}</strong>
          <div style="font-size: 0.78rem; color: var(--text-muted);"><i class="fa-solid fa-phone"></i> +91 ${m.phone}</div>
        </td>
        <td>
          <span class="aadhaar-pill-tag"><i class="fa-solid fa-id-card"></i> ${m.aadhaarNumber || 'Verified ID'}</span>
        </td>
        <td>
          <span class="plan-name-tag">${escapeHtml(m.plan)}</span>
          <div style="font-size: 0.75rem; color: var(--text-dim);">${m.duration}</div>
        </td>
        <td>
          <strong style="font-size: 0.95rem; color: #fff;">${formatCurrency(total)}</strong>
        </td>
        <td>
          ${statusPill}
          ${due > 0 ? `<div style="font-size: 0.75rem; color: var(--danger);">Due: ${formatCurrency(due)}</div>` : ''}
        </td>
        <td class="text-right">
          <button class="btn btn-sm btn-outline-cyan" onclick="openReceiptModal('${m.id}')" title="Print Official Tax Receipt">
            <i class="fa-solid fa-print"></i> Print Receipt
          </button>
        </td>
      </tr>
    `;
  }).join("");

  if (searchInput && !searchInput.dataset.bound) {
    searchInput.dataset.bound = "true";
    searchInput.addEventListener("input", renderInvoicesTable);
  }
}

function setupInvoicesHub() {
  const invoicesCountEl = document.getElementById("sidebarInvoicesCount");
  if (invoicesCountEl) {
    invoicesCountEl.textContent = membersState.length;
  }
}

// Website Live CMS Editor Logic
function loadCmsToAdminForm() {
  const cms = getCmsData();

  // Single Head Trainer
  const tName = document.getElementById("cmsTrainerName");
  const tRole = document.getElementById("cmsTrainerRole");
  const tExp = document.getElementById("cmsTrainerExp");
  const tPhone = document.getElementById("cmsTrainerPhone");
  const tBio = document.getElementById("cmsTrainerBio");
  const tPhoto = document.getElementById("cmsTrainerPhoto");
  const tPreview = document.getElementById("cmsTrainerPreview");

  if (tName) tName.value = cms.trainer?.name || "";
  if (tRole) tRole.value = cms.trainer?.role || "";
  if (tExp) tExp.value = cms.trainer?.experience || "";
  if (tPhone) tPhone.value = cms.trainer?.phone || "";
  if (tBio) tBio.value = cms.trainer?.bio || "";
  if (tPhoto) {
    tPhoto.value = cms.trainer?.photo || "";
    if (tPreview) tPreview.src = cms.trainer?.photo || "";
  }

  // Plans & Fees
  if (cms.plans && cms.plans.length >= 3) {
    document.getElementById("cmsPlan1Name").value = cms.plans[0].name || "";
    document.getElementById("cmsPlan1Fee").value = cms.plans[0].fee || 1999;
    document.getElementById("cmsPlan1Tag").value = cms.plans[0].tagline || "";

    document.getElementById("cmsPlan2Name").value = cms.plans[1].name || "";
    document.getElementById("cmsPlan2Fee").value = cms.plans[1].fee || 4999;
    document.getElementById("cmsPlan2Tag").value = cms.plans[1].tagline || "";

    document.getElementById("cmsPlan3Name").value = cms.plans[2].name || "";
    document.getElementById("cmsPlan3Fee").value = cms.plans[2].fee || 14999;
    document.getElementById("cmsPlan3Tag").value = cms.plans[2].tagline || "";
  }

  // Gym Photos & Info
  document.getElementById("cmsGymName").value = cms.gymName || "IRONPULSE FITNESS";
  document.getElementById("cmsGymTagline").value = cms.gymTagline || "";
  const heroInput = document.getElementById("cmsHeroImage");
  const heroPreview = document.getElementById("cmsHeroPreview");
  if (heroInput) {
    heroInput.value = cms.heroImage || "";
    if (heroPreview) heroPreview.src = cms.heroImage || "";
  }
  document.getElementById("cmsGymPhone").value = cms.gymPhone || "";
  document.getElementById("cmsGymAddress").value = cms.gymAddress || "";

  // Today's Routine
  loadCmsWorkoutDay();
}

function loadCmsWorkoutDay() {
  const cms = getCmsData();
  const day = document.getElementById("cmsWorkoutDaySelect")?.value || "monday";
  const workout = cms.dailyWorkouts?.[day] || DEFAULT_CMS.dailyWorkouts.monday;

  const titleInput = document.getElementById("cmsWorkoutTitle");
  const focusInput = document.getElementById("cmsWorkoutFocus");
  const exTextarea = document.getElementById("cmsWorkoutExercises");

  if (titleInput) titleInput.value = workout.title || "";
  if (focusInput) focusInput.value = workout.focus || "";
  if (exTextarea) exTextarea.value = (workout.exercises || []).join("\n");
}

function setupCmsEditor() {
  const daySelect = document.getElementById("cmsWorkoutDaySelect");
  if (daySelect) {
    daySelect.addEventListener("change", loadCmsWorkoutDay);
  }

  // Trainer photo live preview
  const trainerPhotoInput = document.getElementById("cmsTrainerPhoto");
  const trainerPreview = document.getElementById("cmsTrainerPreview");
  if (trainerPhotoInput && trainerPreview) {
    trainerPhotoInput.addEventListener("input", (e) => {
      trainerPreview.src = e.target.value;
    });
  }

  // Hero photo live preview
  const heroPhotoInput = document.getElementById("cmsHeroImage");
  const heroPreview = document.getElementById("cmsHeroPreview");
  if (heroPhotoInput && heroPreview) {
    heroPhotoInput.addEventListener("input", (e) => {
      heroPreview.src = e.target.value;
    });
  }

  // Save CMS Form
  const cmsForm = document.getElementById("cmsForm");
  const saveBtnTop = document.getElementById("saveCmsBtnTop");

  function saveCmsFromForm(e) {
    if (e) e.preventDefault();
    const cms = getCmsData();

    // 1. Single Head Trainer Details
    cms.trainer = {
      name: document.getElementById("cmsTrainerName").value.trim(),
      role: document.getElementById("cmsTrainerRole").value.trim(),
      experience: document.getElementById("cmsTrainerExp").value.trim(),
      phone: document.getElementById("cmsTrainerPhone").value.trim(),
      bio: document.getElementById("cmsTrainerBio").value.trim(),
      photo: document.getElementById("cmsTrainerPhoto").value.trim() || cms.trainer.photo
    };

    // 2. Membership Plans & Fees
    cms.plans[0].name = document.getElementById("cmsPlan1Name").value.trim();
    cms.plans[0].fee = Number(document.getElementById("cmsPlan1Fee").value || 1999);
    cms.plans[0].tagline = document.getElementById("cmsPlan1Tag").value.trim();

    cms.plans[1].name = document.getElementById("cmsPlan2Name").value.trim();
    cms.plans[1].fee = Number(document.getElementById("cmsPlan2Fee").value || 4999);
    cms.plans[1].tagline = document.getElementById("cmsPlan2Tag").value.trim();

    cms.plans[2].name = document.getElementById("cmsPlan3Name").value.trim();
    cms.plans[2].fee = Number(document.getElementById("cmsPlan3Fee").value || 14999);
    cms.plans[2].tagline = document.getElementById("cmsPlan3Tag").value.trim();

    // 3. Gym Photos & Branding
    cms.gymName = document.getElementById("cmsGymName").value.trim();
    cms.gymTagline = document.getElementById("cmsGymTagline").value.trim();
    cms.heroImage = document.getElementById("cmsHeroImage").value.trim() || cms.heroImage;
    cms.gymPhone = document.getElementById("cmsGymPhone").value.trim();
    cms.gymAddress = document.getElementById("cmsGymAddress").value.trim();

    // 4. "Aaj Ye Krna H" routine
    const day = document.getElementById("cmsWorkoutDaySelect").value;
    const title = document.getElementById("cmsWorkoutTitle").value.trim();
    const focus = document.getElementById("cmsWorkoutFocus").value.trim();
    const exercises = document.getElementById("cmsWorkoutExercises").value
      .split("\n")
      .map(s => s.trim())
      .filter(Boolean);

    if (!cms.dailyWorkouts) cms.dailyWorkouts = {};
    cms.dailyWorkouts[day] = {
      title,
      focus,
      intensity: "High (Hypertrophy)",
      exercises
    };

    saveCmsData(cms);
    showToast("Website Updated Live!", "Trainer details, plans & pricing, gym photos, and Today's workout synced to live website.", "success");
  }

  if (cmsForm) cmsForm.addEventListener("submit", saveCmsFromForm);
  if (saveBtnTop) saveBtnTop.addEventListener("click", saveCmsFromForm);
}
