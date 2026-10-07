/**
 * IRONPULSE FITNESS - Admin Management & Fee Controller
 * Core State, LocalStorage Persistence, Fee Accounting & Printable Receipts
 */

// Initial Seed Members Data (preloaded if localStorage is empty)
const DEFAULT_MEMBERS = [
  {
    id: "IP-1001",
    name: "Vikramaditya Rathore",
    phone: "9876543210",
    email: "vikram.rathore@gmail.com",
    gender: "Male",
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
    plan: "Standard Iron",
    duration: "1 Month",
    totalFee: 1999,
    paidAmount: 1999,
    paymentMode: "UPI / QR",
    startDate: "2026-09-12",
    expiryDate: "2026-10-12", // Expiring within 4 days!
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
    plan: "Standard Iron",
    duration: "1 Month",
    totalFee: 1999,
    paidAmount: 1999,
    paymentMode: "Cash",
    startDate: "2026-09-10",
    expiryDate: "2026-10-10", // Expiring in 2 days!
    emergency: "+91 9450011223 (Self)",
    status: "Paid",
    createdAt: "2026-09-10T12:00:00Z"
  },
  {
    id: "IP-1009",
    name: "Pooja Hegde",
    phone: "9711882233",
    email: "pooja.hegde@work.com",
    gender: "Female",
    plan: "Pro Athlete",
    duration: "3 Months",
    totalFee: 4999,
    paidAmount: 4999,
    paymentMode: "UPI / QR",
    startDate: "2026-07-28",
    expiryDate: "2026-10-28",
    emergency: "+91 9911004455 (Husband)",
    status: "Paid",
    createdAt: "2026-07-28T09:40:00Z"
  },
  {
    id: "IP-1010",
    name: "Arjun Rampal Mehta",
    phone: "9988112233",
    email: "arjun.mehta@yahoo.com",
    gender: "Male",
    plan: "VIP Beast Ultimate",
    duration: "12 Months",
    totalFee: 14999,
    paidAmount: 14999,
    paymentMode: "Credit / Debit Card",
    startDate: "2026-06-01",
    expiryDate: "2027-06-01",
    emergency: "+91 9899334455 (Personal)",
    status: "Paid",
    createdAt: "2026-06-01T15:30:00Z"
  }
];

const STORAGE_KEY = "ironpulse_gym_members_v1";

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
  const today = new Date("2026-10-08"); // Current workspace anchor time
  const expiry = new Date(expiryDateStr);
  const diffTime = expiry - today;
  return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
}

// Helper: Check if expiring within 14 days
function isExpiringSoon(expiryDateStr) {
  const days = getDaysRemaining(expiryDateStr);
  return days >= 0 && days <= 14;
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
      if (!matchName && !matchPhone && !matchId && !matchEmail) return false;
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
      // Default: recent
      return new Date(b.createdAt || b.startDate) - new Date(a.createdAt || a.startDate);
    }
  });
}

// Generate Member Avatar Color & Initials
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

        <!-- Contact Info -->
        <td>
          <div class="contact-cell">
            <a href="tel:${m.phone}" class="contact-phone"><i class="fa-solid fa-phone"></i> +91 ${m.phone}</a>
            <span class="contact-email">${escapeHtml(m.email || 'N/A')}</span>
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
            ${due > 0 ? `
              <button class="action-btn btn-collect-pay" title="Collect Fee / Record Payment" onclick="openPaymentModal('${m.id}')">
                <i class="fa-solid fa-hand-holding-dollar"></i> Collect
              </button>
            ` : `
              <button class="action-btn btn-receipt" title="Print Fee Receipt" onclick="openReceiptModal('${m.id}')">
                <i class="fa-solid fa-receipt"></i> Receipt
              </button>
            `}
            <button class="action-btn btn-edit" title="Edit Member" onclick="editMember('${m.id}')">
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

// Auto-fill Fee when Plan changes in Add/Edit modal
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
  if (sub) sub.textContent = "Enter member athlete details, assign membership plan and set fee status";

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
  if (sub) sub.textContent = "Update member contact details, assigned plan, or fee adjustments";

  document.getElementById("formFullName").value = member.name || "";
  document.getElementById("formPhone").value = member.phone || "";
  document.getElementById("formEmail").value = member.email || "";
  document.getElementById("formGender").value = member.gender || "Male";
  document.getElementById("formPlan").value = member.plan || "Pro Athlete";
  document.getElementById("formTotalFee").value = member.totalFee || 0;
  document.getElementById("formPaidAmount").value = member.paidAmount || 0;
  document.getElementById("formPaymentMode").value = member.paymentMode || "UPI / QR";
  document.getElementById("formStartDate").value = member.startDate || new Date().toISOString().split("T")[0];
  document.getElementById("formEmergency").value = member.emergency || "";

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
  const plan = document.getElementById("formPlan").value;
  const totalFee = Number(document.getElementById("formTotalFee").value || 0);
  const paidAmount = Number(document.getElementById("formPaidAmount").value || 0);
  const paymentMode = document.getElementById("formPaymentMode").value;
  const startDate = document.getElementById("formStartDate").value || new Date().toISOString().split("T")[0];
  const emergency = document.getElementById("formEmergency").value.trim();

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
    // Update existing
    const idx = membersState.findIndex(m => m.id === editId);
    if (idx !== -1) {
      membersState[idx] = {
        ...membersState[idx],
        name,
        phone,
        email,
        gender,
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
    // Create new
    const nextId = "IP-" + (1000 + membersState.length + 1);
    const newMember = {
      id: nextId,
      name,
      phone,
      email,
      gender,
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
  const notes = document.getElementById("collectNotes").value.trim();

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

  // Automatically offer receipt
  setTimeout(() => {
    openReceiptModal(member.id);
  }, 500);
}

// Receipt Modal
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

// Export to CSV
function exportMembersCsv() {
  if (membersState.length === 0) {
    showToast("No Data", "No member records available to export.", "warning");
    return;
  }

  const headers = ["Member ID", "Full Name", "Phone", "Email", "Plan", "Duration", "Total Fee (INR)", "Paid Amount (INR)", "Due Balance (INR)", "Status", "Payment Method", "Start Date", "Expiry Date"];
  
  const rows = membersState.map(m => {
    const total = Number(m.totalFee || 0);
    const paid = Number(m.paidAmount || 0);
    const due = Math.max(0, total - paid);
    return [
      `"${m.id}"`,
      `"${m.name.replace(/"/g, '""')}"`,
      `"${m.phone}"`,
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

  showToast("CSV Downloaded", "Members ledger exported successfully.", "success");
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

      // Sync active state in UI
      document.querySelectorAll(".filter-tab").forEach(t => {
        t.classList.toggle("active", t.getAttribute("data-filter") === filter);
      });
      document.querySelectorAll(".sidebar-link[data-filter]").forEach(s => {
        s.classList.toggle("active", s.getAttribute("data-filter") === filter);
      });

      renderMembersTable();
    });
  });

  // Search Input
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

  // Handle URL query parameters (e.g. ?tab=unpaid or ?action=new)
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

  if (actionParam === "new") {
    setTimeout(openAddMemberModal, 300);
  }
});
