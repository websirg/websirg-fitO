# 🏋️‍♂️ IronPulse Fitness & Gym Management Suite

A state-of-the-art public gym website and comprehensive gym management admin panel designed for modern fitness centers, gym owners, coaches, and reception desks.

## 🚀 Key Features

### 1. 🌟 Public Gym Website (`index.html`)
- **Aesthetic Dark Fitness Theme**: Custom design tokens, glowing neons, and glassmorphic card elements.
- **Biomechanical Workout Disciplines**: Hypertrophy, CrossFit/WOD, HIIT fat loss, and recovery yoga.
- **Interactive Weekly Timetable**: Mon–Sat dynamic schedule with coach assignments and difficulty ratings.
- **Interactive BMI & Calorie Calculator**: Instant BMI scores, body category indicators, and tailored workout/diet recommendations.
- **Membership Tiers & Pricing**:
  - *Standard Iron* (₹1,999 / mo)
  - *Pro Athlete* (₹4,999 / quarter)
  - *VIP Beast Ultimate* (₹14,999 / year)
- **Direct Online Enrollment**: Member signup form that **automatically syncs into the Admin Panel**.

### 2. ⚡ Gym Owner & Fee Controller Panel (`admin.html`)
- **Real-time KPI Metrics**:
  - Total Registered Gym Members
  - Total Fee Collected in Vault (₹)
  - Outstanding / Unpaid Fee Dues (₹)
  - Expiring Memberships (Follow-up reminders)
- **Status Filter Tabs**:
  - `All Members`
  - `Paid Fees`
  - `Unpaid / Due Fees`
  - `Expiring Soon` (7–14 days)
- **Member Roster Table**:
  - Member Avatar & ID
  - Contact Details (Phone & Email)
  - Plan Duration
  - Fee breakdown (Total, Paid, Due balance)
  - Status badges (`Paid`, `Unpaid`, `Partial`)
- **Fee Management Actions**:
  - Register new members
  - Collect pending fee dues via UPI, Cash, Card
  - **Print Official Tax Invoice Receipts** with authorization stamps
  - Export entire member ledger to CSV / Excel
  - LocalStorage persistence (no data loss on refresh)

## 📁 Project Structure
```
├── index.html        # Public Gym Website
├── admin.html        # Gym Management & Fee Controller
├── css/
│   ├── style.css     # Website styles
│   └── admin.css     # Admin dashboard styles
├── js/
│   ├── app.js        # Public website controller & BMI tool
│   └── admin.js      # Fee accounting & member state controller
└── README.md
```

## 🛠️ How to Run
Simply open `index.html` or `admin.html` in any modern web browser or serve via:
```bash
python3 -m http.server 8000
```
- Public Website: `http://localhost:8000/index.html`
- Management Panel: `http://localhost:8000/admin.html`
