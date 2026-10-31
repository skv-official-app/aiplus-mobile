const STORAGE_KEY = "aiplus-mobile-state-v7";

// INSTANT UPI RECHARGE & ADSTERRA CONFIGURATION
let MERCHANT_UPI_ID = "aiplusmobile@upi";
let ADSTERRA_DIRECT_LINK = "https://arwf.org/4/b0cdf5d528e176bbcbe98ff9ded13531";

// OFFICIAL FIREBASE GMAIL AUTHENTICATION & REALTIME DATABASE CONFIGURATION
const firebaseConfig = {
  apiKey: "AIzaSyDWiDP9Vo0T-N33LLuR0KfaCuiWw2y7B6k",
  authDomain: "ai-plus-mobile.firebaseapp.com",
  databaseURL: "https://ai-plus-mobile-default-rtdb.firebaseio.com",
  projectId: "ai-plus-mobile",
  storageBucket: "ai-plus-mobile.firebasestorage.app",
  messagingSenderId: "416064122500",
  appId: "1:416064122500:web:d7d0528483bd60a87bdcd1",
  measurementId: "G-R2V27TMN2F"
};

// Initialize Firebase App
if (typeof firebase !== "undefined") {
  try {
    if (!firebase.apps || !firebase.apps.length) {
      firebase.initializeApp(firebaseConfig);
    }
  } catch (e) {
    console.error("Firebase init error: ", e);
  }
}

// WEEKLY & MONTHLY INVESTMENT PLANS DATA
const plansData = [
  // WEEKLY PLANS (7 to 14 Days)
  {
    id: "w1",
    category: "weekly",
    title: "AI+ Weekly Starter Pass",
    price: 100,
    dailyIncome: 30,
    days: 7,
    totalIncome: 210,
    slots: "0/10 Slots",
    image: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=600&auto=format&fit=crop&q=80",
    badge: "7-DAY WEEKLY"
  },
  {
    id: "w2",
    category: "weekly",
    title: "AI+ iPhone 15 Weekly Pass",
    price: 300,
    dailyIncome: 90,
    days: 7,
    totalIncome: 630,
    slots: "Available",
    image: "https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=600&auto=format&fit=crop&q=80",
    badge: "POPULAR WEEKLY"
  },
  {
    id: "w3",
    category: "weekly",
    title: "AI+ Galaxy Ultra Weekly Pass",
    price: 500,
    dailyIncome: 150,
    days: 7,
    totalIncome: 1050,
    slots: "Available",
    image: "https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?w=600&auto=format&fit=crop&q=80",
    badge: "HOT RETURN"
  },
  {
    id: "w4",
    category: "weekly",
    title: "AI+ OnePlus 12 14-Day Pass",
    price: 1000,
    dailyIncome: 210,
    days: 14,
    totalIncome: 2940,
    slots: "Available",
    image: "https://images.unsplash.com/photo-1565849904461-04a58ad377e0?w=600&auto=format&fit=crop&q=80",
    badge: "14-DAY PASS"
  },

  // MONTHLY PLANS (30 to 90 Days)
  {
    id: "m1",
    category: "monthly",
    title: "AI+ Monthly Pro Pass",
    price: 1500,
    dailyIncome: 110,
    days: 30,
    totalIncome: 3300,
    slots: "VIP Available",
    image: "https://images.unsplash.com/photo-1580910051074-3eb694886505?w=600&auto=format&fit=crop&q=80",
    badge: "30-DAY MONTHLY"
  },
  {
    id: "m2",
    category: "monthly",
    title: "AI+ Pixel 8 Monthly Pass",
    price: 2500,
    dailyIncome: 190,
    days: 30,
    totalIncome: 5700,
    slots: "Available",
    image: "https://images.unsplash.com/photo-1546054454-aa26e2b734c7?w=600&auto=format&fit=crop&q=80",
    badge: "HIGH YIELD"
  },
  {
    id: "m3",
    category: "monthly",
    title: "AI+ VIP Foldable 60-Day Pass",
    price: 5000,
    dailyIncome: 200,
    days: 60,
    totalIncome: 12000,
    slots: "VIP Exclusive",
    image: "https://images.unsplash.com/photo-1598327105666-5b89351aff97?w=600&auto=format&fit=crop&q=80",
    badge: "60-DAY VIP"
  },
  {
    id: "m4",
    category: "monthly",
    title: "AI+ VIP Ultra 90-Day Pass",
    price: 10000,
    dailyIncome: 280,
    days: 90,
    totalIncome: 25200,
    slots: "VIP Exclusive",
    image: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=600&auto=format&fit=crop&q=80",
    badge: "90-DAY MEGA"
  }
];

const $ = (selector) => document.querySelector(selector);
const $$ = (selector) => [...document.querySelectorAll(selector)];

const formatINR = (val) => new Intl.NumberFormat("en-IN", { style: "currency", currency: "INR" }).format(val || 0);
const dateStr = () => new Date().toISOString().split("T")[0];

const ADMIN_EMAIL = "surajsumit225412@gmail.com";
const ADMIN_PASS = "admin225412";

// 4-DIGIT VERIFICATION CAPTCHA CODE MANAGEMENT
let currentCaptchaCode = "";
function generateCaptchaCode() {
  currentCaptchaCode = String(Math.floor(1000 + Math.random() * 9000));
  if ($("#captchaBadge")) $("#captchaBadge").textContent = currentCaptchaCode;
  if ($("#inputCaptcha")) $("#inputCaptcha").value = "";
}
window.generateCaptchaCode = generateCaptchaCode;

// DEDUPLICATION HELPER FUNCTIONS FOR DEPOSITS & WITHDRAWALS
function getUniqueDepositRequests(requests) {
  if (!Array.isArray(requests)) return [];
  const seen = new Set();
  const unique = [];
  for (const r of requests) {
    if (!r) continue;
    const key = (r.utr && r.utr.trim()) ? r.utr.trim() : (r.id || (r.userId + "_" + r.amount + "_" + r.date));
    if (key && !seen.has(key)) {
      seen.add(key);
      unique.push(r);
    }
  }
  return unique;
}

function getUniqueWithdrawRequests(requests) {
  if (!Array.isArray(requests)) return [];
  const seen = new Set();
  const unique = [];
  for (const r of requests) {
    if (!r) continue;
    const key = r.id || (r.userId + "_" + r.amount + "_" + r.date);
    if (key && !seen.has(key)) {
      seen.add(key);
      unique.push(r);
    }
  }
  return unique;
}

// LOAD STATE FROM LOCAL STORAGE WITH FULL SANITIZATION
function loadState() {
  const generate5DigitId = () => String(Math.floor(10000 + Math.random() * 90000));

  const defaultState = {
    registeredUsers: [],
    depositRequests: [],
    withdrawRequests: [],
    plansData: plansData,
    adminSettings: {
      upiId: "roli64@ptyes",
      qrImage: "qr.png",
      supportLink: "https://t.me/aiplus_official",
      whatsappNumber: "919876543210",
      websiteUrl: "https://aiplus-official.netlify.app"
    },
    user: {
      id: generate5DigitId(),
      phone: "9876543210",
      name: "AI+ Explorer",
      email: "",
      password: "",
      depositBalance: 0,
      withdrawBalance: 0,
      recharged: 0,
      totalIncome: 0,
      inviteCode: "AI30318",
      lastCheckin: null,
      lastAdWatchDate: null,
      adWatchCount: 0,
      isGoogleOnboarded: false,
      bankAccount: null,
      orders: [],
      transactions: [],
      team: []
    }
  };

  try {
    const saved = JSON.parse(localStorage.getItem(STORAGE_KEY) || "null");
    if (saved && saved.user) {
      if (!Array.isArray(saved.user.orders)) saved.user.orders = [];
      if (!Array.isArray(saved.user.transactions)) saved.user.transactions = [];
      if (!Array.isArray(saved.user.team)) saved.user.team = [];
      if (!Array.isArray(saved.registeredUsers)) saved.registeredUsers = [];
      if (!Array.isArray(saved.depositRequests)) saved.depositRequests = [];
      else saved.depositRequests = getUniqueDepositRequests(saved.depositRequests);
      if (!Array.isArray(saved.withdrawRequests)) saved.withdrawRequests = [];
      else saved.withdrawRequests = getUniqueWithdrawRequests(saved.withdrawRequests);
      if (!Array.isArray(saved.plansData) || saved.plansData.length === 0) saved.plansData = plansData;
      if (!saved.adminSettings) saved.adminSettings = { upiId: "roli64@ptyes", qrImage: "qr.png", supportLink: "https://t.me/aiplus_official", whatsappNumber: "919876543210", websiteUrl: "https://aiplus-official.netlify.app" };
      if (!saved.adminSettings.websiteUrl) saved.adminSettings.websiteUrl = "https://aiplus-official.netlify.app";
      if (typeof saved.user.depositBalance !== "number") saved.user.depositBalance = 0;
      if (typeof saved.user.withdrawBalance !== "number") saved.user.withdrawBalance = 0;

      // Sanitize: Clear auto-polluted admin email from default saved user session
      if (saved.user && saved.user.email && saved.user.email.toLowerCase().trim() === ADMIN_EMAIL.toLowerCase()) {
        if (!saved.user.password || saved.user.password.trim() !== ADMIN_PASS) {
          saved.user.email = "";
          saved.user.name = "AI+ Explorer";
        }
      }

      // Ensure user has a 5-digit ID
      if (!saved.user.id || saved.user.id.length !== 5) {
        saved.user.id = generate5DigitId();
      }
      return saved;
    }
  } catch (e) {
    console.error("loadState error:", e);
  }
  return defaultState;
}

// GLOBAL STATE & CONTROL VARIABLES
let state = loadState();
let currentCategory = "weekly";
let myPlanSubTab = "active";
let authMode = "login";
let adTimerInterval = null;
let toastTimer = null;
let adminDepositStatusFilter = "Pending";
let pendingPurchasePlanId = null;

// REFERRAL HELPER FUNCTIONS
function getShareableReferLink(code) {
  const userCode = code || (state.user ? state.user.inviteCode : "AI30318");
  let baseUrl = (state.adminSettings && state.adminSettings.websiteUrl) ? state.adminSettings.websiteUrl.trim() : "";
  if (!baseUrl) {
    if (window.location.origin && !window.location.origin.includes("localhost") && !window.location.origin.includes("127.0.0.1")) {
      baseUrl = window.location.origin + window.location.pathname;
    } else {
      baseUrl = "https://aiplus-official.netlify.app";
    }
  }
  if (baseUrl.endsWith("/")) {
    baseUrl = baseUrl.slice(0, -1);
  }
  return baseUrl + "?ref=" + userCode;
}

function copyReferCode() {
  const code = (state.user && state.user.inviteCode) ? state.user.inviteCode : "AI30318";
  navigator.clipboard.writeText(code);
  showToast("Referral Code Copied: " + code + " 📋");
}

function copyReferLink() {
  const code = (state.user && state.user.inviteCode) ? state.user.inviteCode : "AI30318";
  const link = getShareableReferLink(code);
  navigator.clipboard.writeText(link);
  showToast("Referral Link Copied: " + link + " 🔗");
}

window.getShareableReferLink = getShareableReferLink;
window.copyReferCode = copyReferCode;
window.copyReferLink = copyReferLink;

// PERMANENT USER ACCOUNT MANAGEMENT WITH GLOBAL FIREBASE REALTIME DATABASE SYNC
function getFirebaseEmailKey(email) {
  if (!email) return "";
  return email.toLowerCase().trim().replace(/[^a-zA-Z0-9]/g, "_");
}

function getSavedUserByEmail(email) {
  if (!email) return null;
  const clean = email.toLowerCase().trim();

  try {
    const savedUser = JSON.parse(localStorage.getItem("aiplus_user_" + clean) || "null");
    if (savedUser && savedUser.id) return savedUser;
  } catch(e){}

  if (state && state.registeredUsers) {
    const found = state.registeredUsers.find(u => u.email && u.email.toLowerCase().trim() === clean);
    if (found && found.id) return found;
  }

  // Pre-seeded Master Admin Account
  if (clean === ADMIN_EMAIL.toLowerCase()) {
    const adminUser = {
      id: "99999",
      phone: "9876543210",
      name: "Master Admin",
      email: ADMIN_EMAIL.toLowerCase(),
      password: ADMIN_PASS,
      depositBalance: 100000,
      withdrawBalance: 50000,
      recharged: 100000,
      totalIncome: 50000,
      inviteCode: "AI99999",
      referredBy: "",
      firstRechargeBonusGiven: true,
      lastCheckin: null,
      lastAdWatchDate: null,
      adWatchCount: 0,
      isGoogleOnboarded: true,
      bankAccount: null,
      orders: [],
      transactions: [],
      team: []
    };
    try { localStorage.setItem("aiplus_user_" + clean, JSON.stringify(adminUser)); } catch(e){}
    return adminUser;
  }

  return null;
}

function saveUserAccount(userObj) {
  if (!userObj || !userObj.email) return;
  const clean = userObj.email.toLowerCase().trim();
  const emailKey = getFirebaseEmailKey(clean);

  try {
    localStorage.setItem("aiplus_user_" + clean, JSON.stringify(userObj));
  } catch(e){}

  if (!state.registeredUsers) state.registeredUsers = [];
  const idx = state.registeredUsers.findIndex(u => u.email && u.email.toLowerCase().trim() === clean);
  if (idx !== -1) {
    state.registeredUsers[idx] = { ...state.registeredUsers[idx], ...userObj };
  } else {
    state.registeredUsers.push(userObj);
  }

  // Global Realtime Firebase Sync by Email Key across all devices / domains
  try {
    if (typeof firebase !== "undefined" && firebase.database) {
      firebase.database().ref("accounts/" + emailKey).set(userObj);
    }
  } catch(e){}
}

function loginOrCreateUser(email, name, password) {
  const cleanEmail = email.toLowerCase().trim();
  const emailKey = getFirebaseEmailKey(cleanEmail);

  const createNewUserObj = (cleanEmail, name, password) => {
    const newId = String(Math.floor(10000 + Math.random() * 90000));
    const userName = name || cleanEmail.split("@")[0].toUpperCase() || "AI+ Explorer";
    const userInviteCode = "AI" + newId;

    const enteredInviteCode = (($("#inputInvite") ? $("#inputInvite").value.trim() : "") || ($("#inputGoogleInvite") ? $("#inputGoogleInvite").value.trim() : "")).toUpperCase();

    const newUser = {
      id: newId,
      phone: "9876543210",
      name: userName,
      email: cleanEmail,
      password: password || "",
      depositBalance: 0,
      withdrawBalance: 0,
      recharged: 0,
      totalIncome: 0,
      inviteCode: userInviteCode,
      referredBy: enteredInviteCode || "",
      firstRechargeBonusGiven: false,
      lastCheckin: null,
      lastAdWatchDate: null,
      adWatchCount: 0,
      isGoogleOnboarded: false,
      bankAccount: null,
      orders: [],
      transactions: [],
      team: []
    };

    // Attach to referrer's team if valid refer code entered
    if (enteredInviteCode) {
      let referrer = null;
      if (state.user && (state.user.inviteCode === enteredInviteCode || state.user.id === enteredInviteCode)) {
        referrer = state.user;
      } else if (state.registeredUsers) {
        referrer = state.registeredUsers.find(u => u.inviteCode === enteredInviteCode || u.id === enteredInviteCode);
      }

      if (referrer) {
        if (!referrer.team) referrer.team = [];
        referrer.team.unshift({
          userId: newUser.id,
          userName: newUser.name,
          userEmail: newUser.email,
          date: new Date().toLocaleDateString(),
          level: 1
        });
        saveUserAccount(referrer);
      }
    }

    return newUser;
  };

  const applyUserLogin = (userObj, isNew) => {
    state.user = userObj;
    saveUserAccount(state.user);
    saveState();
    closeModal("modalAuth");
    render();
    showToast(isNew ? `Account Created Successfully! Welcome ${state.user.name} 🎉` : `Welcome Back, ${state.user.name}! 🎉`);
  };

  // Check Firebase Database globally first for cross-device sync
  if (typeof firebase !== "undefined" && firebase.database) {
    firebase.database().ref("accounts/" + emailKey).once("value").then((snapshot) => {
      const fbUser = snapshot.val();
      const existingLocal = getSavedUserByEmail(cleanEmail);

      if (fbUser && fbUser.id) {
        if (password) fbUser.password = password;
        if (name && name !== "AI+ Explorer") fbUser.name = name;

        // Smart merge: If local storage user has more transactions or higher progress, keep local!
        const localTxCount = (existingLocal && existingLocal.transactions) ? existingLocal.transactions.length : 0;
        const fbTxCount = (fbUser.transactions) ? fbUser.transactions.length : 0;

        if (existingLocal && localTxCount > fbTxCount) {
          applyUserLogin(existingLocal, false);
        } else {
          applyUserLogin(fbUser, false);
        }
      } else if (existingLocal) {
        if (password) existingLocal.password = password;
        applyUserLogin(existingLocal, false);
      } else {
        const newUser = createNewUserObj(cleanEmail, name, password);
        applyUserLogin(newUser, true);
      }
    }).catch(() => {
      const existing = getSavedUserByEmail(cleanEmail);
      if (existing) {
        if (password) existing.password = password;
        applyUserLogin(existing, false);
      } else {
        const newUser = createNewUserObj(cleanEmail, name, password);
        applyUserLogin(newUser, true);
      }
    });
  } else {
    const existing = getSavedUserByEmail(cleanEmail);
    if (existing) {
      if (password) existing.password = password;
      applyUserLogin(existing, false);
    } else {
      const newUser = createNewUserObj(cleanEmail, name, password);
      applyUserLogin(newUser, true);
    }
  }
}

function syncToFirebaseRTDB() {
  try {
    if (typeof firebase !== "undefined" && firebase.database) {
      const userId = (state.user && state.user.id) ? state.user.id : "guest";
      firebase.database().ref("users/" + userId).set(state.user);
      if (state.user && state.user.email) {
        const emailKey = getFirebaseEmailKey(state.user.email);
        firebase.database().ref("accounts/" + emailKey).set(state.user);
      }
      if (state.registeredUsers) {
        firebase.database().ref("all_registered_users").set(state.registeredUsers);
      }
      if (state.adminSettings) {
        firebase.database().ref("admin/settings").set(state.adminSettings);
      }
      if (state.depositRequests) {
        firebase.database().ref("admin/depositRequests").set(state.depositRequests);
      }
      if (state.withdrawRequests) {
        firebase.database().ref("admin/withdrawRequests").set(state.withdrawRequests);
      }
      if (state.plansData) {
        firebase.database().ref("plans").set(state.plansData);
      }
    }
  } catch (e) {
    console.warn("Firebase RTDB sync:", e);
  }
}

function initFirebaseRTDBListener() {
  try {
    if (typeof firebase !== "undefined" && firebase.database) {
      // 1. Admin Settings Realtime Listener (UPI ID & QR Code Image)
      firebase.database().ref("admin/settings").on("value", (snapshot) => {
        const remoteSettings = snapshot.val();
        if (remoteSettings && remoteSettings.upiId) {
          state.adminSettings = { ...state.adminSettings, ...remoteSettings };
          localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
          render();
        }
      });

      // 2. Realtime Deposit Requests Listener (Cross-Device Admin Panel Sync)
      firebase.database().ref("admin/depositRequests").on("value", (snapshot) => {
        const remoteDeps = snapshot.val();
        if (remoteDeps && Array.isArray(remoteDeps)) {
          state.depositRequests = getUniqueDepositRequests(remoteDeps);
          localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
          renderAdminDashboard();
        }
      });

      // 3. Realtime Withdrawal Requests Listener (Cross-Device Admin Panel Sync)
      firebase.database().ref("admin/withdrawRequests").on("value", (snapshot) => {
        const remoteWithdraws = snapshot.val();
        if (remoteWithdraws && Array.isArray(remoteWithdraws)) {
          state.withdrawRequests = getUniqueWithdrawRequests(remoteWithdraws);
          localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
          renderAdminDashboard();
        }
      });

      // 4. All Registered Users Realtime Listener
      firebase.database().ref("all_registered_users").on("value", (snapshot) => {
        const remoteUsers = snapshot.val();
        if (remoteUsers && Array.isArray(remoteUsers)) {
          state.registeredUsers = remoteUsers;
          localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
          renderAdminDashboard();
          renderTeam();
        }
      });

      // 5. Plans Data Realtime Listener
      firebase.database().ref("plans").on("value", (snapshot) => {
        const remotePlans = snapshot.val();
        if (remotePlans && Array.isArray(remotePlans) && remotePlans.length > 0) {
          state.plansData = remotePlans;
          renderPlans();
          renderAdminDashboard();
        }
      });

      // 6. Active User Realtime Listener
      if (state.user && state.user.email) {
        const emailKey = getFirebaseEmailKey(state.user.email);
        firebase.database().ref("accounts/" + emailKey).on("value", (snapshot) => {
          const liveUser = snapshot.val();
          if (liveUser && liveUser.id) {
            const localTx = (state.user.transactions || []).length;
            const remoteTx = (liveUser.transactions || []).length;
            const localOrders = (state.user.orders || []).length;
            const remoteOrders = (liveUser.orders || []).length;

            if (remoteTx > localTx || remoteOrders > localOrders || liveUser.depositBalance !== state.user.depositBalance || liveUser.withdrawBalance !== state.user.withdrawBalance) {
              state.user = { ...state.user, ...liveUser };
              localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
              saveUserAccount(state.user);
              render();
            } else if (remoteTx < localTx || remoteOrders < localOrders) {
              syncToFirebaseRTDB();
            }
          }
        });
      }
    }
  } catch (e) {
    console.warn("RTDB listener:", e);
  }
}

function saveState() {
  try {
    if (state.user && state.user.email) {
      saveUserAccount(state.user);
    }
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    syncToFirebaseRTDB();
  } catch (e) {
    console.error(e);
  }
}

// CHECK MIDNIGHT RESET FOR DAILY AD WATCH LIMIT
function checkDailyResets() {
  const today = dateStr();
  if (state.user.lastAdWatchDate !== today) {
    state.user.lastAdWatchDate = today;
    state.user.adWatchCount = 0;
    saveState();
  }
}

// TOAST MSG
function showToast(msg) {
  const toast = $("#toastBox");
  if (!toast) return;
  toast.textContent = msg;
  toast.classList.add("show");
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => toast.classList.remove("show"), 2800);
}

// NAVIGATION & PAGE HISTORY BACK ARROW SYSTEM
let pageHistory = ["home"];

function switchPage(pageName, pushToHistory = true) {
  if (pushToHistory) {
    if (pageHistory[pageHistory.length - 1] !== pageName) {
      pageHistory.push(pageName);
    }
  }

  $$(".page").forEach(p => p.classList.remove("active"));
  $$(".nav-item").forEach(item => item.classList.toggle("active", item.dataset.page === pageName));

  const targetPage = $(`#page-${pageName}`);
  if (targetPage) targetPage.classList.add("active");

  const backBtn = $("#btnHeaderBack");
  if (backBtn) {
    backBtn.style.display = pageName === "home" ? "none" : "flex";
  }

  window.scrollTo({ top: 0, behavior: "smooth" });
  render();
}

function goBack() {
  if (pageHistory.length > 1) {
    pageHistory.pop();
    const prevPage = pageHistory[pageHistory.length - 1] || "home";
    switchPage(prevPage, false);
  } else {
    switchPage("home", false);
  }
}

function togglePasswordVisibility() {
  const passInput = $("#inputPassword");
  if (passInput) {
    if (passInput.type === "password") {
      passInput.type = "text";
      showToast("Password visible 👁️");
    } else {
      passInput.type = "password";
      showToast("Password hidden 🔒");
    }
  }
}

window.goBack = goBack;
window.togglePasswordVisibility = togglePasswordVisibility;

// MODAL HANDLERS
function openModal(modalId) {
  const modal = $(`#${modalId}`);
  if (modal) {
    modal.classList.add("open");
    modal.style.setProperty("display", "flex", "important");
  }
}

function closeModal(modalId) {
  const modal = $(`#${modalId}`);
  if (modal) {
    modal.classList.remove("open");
    modal.style.setProperty("display", "none", "important");
  }
}

function closeAdminPanel() {
  closeModal("modalAdmin");
}

function toggleAuthMode() {
  authMode = authMode === "login" ? "register" : "login";
  updateAuthModalUI();
}

window.openModal = openModal;
window.closeModal = closeModal;
window.closeAdminPanel = closeAdminPanel;
window.toggleAuthMode = toggleAuthMode;

// OPEN MASTER ADMIN PANEL (ONLY FOR sumitkumarverma60436@gmail.com WITH PASSWORD 995600036rr)
function openAdminPanel() {
  const isAuthorized = Boolean(
    state.user && state.user.email && state.user.password &&
    state.user.email.toLowerCase().trim() === ADMIN_EMAIL.toLowerCase() &&
    state.user.password.trim() === ADMIN_PASS
  );

  if (!isAuthorized) {
    showToast("Access Denied! Master Admin Panel is restricted to " + ADMIN_EMAIL + " 🛡️");
    return;
  }
  renderAdminDashboard();
  openModal("modalAdmin");
  showToast("Master Admin Control Panel Unlocked! 🛡️");
}

// ADMIN PANEL TAB SWITCHING & DASHBOARD RENDERING
function switchAdminTab(tabName) {
  $$(".admin-tab-chip").forEach(c => c.classList.toggle("active", c.dataset.adminTab === tabName));
  $$(".admin-tab-page").forEach(p => {
    p.classList.remove("active");
    p.style.display = "none";
  });

  const targetId = "adminTab" + tabName.charAt(0).toUpperCase() + tabName.slice(1);
  const targetPage = $(`#${targetId}`);
  if (targetPage) {
    targetPage.classList.add("active");
    targetPage.style.display = "block";
  }
  renderAdminDashboard();
}

function renderAdminDashboard() {
  if ($("#statTotalUsers")) $("#statTotalUsers").textContent = String(state.registeredUsers ? state.registeredUsers.length : 0);

  let totalOrders = 0;
  if (state.registeredUsers) {
    state.registeredUsers.forEach(u => {
      if (u.orders) totalOrders += u.orders.length;
    });
  }
  if (state.user && state.user.orders) totalOrders += state.user.orders.length;
  if ($("#statTotalOrders")) $("#statTotalOrders").textContent = String(totalOrders);

  const approvedDepositsSum = (state.depositRequests || [])
    .filter(r => r.status === "Approved")
    .reduce((acc, r) => acc + (r.amount || 0), 0);
  if ($("#statApprovedDeposits")) $("#statApprovedDeposits").textContent = formatINR(approvedDepositsSum);

  const approvedWithdrawsSum = (state.withdrawRequests || [])
    .filter(r => r.status === "Approved")
    .reduce((acc, r) => acc + (r.amount || 0), 0);
  if ($("#statApprovedWithdraws")) $("#statApprovedWithdraws").textContent = formatINR(approvedWithdrawsSum);

  // Update Deposit Filter Counts
  const allDeps = state.depositRequests || [];
  const pendingCount = allDeps.filter(r => r.status === "Pending").length;
  const approvedCount = allDeps.filter(r => r.status === "Approved").length;
  const rejectedCount = allDeps.filter(r => r.status === "Rejected").length;

  if ($("#countDepPending")) $("#countDepPending").textContent = String(pendingCount);
  if ($("#countDepApproved")) $("#countDepApproved").textContent = String(approvedCount);
  if ($("#countDepRejected")) $("#countDepRejected").textContent = String(rejectedCount);

  const depList = $("#adminDepositReqList");
  if (depList) {
    let filteredDeps = allDeps;
    if (adminDepositStatusFilter !== "All") {
      filteredDeps = allDeps.filter(r => (r.status || "Pending") === adminDepositStatusFilter);
    }

    if (filteredDeps.length === 0) {
      depList.innerHTML = `<p style="font-size:12px; color:var(--text-muted); text-align:center; padding:12px;">No ${adminDepositStatusFilter} deposit requests found.</p>`;
    } else {
      depList.innerHTML = filteredDeps.map(r => `
        <div class="admin-req-card">
          <div class="req-header-row">
            <strong style="font-size:13px;">${r.userName || 'User'} (${r.userEmail || ''})</strong>
            <span class="status-tag status-${(r.status || 'pending').toLowerCase()}">${r.status || 'Pending'}</span>
          </div>
          <div style="font-size:11px; color:var(--text-muted); margin-bottom:4px;">
            User ID: <strong style="color:var(--primary);">${r.userId || 'N/A'}</strong> | Amount: <strong style="color:var(--green);">${formatINR(r.amount || 0)}</strong>
          </div>
          <div style="font-size:11px; color:var(--text-muted);">
            UTR / Ref: <strong>${r.utr || 'N/A'}</strong> | App: <strong>${r.upiApp || 'UPI'}</strong> | Date/Time: ${r.date || ''}
          </div>
          ${r.status === 'Pending' ? `
            <div class="req-actions-row">
              <button class="btn-approve zoom-touch" onclick="approveDepositReq('${r.id}')">✓ Approve Deposit</button>
              <button class="btn-reject zoom-touch" onclick="rejectDepositReq('${r.id}')">✕ Reject</button>
            </div>
          ` : ''}
        </div>
      `).join("");
    }
  }

  const withdrawList = $("#adminWithdrawReqList");
  if (withdrawList) {
    const withdrawReqs = state.withdrawRequests || [];
    if (withdrawReqs.length === 0) {
      withdrawList.innerHTML = `<p style="font-size:12px; color:var(--text-muted); text-align:center; padding:12px;">No withdrawal requests found.</p>`;
    } else {
      withdrawList.innerHTML = withdrawReqs.map(r => `
        <div class="admin-req-card">
          <div class="req-header-row">
            <strong style="font-size:13px;">${r.userName || 'User'} (${r.userEmail || ''})</strong>
            <span class="status-tag status-${(r.status || 'pending').toLowerCase()}">${r.status || 'Pending'}</span>
          </div>
          <div style="font-size:11px; color:var(--text-muted); margin-bottom:4px;">
            User ID: <strong style="color:var(--primary);">${r.userId || 'N/A'}</strong> | Amount: <strong style="color:#E11D48;">${formatINR(r.amount || 0)}</strong>
          </div>
          <div style="font-size:11px; color:var(--text-muted);">
            Bank: <strong>${r.bankDetails || 'Not specified'}</strong> | Date: ${r.date || ''}
          </div>
          ${r.status === 'Pending' ? `
            <div class="req-actions-row">
              <button class="btn-approve zoom-touch" onclick="approveWithdrawReq('${r.id}')">✓ Approve Withdrawal</button>
              <button class="btn-reject zoom-touch" onclick="rejectWithdrawReq('${r.id}')">✕ Reject &amp; Refund</button>
            </div>
          ` : ''}
        </div>
      `).join("");
    }
  }

  const existingPlansBox = $("#adminExistingPlansList");
  if (existingPlansBox) {
    const allPlans = (state.plansData && state.plansData.length > 0) ? state.plansData : plansData;
    const categoryPlans = allPlans.filter(p => (p.category || "weekly") === adminPlanCategory);

    if (categoryPlans.length === 0) {
      existingPlansBox.innerHTML = `<p style="font-size:12px; color:var(--text-muted); text-align:center; padding:12px;">No ${adminPlanCategory} plans found.</p>`;
    } else {
      existingPlansBox.innerHTML = categoryPlans.map((p, index) => `
        <div class="admin-plan-reorder-card"
             draggable="true"
             ondragstart="handlePlanDragStart(event, '${p.id}')"
             ondragover="handlePlanDragOver(event)"
             ondrop="handlePlanDrop(event, '${p.id}')"
             style="background:#FFF; border:1px solid var(--line-color); border-radius:10px; padding:12px; margin-bottom:10px; box-shadow:0 2px 6px rgba(0,0,0,0.04); cursor:grab;">

          <div style="display:flex; justify-content:space-between; align-items:flex-start; margin-bottom:8px;">
            <div style="display:flex; align-items:center; gap:8px;">
              <span style="cursor:grab; font-size:14px; color:var(--text-muted);" title="Drag to reorder">⋮⋮</span>
              <div>
                <strong style="font-size:13px; color:var(--text-main); display:block;">${p.title}</strong>
                <span style="font-size:10px; color:var(--primary); font-weight:700;">Position #${index + 1} in ${(p.category || 'weekly').toUpperCase()}</span>
              </div>
            </div>
            <span class="plan-badge-tag" style="position:static; padding:2px 6px; font-size:9px;">${p.badge || 'PASS'}</span>
          </div>

          <div style="display:flex; gap:10px; align-items:center; margin-bottom:8px; font-size:11px; color:var(--text-muted);">
            <img src="${p.image}" alt="${p.title}" style="width:48px; height:32px; object-fit:cover; border-radius:6px; flex-shrink:0;">
            <div>
              Price: <strong style="color:var(--text-main);">${formatINR(p.price)}</strong> | Daily: <strong style="color:var(--green);">${formatINR(p.dailyIncome)}</strong> | ${p.days} Days
            </div>
          </div>

          <div style="display:flex; justify-content:space-between; align-items:center; border-top:1px dashed #F0EBFB; margin-top:6px; padding-top:6px;">
            <div style="display:flex; gap:4px; flex-wrap:wrap;">
              <button type="button" class="amt-chip" style="padding:3px 6px; font-size:10px; font-weight:800;" onclick="movePlanOrder('${p.id}', 'top')">🔝 Top</button>
              <button type="button" class="amt-chip" style="padding:3px 6px; font-size:10px; font-weight:800;" onclick="movePlanOrder('${p.id}', 'up')">▲ Up</button>
              <button type="button" class="amt-chip" style="padding:3px 6px; font-size:10px; font-weight:800;" onclick="movePlanOrder('${p.id}', 'down')">▼ Down</button>
              <button type="button" class="amt-chip" style="padding:3px 6px; font-size:10px; font-weight:800;" onclick="movePlanOrder('${p.id}', 'bottom')">⬇️ Bottom</button>
            </div>
            <button type="button" class="btn-reject" style="flex:none; padding:4px 10px; font-size:10px; font-weight:800;" onclick="deleteAdminPlan('${p.id}')">🗑️ Delete</button>
          </div>
        </div>
      `).join("");
    }
  }

  const userOrdersBox = $("#adminUserOrdersList");
  if (userOrdersBox) {
    let allOrders = [];
    if (state.registeredUsers) {
      state.registeredUsers.forEach(u => {
        if (u.orders) {
          u.orders.forEach(o => {
            allOrders.push({ ...o, userName: u.name, userEmail: u.email, userId: u.id });
          });
        }
      });
    }
    if (state.user && state.user.orders) {
      state.user.orders.forEach(o => {
        allOrders.push({ ...o, userName: state.user.name, userEmail: state.user.email, userId: state.user.id });
      });
    }

    if (allOrders.length === 0) {
      userOrdersBox.innerHTML = `<p style="font-size:12px; color:var(--text-muted); text-align:center; padding:12px;">No user purchased plans found.</p>`;
    } else {
      userOrdersBox.innerHTML = allOrders.map(o => `
        <div class="admin-req-card">
          <div class="req-header-row">
            <strong style="font-size:13px;">${o.planTitle || 'Investment Plan'}</strong>
            <span class="status-tag ${o.completed ? 'status-approved' : 'status-pending'}">${o.completed ? 'COMPLETED' : 'RUNNING ACTIVE'}</span>
          </div>
          <div style="font-size:11px; color:var(--text-muted); margin-bottom:4px;">
            User: <strong>${o.userName || 'User'} (${o.userEmail || ''})</strong> | ID: <strong style="color:var(--primary);">${o.userId || 'N/A'}</strong>
          </div>
          <div style="font-size:11px; color:var(--text-muted);">
            Price: <strong style="color:var(--primary);">${formatINR(o.price || 0)}</strong> | Daily Return: <strong style="color:var(--green);">${formatINR(o.dailyIncome || 0)}</strong> | Purchased: ${o.date || ''}
          </div>
        </div>
      `).join("");
    }
  }
}

function switchAdminDepositFilter(status) {
  adminDepositStatusFilter = status;
  $$(".admin-sub-chip").forEach(c => c.classList.toggle("active", c.dataset.depStatus === status));
  renderAdminDashboard();
}
window.switchAdminDepositFilter = switchAdminDepositFilter;

// APPROVE DEPOSIT REQUEST
function approveDepositReq(reqId) {
  const req = (state.depositRequests || []).find(r => r.id === reqId);
  if (!req || req.status === "Approved") return;

  req.status = "Approved";

  let targetUser = null;
  if (state.user && (state.user.id === req.userId || state.user.email === req.userEmail)) {
    targetUser = state.user;
  } else if (state.registeredUsers) {
    targetUser = state.registeredUsers.find(u => u.id === req.userId || u.email === req.userEmail);
  }

  if (targetUser) {
    targetUser.depositBalance = (targetUser.depositBalance || 0) + req.amount;
    targetUser.recharged = (targetUser.recharged || 0) + req.amount;

    if (!targetUser.transactions) targetUser.transactions = [];
    targetUser.transactions.unshift({
      title: "Deposit Approved (UTR: " + req.utr + ")",
      amount: req.amount,
      type: "recharge",
      date: new Date().toLocaleString()
    });

    // Check Referral First Recharge ₹500+ Bonus (₹200 to Referrer)
    if (!targetUser.firstRechargeBonusGiven && targetUser.recharged >= 500 && targetUser.referredBy) {
      targetUser.firstRechargeBonusGiven = true;
      const refCode = String(targetUser.referredBy).toUpperCase().trim();

      let referrer = null;
      if (state.user && (
          (state.user.inviteCode && state.user.inviteCode.toUpperCase() === refCode) ||
          (state.user.id && String(state.user.id) === refCode) ||
          (state.user.email && state.user.email.toLowerCase() === refCode.toLowerCase())
      )) {
        referrer = state.user;
      } else if (state.registeredUsers) {
        referrer = state.registeredUsers.find(u =>
          (u.inviteCode && u.inviteCode.toUpperCase() === refCode) ||
          (u.id && String(u.id) === refCode) ||
          (u.email && u.email.toLowerCase() === refCode.toLowerCase())
        );
      }

      if (referrer) {
        referrer.withdrawBalance = (referrer.withdrawBalance || 0) + 200;
        referrer.totalIncome = (referrer.totalIncome || 0) + 200;
        if (!referrer.transactions) referrer.transactions = [];
        referrer.transactions.unshift({
          title: "Referral Cash Bonus (First ₹500+ Recharge by " + (targetUser.name || "Friend") + ")",
          amount: 200,
          type: "referral_bonus",
          date: new Date().toLocaleString('en-IN', { dateStyle: 'medium', timeStyle: 'short' })
        });
        saveUserAccount(referrer);
      }
    }

    saveUserAccount(targetUser);
  }

  saveState();
  renderAdminDashboard();
  render();
  showToast(`Deposit of ${formatINR(req.amount)} Approved & Credited! 🎉`);
}

// REJECT DEPOSIT REQUEST
function rejectDepositReq(reqId) {
  const req = (state.depositRequests || []).find(r => r.id === reqId);
  if (!req) return;

  req.status = "Rejected";
  saveState();
  renderAdminDashboard();
  showToast(`Deposit request Rejected!`);
}

// APPROVE WITHDRAWAL REQUEST
function approveWithdrawReq(reqId) {
  const req = (state.withdrawRequests || []).find(r => r.id === reqId);
  if (!req || req.status === "Approved") return;

  req.status = "Approved";

  let targetUser = null;
  if (state.user && (state.user.id === req.userId || state.user.email === req.userEmail)) {
    targetUser = state.user;
  } else if (state.registeredUsers) {
    targetUser = state.registeredUsers.find(u => u.id === req.userId || u.email === req.userEmail);
  }

  if (targetUser) {
    if (!targetUser.transactions) targetUser.transactions = [];
    const pendingTx = targetUser.transactions.find(t => t.requestId === req.id || (t.type === "withdraw" && t.status === "Pending" && Math.abs(t.amount) === req.amount));
    if (pendingTx) {
      pendingTx.title = "Withdrawal Approved";
      pendingTx.status = "Approved";
    } else {
      targetUser.transactions.unshift({
        title: "Withdrawal Approved",
        amount: -req.amount,
        type: "withdraw_approved",
        status: "Approved",
        requestId: req.id,
        date: new Date().toLocaleString('en-IN', { dateStyle: 'medium', timeStyle: 'short' })
      });
    }
    saveUserAccount(targetUser);
  }

  saveState();
  renderAdminDashboard();
  render();
  showToast(`Withdrawal of ${formatINR(req.amount)} Approved! 💸`);
}

// REJECT WITHDRAWAL REQUEST
function rejectWithdrawReq(reqId) {
  const req = (state.withdrawRequests || []).find(r => r.id === reqId);
  if (!req || req.status === "Rejected") return;

  req.status = "Rejected";

  let targetUser = null;
  if (state.user && (state.user.id === req.userId || state.user.email === req.userEmail)) {
    targetUser = state.user;
  } else if (state.registeredUsers) {
    targetUser = state.registeredUsers.find(u => u.id === req.userId || u.email === req.userEmail);
  }

  if (targetUser) {
    // REFUND BALANCE INSTANTLY TO USER WITHDRAWAL BALANCE
    targetUser.withdrawBalance = (targetUser.withdrawBalance || 0) + req.amount;

    if (!targetUser.transactions) targetUser.transactions = [];
    const pendingTx = targetUser.transactions.find(t => t.requestId === req.id || (t.type === "withdraw" && t.status === "Pending" && Math.abs(t.amount) === req.amount));
    if (pendingTx) {
      pendingTx.title = "Withdrawal Rejected";
      pendingTx.status = "Rejected";
    }

    // Add Refund Entry (+₹amount) in transaction history
    targetUser.transactions.unshift({
      title: "Withdrawal Refunded (Rejected)",
      amount: req.amount,
      type: "withdraw_refund",
      status: "Refunded",
      requestId: req.id,
      date: new Date().toLocaleString('en-IN', { dateStyle: 'medium', timeStyle: 'short' })
    });

    saveUserAccount(targetUser);
  }

  saveState();
  renderAdminDashboard();
  render();
  showToast(`Withdrawal Rejected & ${formatINR(req.amount)} Refunded to User! 💸`);
}

// SEARCH USER FOR ADMIN BALANCE MODIFIER BY 5-DIGIT ID OR EMAIL
let currentFoundUser = null;
function searchUserForAdmin() {
  const query = $("#adminSearchUserId") ? $("#adminSearchUserId").value.trim().toLowerCase() : "";
  if (!query) {
    showToast("Please enter a 5-digit User ID or Gmail!");
    return;
  }

  if (state.user.id === query || (state.user.email && state.user.email.toLowerCase() === query)) {
    currentFoundUser = state.user;
  } else {
    currentFoundUser = (state.registeredUsers || []).find(u => u.id === query || (u.email && u.email.toLowerCase() === query));
  }

  if (!currentFoundUser) {
    showToast("User not found with ID/Email: " + query);
    if ($("#adminSearchResultBox")) $("#adminSearchResultBox").style.display = "none";
    return;
  }

  if ($("#adminFoundUserName")) $("#adminFoundUserName").textContent = currentFoundUser.name || "User";
  if ($("#adminFoundUserEmail")) $("#adminFoundUserEmail").textContent = currentFoundUser.email || "";
  if ($("#adminFoundUserId")) $("#adminFoundUserId").textContent = currentFoundUser.id || "N/A";
  if ($("#adminFoundDepBal")) $("#adminFoundDepBal").textContent = formatINR(currentFoundUser.depositBalance || 0);
  if ($("#adminFoundEarnBal")) $("#adminFoundEarnBal").textContent = formatINR(currentFoundUser.withdrawBalance || 0);

  if ($("#adminSearchResultBox")) $("#adminSearchResultBox").style.display = "block";
}

function modifyUserBal(action) {
  if (!currentFoundUser) return;
  const amt = parseFloat($("#adminModAmount") ? $("#adminModAmount").value : 0) || 0;
  if (amt <= 0) {
    showToast("Please enter a valid amount!");
    return;
  }

  if (!currentFoundUser.transactions) currentFoundUser.transactions = [];

  if (action === "add") {
    currentFoundUser.depositBalance = (currentFoundUser.depositBalance || 0) + amt;
    currentFoundUser.transactions.unshift({
      title: "Admin Deposit Balance Added",
      amount: amt,
      type: "admin_add",
      date: new Date().toLocaleString('en-IN', { dateStyle: 'medium', timeStyle: 'short' })
    });
    showToast(`+${formatINR(amt)} added to User Deposit Balance! 🎉`);
  } else {
    currentFoundUser.depositBalance = Math.max(0, (currentFoundUser.depositBalance || 0) - amt);
    currentFoundUser.transactions.unshift({
      title: "Admin Deposit Balance Deducted",
      amount: -amt,
      type: "admin_deduct",
      date: new Date().toLocaleString('en-IN', { dateStyle: 'medium', timeStyle: 'short' })
    });
    showToast(`-${formatINR(amt)} deducted from User Deposit Balance!`);
  }

  saveUserAccount(currentFoundUser);
  saveState();
  render();
  searchUserForAdmin();
}

let adminPlanCategory = "weekly";
let draggedPlanId = null;

function switchAdminPlanCategory(cat) {
  adminPlanCategory = cat;
  if ($("#btnAdminCategoryWeekly")) $("#btnAdminCategoryWeekly").classList.toggle("active", cat === "weekly");
  if ($("#btnAdminCategoryMonthly")) $("#btnAdminCategoryMonthly").classList.toggle("active", cat === "monthly");
  renderAdminDashboard();
}

function handlePlanDragStart(e, planId) {
  draggedPlanId = planId;
  if (e.dataTransfer) {
    e.dataTransfer.effectAllowed = "move";
    e.dataTransfer.setData("text/plain", planId);
  }
}

function handlePlanDragOver(e) {
  if (e.preventDefault) e.preventDefault();
  if (e.dataTransfer) e.dataTransfer.dropEffect = "move";
  return false;
}

function handlePlanDrop(e, targetPlanId) {
  if (e.preventDefault) e.preventDefault();
  if (e.stopPropagation) e.stopPropagation();

  if (!draggedPlanId || draggedPlanId === targetPlanId) return false;

  const plans = (state.plansData && state.plansData.length > 0) ? state.plansData : plansData;
  const fromIdx = plans.findIndex(p => p.id === draggedPlanId);
  const toIdx = plans.findIndex(p => p.id === targetPlanId);

  if (fromIdx !== -1 && toIdx !== -1) {
    const [movedItem] = plans.splice(fromIdx, 1);
    plans.splice(toIdx, 0, movedItem);
    state.plansData = plans;
    saveState();
    renderPlans();
    renderAdminDashboard();
    showToast("Plan reordered successfully! 🎯");
  }
  draggedPlanId = null;
  return false;
}

function movePlanOrder(planId, action) {
  const plans = (state.plansData && state.plansData.length > 0) ? state.plansData : plansData;
  const idx = plans.findIndex(p => p.id === planId);
  if (idx === -1) return;

  const currentCategory = plans[idx].category || "weekly";
  const categoryIndices = [];
  plans.forEach((p, i) => {
    if ((p.category || "weekly") === currentCategory) categoryIndices.push(i);
  });

  const pos = categoryIndices.indexOf(idx);
  if (pos === -1) return;

  if (action === "top") {
    if (pos === 0) return;
    const targetIdx = categoryIndices[0];
    const [item] = plans.splice(idx, 1);
    plans.splice(targetIdx, 0, item);
    showToast("Plan moved to Top! 🔝");
  } else if (action === "up") {
    if (pos === 0) return;
    const targetIdx = categoryIndices[pos - 1];
    const temp = plans[idx];
    plans[idx] = plans[targetIdx];
    plans[targetIdx] = temp;
    showToast("Plan moved Up! ⬆️");
  } else if (action === "down") {
    if (pos === categoryIndices.length - 1) return;
    const targetIdx = categoryIndices[pos + 1];
    const temp = plans[idx];
    plans[idx] = plans[targetIdx];
    plans[targetIdx] = temp;
    showToast("Plan moved Down! ⬇️");
  } else if (action === "bottom") {
    if (pos === categoryIndices.length - 1) return;
    const targetIdx = categoryIndices[categoryIndices.length - 1];
    const [item] = plans.splice(idx, 1);
    plans.splice(targetIdx, 0, item);
    showToast("Plan moved to Bottom! ⬇️");
  }

  state.plansData = plans;
  saveState();
  renderPlans();
  renderAdminDashboard();
}

// CREATE NEW PLAN IN ADMIN WITH FILE UPLOAD & REORDERING
function handleAdminCreatePlan(e) {
  if (e) e.preventDefault();
  const title = $("#newPlanTitle") ? $("#newPlanTitle").value.trim() : "";
  const price = parseFloat($("#newPlanPrice") ? $("#newPlanPrice").value : 0) || 0;
  const dailyIncome = parseFloat($("#newPlanDaily") ? $("#newPlanDaily").value : 0) || 0;
  const days = parseInt($("#newPlanDays") ? $("#newPlanDays").value : 7) || 7;
  const category = $("#newPlanCategory") ? $("#newPlanCategory").value : "weekly";
  const badge = $("#newPlanBadge") ? $("#newPlanBadge").value.trim() : "NEW PASS";
  const imgUrlInput = $("#newPlanImgUrl") ? $("#newPlanImgUrl").value.trim() : "";
  const fileInput = $("#newPlanImgFile");

  if (!title || price <= 0 || dailyIncome <= 0) {
    showToast("Please fill all valid plan details!");
    return;
  }

  const createAndSavePlan = (imgSrc) => {
    const defaultImg = "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=600&auto=format&fit=crop&q=80";
    const finalImg = imgSrc || imgUrlInput || defaultImg;

    const newPlan = {
      id: "p_" + Date.now(),
      category: category,
      title: title,
      price: price,
      dailyIncome: dailyIncome,
      days: days,
      totalIncome: dailyIncome * days,
      slots: "Available",
      image: finalImg,
      badge: badge || "SPECIAL PASS"
    };

    if (!state.plansData) state.plansData = [...plansData];
    state.plansData.unshift(newPlan);

    if ($("#formAdminCreatePlan")) $("#formAdminCreatePlan").reset();

    saveState();
    renderPlans();
    renderAdminDashboard();
    showToast(`New Plan "${title}" Created & Published Successfully! 🚀`);
  };

  const file = fileInput && fileInput.files && fileInput.files[0];
  if (file) {
    const reader = new FileReader();
    reader.onload = function(evt) {
      createAndSavePlan(evt.target.result);
    };
    reader.readAsDataURL(file);
  } else {
    createAndSavePlan(imgUrlInput);
  }
}

function deleteAdminPlan(planId) {
  const plans = (state.plansData && state.plansData.length > 0) ? state.plansData : plansData;
  const idx = plans.findIndex(p => p.id === planId);
  if (idx !== -1) {
    const title = plans[idx].title;
    plans.splice(idx, 1);
    state.plansData = plans;
    saveState();
    renderPlans();
    renderAdminDashboard();
    showToast(`Plan "${title}" deleted successfully!`);
  }
}

// SAVE ADMIN UPI, QR & SUPPORT SETTINGS
function handleAdminSaveQrSettings(e) {
  if (e) {
    e.preventDefault();
    if (e.stopPropagation) e.stopPropagation();
  }
  const upiId = $("#adminInputUpiId") ? $("#adminInputUpiId").value.trim() : "roli64@ptyes";
  const previewImg = $("#adminQrPreviewImg");
  const qrImage = (previewImg && previewImg.src) ? previewImg.src : "qr.png";
  const supportLink = $("#adminInputSupportLink") ? $("#adminInputSupportLink").value.trim() : "https://t.me/aiplus_official";
  const whatsappNumber = $("#adminInputWhatsappNumber") ? $("#adminInputWhatsappNumber").value.trim() : "919876543210";
  const websiteUrl = $("#adminInputWebsiteUrl") ? $("#adminInputWebsiteUrl").value.trim() : "";

  if (!state.adminSettings) state.adminSettings = {};
  state.adminSettings.upiId = upiId;
  state.adminSettings.qrImage = qrImage;
  state.adminSettings.supportLink = supportLink;
  state.adminSettings.whatsappNumber = whatsappNumber;
  state.adminSettings.websiteUrl = websiteUrl;

  saveState();
  render();
  showToast("UPI, QR, Telegram, WhatsApp & Referral Link Settings Saved! ⚙️");
  return false;
}

function openTelegramChannel() {
  const link = (state.adminSettings && state.adminSettings.supportLink) ? state.adminSettings.supportLink : "https://t.me/aiplus_official";
  showToast("Opening Telegram Channel... 📢");
  window.open(link, "_blank");
}

function openCustomerSupport() {
  const activeNum = (state.adminSettings && state.adminSettings.whatsappNumber) ? state.adminSettings.whatsappNumber.trim() : "919876543210";
  const cleanNum = activeNum.replace(/\D/g, "");
  const userEmail = (state.user && state.user.email) ? state.user.email : "";
  const userId = (state.user && state.user.id) ? state.user.id : "";
  const waUrl = `https://wa.me/${cleanNum}?text=${encodeURIComponent("Hello AI+ Customer Support, I need assistance with my account. (User ID: " + userId + ", Email: " + userEmail + ")")}`;

  showToast("Opening WhatsApp Support Chat... 💬");
  window.open(waUrl, "_blank");
}

window.openAdminPanel = openAdminPanel;
window.switchAdminTab = switchAdminTab;
window.approveDepositReq = approveDepositReq;
window.rejectDepositReq = rejectDepositReq;
window.approveWithdrawReq = approveWithdrawReq;
window.rejectWithdrawReq = rejectWithdrawReq;
window.searchUserForAdmin = searchUserForAdmin;
window.modifyUserBal = modifyUserBal;
window.deleteAdminPlan = deleteAdminPlan;
window.handleAdminSaveQrSettings = handleAdminSaveQrSettings;
window.openTelegramChannel = openTelegramChannel;
window.openCustomerSupport = openCustomerSupport;
window.switchAdminPlanCategory = switchAdminPlanCategory;
window.handlePlanDragStart = handlePlanDragStart;
window.handlePlanDragOver = handlePlanDragOver;
window.handlePlanDrop = handlePlanDrop;
window.movePlanOrder = movePlanOrder;
window.handleAdminCreatePlan = handleAdminCreatePlan;
window.openCustomerSupport = openCustomerSupport;
window.handleAdminCreatePlan = handleAdminCreatePlan;

// GMAIL / GOOGLE SIGN IN HANDLER WITH REAL FIREBASE OAUTH POPUP + FALLBACK MODAL
// GMAIL / GOOGLE SIGN IN HANDLER WITH DIRECT OAUTH POPUP + REDIRECT FALLBACK
function handleGoogleSignIn() {
  if (typeof firebase !== "undefined" && firebase.auth) {
    try {
      if (!firebase.apps || !firebase.apps.length) {
        firebase.initializeApp(firebaseConfig);
      }
      const authInstance = firebase.auth();
      const provider = new firebase.auth.GoogleAuthProvider();
      provider.addScope('email');
      provider.addScope('profile');
      provider.setCustomParameters({ prompt: 'select_account' });

      showToast("Opening Google Account Selector... 🚀");

      authInstance.signInWithPopup(provider)
        .then((result) => {
          if (result && result.user && result.user.email) {
            closeModal("modalAuth");
            loginOrCreateUser(result.user.email, result.user.displayName || result.user.email.split("@")[0].toUpperCase(), "");
            showToast(`Signed in successfully as ${result.user.email} 🎉`);
          }
        })
        .catch((err) => {
          console.warn("Google Sign-In Popup error, switching to Redirect:", err);
          try {
            authInstance.signInWithRedirect(provider);
          } catch(re) {
            showToast("Google Auth Error: " + (err.message || "Failed to sign in"));
          }
        });
      return;
    } catch (err) {
      console.error("Google Auth Exception:", err);
      showToast("Google Sign-In error. Please try again.");
    }
  } else {
    showToast("Firebase Auth initializing... Please try again.");
  }
}

function closeGoogleReferralModal() {
  state.user.isGoogleOnboarded = true;
  saveState();
  closeModal("modalGoogleReferral");
}

window.closeGoogleReferralModal = closeGoogleReferralModal;

function submitCustomGmailAuth() {
  const input = $("#inputCustomGmail");
  const email = input ? input.value.trim().toLowerCase() : "";
  if (!email || !email.includes("@")) {
    showToast("Please enter a valid Gmail address!");
    return;
  }
  const name = email.split("@")[0].toUpperCase() || "Google User";
  closeModal("modalGmailInput");
  closeModal("modalAuth");
  loginOrCreateUser(email, name, "");
}

function completeGoogleAuth(email, name) {
  loginOrCreateUser(email, name, "");
}

window.handleGoogleSignIn = handleGoogleSignIn;
window.submitCustomGmailAuth = submitCustomGmailAuth;

// RENDER PLANS LIST
function renderPlans() {
  const list = $("#plansList");
  if (!list) return;

  const filtered = plansData.filter(p => p.category === currentCategory);
  const renderItems = filtered.length > 0 ? filtered : plansData;

  list.innerHTML = renderItems.map(plan => `
    <div class="plan-card">
      <div class="plan-image-banner">
        <img class="plan-card-img" src="${plan.image}" alt="${plan.title}" loading="lazy">
        <div class="plan-img-overlay"></div>
        <div class="slots-badge">${plan.slots}</div>
        <div class="plan-badge-tag">${plan.badge}</div>
      </div>

      <div class="plan-body">
        <h4 class="plan-title">${plan.title}</h4>

        <div class="plan-pricing-row">
          <div class="price-item">
            <span>PRICE</span>
            <strong>${formatINR(plan.price)}</strong>
          </div>
          <div class="price-item">
            <span>DAILY RETURN</span>
            <strong style="color:var(--green);">${formatINR(plan.dailyIncome)}</strong>
          </div>
        </div>

        <div class="plan-meta-row">
          <span>Duration: <strong>${plan.days} Days</strong></span>
          <span>Total Return: <strong>${formatINR(plan.totalIncome)}</strong></span>
        </div>

        <button class="btn-purchase zoom-touch" data-buy-plan="${plan.id}">Purchase Now</button>
      </div>
    </div>
  `).join("");
}

// RENDER MY PLANS PAGE
function renderMyPlans() {
  const myPlansContainer = $("#myPlansDisplayList");
  if (!myPlansContainer) return;

  const activeOrders = state.user.orders.filter(o => !o.completed);
  const completedOrders = state.user.orders.filter(o => o.completed);

  if ($("#countActivePlans")) $("#countActivePlans").textContent = String(activeOrders.length);
  if ($("#countCompletedPlans")) $("#countCompletedPlans").textContent = String(completedOrders.length);

  const targetOrders = myPlanSubTab === "active" ? activeOrders : completedOrders;

  if (targetOrders.length === 0) {
    myPlansContainer.innerHTML = `
      <div class="empty-team-state">
        <div class="empty-icon">📱</div>
        <strong>No ${myPlanSubTab === "active" ? "Active" : "Completed"} Plans Found</strong>
        <p>Explore weekly and monthly plans to start earning daily returns.</p>
      </div>
    `;
    return;
  }

  const today = dateStr();

  myPlansContainer.innerHTML = targetOrders.map(o => {
    const isClaimedToday = o.lastClaimDate === today;
    const isCompleted = o.completed || ((o.daysClaimed || 0) >= o.days);
    const claimedCount = o.daysClaimed || 0;

    let claimBtnHtml = "";
    if (isCompleted) {
      claimBtnHtml = `<button class="btn-claim-daily-plan" disabled style="background:#10B981; opacity:0.85;">🎉 Plan Completed (${claimedCount}/${o.days} Days)</button>`;
    } else if (isClaimedToday) {
      claimBtnHtml = `<button class="btn-claim-daily-plan" disabled style="background:#6B7280; opacity:0.75;">✅ Income Claimed Today (${claimedCount}/${o.days} Days)</button>`;
    } else {
      claimBtnHtml = `<button class="btn-claim-daily-plan zoom-touch" onclick="claimPlanDailyIncome('${o.id}')">🎁 Claim Daily Income (+${formatINR(o.dailyIncome)})</button>`;
    }

    return `
      <div class="plan-card" style="padding:16px;">
        <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:8px;">
          <h4 style="font-size:15px; font-weight:800; color:var(--text-main); margin:0;">${o.planTitle}</h4>
          <span style="background:${isCompleted ? '#E6F4EA' : '#F3E8FF'}; color:${isCompleted ? '#10B981' : '#7233E8'}; font-size:10px; font-weight:800; padding:3px 8px; border-radius:12px;">
            ${isCompleted ? "COMPLETED" : "RUNNING ACTIVE"}
          </span>
        </div>
        <div class="plan-pricing-row" style="margin-bottom:10px;">
          <div class="price-item">
            <span>INVESTMENT</span>
            <strong>${formatINR(o.price)}</strong>
          </div>
          <div class="price-item">
            <span>DAILY RETURN</span>
            <strong style="color:var(--green);">${formatINR(o.dailyIncome)}</strong>
          </div>
        </div>
        <div style="font-size:11px; color:var(--text-muted); display:flex; justify-content:space-between; margin-bottom:4px;">
          <span>Progress: <strong>${claimedCount} / ${o.days} Days Claimed</strong></span>
          <span>Purchased: ${o.date}</span>
        </div>
        ${claimBtnHtml}
      </div>
    `;
  }).join("");
}

function claimPlanDailyIncome(orderId) {
  const o = state.user.orders.find(ord => ord.id === orderId);
  if (!o) return;

  const today = dateStr();
  if (o.lastClaimDate === today) {
    showToast("Already claimed today for this plan! Come back tomorrow.");
    return;
  }

  state.user.withdrawBalance += o.dailyIncome;
  state.user.totalIncome += o.dailyIncome;
  o.lastClaimDate = today;
  o.daysClaimed = (o.daysClaimed || 0) + 1;

  if (o.daysClaimed >= o.days) {
    o.completed = true;
  }

  state.user.transactions.unshift({
    title: "Daily Plan Income (" + o.planTitle + ")",
    amount: o.dailyIncome,
    type: "daily_income",
    date: new Date().toLocaleString()
  });

  saveState();
  render();
  showToast(`Daily income of ${formatINR(o.dailyIncome)} credited to Withdrawal Balance! 🎉`);
}
window.claimPlanDailyIncome = claimPlanDailyIncome;

// UPDATE AUTH MODAL UI
function updateAuthModalUI() {
  if (authMode === "login") {
    if ($("#authTitleTxt")) $("#authTitleTxt").textContent = "Login to AI+";
    if ($("#authSubtitleTxt")) $("#authSubtitleTxt").textContent = "Sign in to your account with @gmail.com";
    if ($("#groupInvite")) $("#groupInvite").style.display = "none";
    if ($("#groupCaptcha")) $("#groupCaptcha").style.display = "none";
    if ($("#authSubmitBtn")) $("#authSubmitBtn").textContent = "Login";
    if ($("#authSwitchPrompt")) $("#authSwitchPrompt").textContent = "Don't have an account?";
    if ($("#btnToggleAuthMode")) $("#btnToggleAuthMode").textContent = "Create Account";
  } else {
    if ($("#authTitleTxt")) $("#authTitleTxt").textContent = "Create AI+ Account";
    if ($("#authSubtitleTxt")) $("#authSubtitleTxt").textContent = "Register with @gmail.com & 6-digit password";
    if ($("#groupInvite")) $("#groupInvite").style.display = "block";
    if ($("#groupCaptcha")) $("#groupCaptcha").style.display = "block";
    generateCaptchaCode();
    if ($("#authSubmitBtn")) $("#authSubmitBtn").textContent = "+ Create Account";
    if ($("#authSwitchPrompt")) $("#authSwitchPrompt").textContent = "Already have an account?";
    if ($("#btnToggleAuthMode")) $("#btnToggleAuthMode").textContent = "Login";
  }
  if ($("#authErrorMsg")) $("#authErrorMsg").textContent = "";
}

// TEAM & REFERRAL MEMBERS RENDER
function getLevel1TeamMembers() {
  const currentCode = (state.user && state.user.inviteCode) ? state.user.inviteCode.toUpperCase() : "";
  const currentId = (state.user && state.user.id) ? String(state.user.id) : "";
  const currentEmail = (state.user && state.user.email) ? state.user.email.toLowerCase() : "";

  const membersMap = new Map();

  if (state.user && Array.isArray(state.user.team)) {
    state.user.team.forEach(m => {
      const key = m.userId || m.userEmail || m.id;
      if (key) membersMap.set(key, m);
    });
  }

  if (Array.isArray(state.registeredUsers)) {
    state.registeredUsers.forEach(u => {
      if (u.referredBy) {
        const ref = String(u.referredBy).toUpperCase().trim();
        if ((currentCode && ref === currentCode) || (currentId && ref === currentId) || (currentEmail && ref === currentEmail)) {
          const key = u.id || u.email;
          if (key) {
            const existing = membersMap.get(key) || {};
            membersMap.set(key, {
              userId: u.id,
              userName: u.name,
              userEmail: u.email,
              recharged: Math.max(u.recharged || 0, existing.recharged || 0),
              firstRechargeBonusGiven: u.firstRechargeBonusGiven || existing.firstRechargeBonusGiven || false,
              date: u.date || existing.date || "Recently"
            });
          }
        }
      }
    });
  }

  return Array.from(membersMap.values());
}

function renderTeam() {
  const membersListContainer = $("#teamMembersList");
  if (!membersListContainer) return;

  const level1Members = getLevel1TeamMembers();

  const totalCount = level1Members.length;
  const totalRechargeSum = level1Members.reduce((acc, m) => acc + (m.recharged || 0), 0);

  if ($("#teamTotalCount")) $("#teamTotalCount").textContent = String(totalCount);
  if ($("#teamTotalRecharge")) $("#teamTotalRecharge").textContent = formatINR(totalRechargeSum);
  if ($("#lv1Count")) $("#lv1Count").textContent = String(totalCount);
  if ($("#lv1Amount")) $("#lv1Amount").textContent = formatINR(totalRechargeSum);
  if ($("#pillLvl1")) $("#pillLvl1").textContent = `Level 1 (${totalCount})`;

  if (totalCount === 0) {
    membersListContainer.innerHTML = `
      <div class="empty-team-state">
        <div class="empty-icon">📱</div>
        <strong>No Referral Members Yet</strong>
        <p>Share your Referral Link or Referral Code above with friends to build your team!</p>
      </div>
    `;
    return;
  }

  membersListContainer.innerHTML = level1Members.map(m => {
    const isBonusEarned = m.firstRechargeBonusGiven || (m.recharged >= 500);
    const memberRechargedAmt = m.recharged || 0;

    let bonusTag = "";
    if (isBonusEarned) {
      bonusTag = `<span style="background:#E6F4EA; color:#10B981; font-size:10px; font-weight:800; padding:3px 8px; border-radius:12px; display:inline-block;">🎉 ₹200 Referral Bonus Earned</span>`;
    } else if (memberRechargedAmt > 0) {
      bonusTag = `<span style="background:#FEF3C7; color:#D97706; font-size:10px; font-weight:800; padding:3px 8px; border-radius:12px; display:inline-block;">Recharged: ${formatINR(memberRechargedAmt)} (Min ₹500 for ₹200 Bonus)</span>`;
    } else {
      bonusTag = `<span style="background:#F3F4F6; color:#6B7280; font-size:10px; font-weight:800; padding:3px 8px; border-radius:12px; display:inline-block;">Signed Up (No Deposit Yet)</span>`;
    }

    return `
      <div class="admin-req-card" style="margin-bottom:10px; background:#FFFFFF; border:1px solid #E6E0F8; border-radius:12px; padding:12px;">
        <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:6px;">
          <div style="display:flex; align-items:center; gap:8px;">
            <div style="width:36px; height:36px; border-radius:50%; background:var(--primary-gradient); color:#FFF; display:flex; align-items:center; justify-content:center; font-weight:800; font-size:14px;">
              ${(m.userName || "U").charAt(0).toUpperCase()}
            </div>
            <div>
              <strong style="font-size:13px; color:var(--text-main); display:block;">${m.userName || "Team Member"}</strong>
              <small style="font-size:10px; color:var(--text-muted);">ID: ${m.userId || "N/A"} | ${m.userEmail || ""}</small>
            </div>
          </div>
          ${bonusTag}
        </div>
        <div style="font-size:11px; color:var(--text-muted); display:flex; justify-content:space-between; border-top:1px dashed #F0EBFB; padding-top:6px; margin-top:6px;">
          <span>Joined: <strong>${m.date || "Recently"}</strong></span>
          <span>Total Deposit: <strong style="color:var(--green);">${formatINR(memberRechargedAmt)}</strong></span>
        </div>
      </div>
    `;
  }).join("");
}

window.getLevel1TeamMembers = getLevel1TeamMembers;
window.renderTeam = renderTeam;

// RENDER MAIN UI
function render() {
  checkDailyResets();
  const u = state.user;

  // Header & 5-Digit Unique User ID
  const displayIdStr = u.id ? `ID : ${u.id}` : "ID : 87564";
  if ($("#userDisplayId")) $("#userDisplayId").textContent = displayIdStr;
  if ($("#userEmailTxt")) $("#userEmailTxt").textContent = u.email || "Click Sign In to Login";

  // Master Admin Control Panel Button in Profile (ONLY visible for sumitkumarverma60436@gmail.com WITH password 995600036rr)
  const isAdminUser = Boolean(
    u && u.email && u.password &&
    u.email.toLowerCase().trim() === ADMIN_EMAIL.toLowerCase() &&
    u.password.trim() === ADMIN_PASS
  );
  if ($("#btnOpenAdminPanel")) {
    $("#btnOpenAdminPanel").style.display = isAdminUser ? "flex" : "none";
  }

  // Dynamic Admin UPI ID, QR Code & Support Settings Update
  const activeUpi = (state.adminSettings && state.adminSettings.upiId) ? state.adminSettings.upiId : "roli64@ptyes";
  const activeQr = (state.adminSettings && state.adminSettings.qrImage) ? state.adminSettings.qrImage : "qr.png";
  const activeSupportLink = (state.adminSettings && state.adminSettings.supportLink) ? state.adminSettings.supportLink : "https://t.me/aiplus_official";
  const activeWhatsappNum = (state.adminSettings && state.adminSettings.whatsappNumber) ? state.adminSettings.whatsappNumber : "919876543210";
  const activeWebsiteUrl = (state.adminSettings && state.adminSettings.websiteUrl) ? state.adminSettings.websiteUrl : "";

  if ($("#displayUpiIdVal")) $("#displayUpiIdVal").textContent = activeUpi;
  if ($("#imgUpiQrCode")) $("#imgUpiQrCode").src = activeQr;
  if ($("#adminInputUpiId")) $("#adminInputUpiId").value = activeUpi;
  if ($("#adminQrPreviewImg")) $("#adminQrPreviewImg").src = activeQr;
  if ($("#adminInputSupportLink")) $("#adminInputSupportLink").value = activeSupportLink;
  if ($("#adminInputWhatsappNumber")) $("#adminInputWhatsappNumber").value = activeWhatsappNum;
  if ($("#adminInputWebsiteUrl")) $("#adminInputWebsiteUrl").value = activeWebsiteUrl;

  // Referral Code & Link UI
  const userRefCode = u.inviteCode || ("AI" + u.id);
  const userRefLink = getShareableReferLink(userRefCode);

  if ($("#displayUserReferCode")) $("#displayUserReferCode").textContent = userRefCode;
  if ($("#displayUserReferLink")) $("#displayUserReferLink").textContent = userRefLink;

  // Daily Ad Counter Badge Update
  const watchedCount = u.adWatchCount || 0;
  if ($("#adWatchLimitCounter")) {
    $("#adWatchLimitCounter").textContent = `${watchedCount} / 10 Ads Watched Today`;
  }

  // Balances Separation
  if ($("#valDepositBalance")) $("#valDepositBalance").textContent = formatINR(u.depositBalance);
  if ($("#valEarnedBalance")) $("#valEarnedBalance").textContent = formatINR(u.withdrawBalance);
  if ($("#withdrawBalVal")) $("#withdrawBalVal").textContent = formatINR(u.withdrawBalance);

  updateAuthModalUI();
  renderPlans();
  renderMyPlans();
  renderTeam();
}

// SUBMIT UTR DEPOSIT REQUEST FOR ADMIN APPROVAL
function handleInstantUtrSubmit() {
  let amt = parseFloat($("#inputRechargeAmt") ? $("#inputRechargeAmt").value : 100) || 100;
  const utrInput = $("#inputUtrNumber");
  const utr = utrInput ? utrInput.value.trim() : "";

  if (amt < 100) {
    showToast("Minimum deposit amount is ₹100!");
    return;
  }
  if (amt > 100000) {
    amt = 100000;
    if ($("#inputRechargeAmt")) $("#inputRechargeAmt").value = 100000;
    showToast("Maximum deposit limit is ₹1,00,000!");
    return;
  }

  if (!utr || !/^\d{12}$/.test(utr)) {
    showToast("Please enter a valid 12-Digit Numeric UTR / Ref Number!");
    return;
  }

  // Deduplicate deposit requests array
  if (!state.depositRequests) state.depositRequests = [];
  state.depositRequests = getUniqueDepositRequests(state.depositRequests);

  // Duplicate UTR check across all deposit requests
  const existingReq = state.depositRequests.find(r => r.utr === utr);
  if (existingReq) {
    showToast("This UTR number (" + utr + ") has already been submitted!");
    return;
  }

  const timeRecord = new Date().toLocaleString('en-IN', {
    dateStyle: 'medium',
    timeStyle: 'short'
  });

  const newDepReq = {
    id: "DEP" + Date.now(),
    userId: state.user.id,
    userName: state.user.name,
    userEmail: state.user.email,
    amount: amt,
    utr: utr,
    upiApp: "UPI Direct",
    status: "Pending",
    date: timeRecord
  };

  state.depositRequests.unshift(newDepReq);
  state.depositRequests = getUniqueDepositRequests(state.depositRequests);

  state.user.transactions.unshift({
    title: "Deposit Requested (UTR: " + utr + ")",
    amount: amt,
    type: "recharge_pending",
    utr: utr,
    status: "Pending",
    date: timeRecord
  });

  // Clear UTR box immediately upon submission
  if (utrInput) utrInput.value = "";

  saveState();
  closeModal("modalRecharge");
  render();

  // Populate & Open Submission Success Modal Popup
  if ($("#submittedUtrVal")) $("#submittedUtrVal").textContent = utr;
  if ($("#submittedUtrAmt")) $("#submittedUtrAmt").textContent = formatINR(amt);
  if ($("#submittedUtrTime")) $("#submittedUtrTime").textContent = timeRecord;

  openModal("modalUtrSubmitted");
}

// PURCHASE PLAN CONFIRMATION MODAL & EXECUTION
function handlePurchase(planId) {
  const plan = (state.plansData || plansData).find(p => p.id === planId);
  if (!plan) return;

  if (state.user.depositBalance < plan.price) {
    showToast(`Insufficient Deposit Balance! Plan cost is ${formatINR(plan.price)}. Please Recharge First.`);
    openModal("modalRecharge");
    return;
  }

  pendingPurchasePlanId = planId;

  if ($("#confirmPlanImg")) $("#confirmPlanImg").src = plan.image;
  if ($("#confirmPlanTitle")) $("#confirmPlanTitle").textContent = plan.title;
  if ($("#confirmPlanPrice")) $("#confirmPlanPrice").textContent = formatINR(plan.price);
  if ($("#confirmPlanDaily")) $("#confirmPlanDaily").textContent = formatINR(plan.dailyIncome) + " / day";
  if ($("#confirmPlanDays")) $("#confirmPlanDays").textContent = plan.days + " Days";
  if ($("#confirmPlanTotal")) $("#confirmPlanTotal").textContent = formatINR(plan.totalIncome);
  if ($("#confirmPlanBadge")) $("#confirmPlanBadge").textContent = plan.badge || "SPECIAL PASS";
  if ($("#btnConfirmBuyPlanSubmit")) $("#btnConfirmBuyPlanSubmit").textContent = `Confirm & Pay ${formatINR(plan.price)}`;

  openModal("modalConfirmPurchase");
}

function executePurchase() {
  if (!pendingPurchasePlanId) return;
  const plan = (state.plansData || plansData).find(p => p.id === pendingPurchasePlanId);
  if (!plan) return;

  if (state.user.depositBalance < plan.price) {
    showToast("Insufficient Deposit Balance! Please Recharge Deposit Balance First.");
    closeModal("modalConfirmPurchase");
    openModal("modalRecharge");
    return;
  }

  state.user.depositBalance -= plan.price;

  state.user.orders.unshift({
    id: "ORD" + Math.floor(Math.random() * 899999 + 100000),
    planId: plan.id,
    planTitle: plan.title,
    price: plan.price,
    dailyIncome: plan.dailyIncome,
    days: plan.days,
    daysClaimed: 0,
    lastClaimDate: null,
    completed: false,
    date: new Date().toLocaleString()
  });

  state.user.transactions.unshift({
    title: "Purchased " + plan.title,
    amount: -plan.price,
    type: "purchase",
    date: new Date().toLocaleString()
  });

  saveState();
  closeModal("modalConfirmPurchase");
  render();
  switchPage("myplan");
  showToast(`Successfully purchased ${plan.title}! 🎉 Claim daily returns in My Plan.`);
}
window.executePurchase = executePurchase;

// DAILY CHECK-IN ACTION
function handleCheckin() {
  const today = dateStr();
  if (state.user.lastCheckin === today) {
    showToast("Already claimed check-in today! Come back tomorrow. ✨");
    return;
  }

  const checkinBonus = Math.floor(Math.random() * 21) + 10;
  state.user.withdrawBalance += checkinBonus;
  state.user.totalIncome += checkinBonus;
  state.user.lastCheckin = today;

  state.user.transactions.unshift({
    title: "Daily Check-in Bonus",
    amount: checkinBonus,
    type: "bonus",
    date: new Date().toLocaleString()
  });

  saveState();
  render();
  showToast(`Daily Check-in Success! +₹${checkinBonus} credited to Withdrawal Balance. 🎉`);
}

// IN-PAGE REWARDED VIDEO AD PLAYER
let isAdCompleted = false;
let currentAdRewardAmt = 0;

function startInPageVideoAdPlayer() {
  checkDailyResets();
  const u = state.user;

  if ((u.adWatchCount || 0) >= 10) {
    showToast("Daily ad limit reached! You have completed 10/10 ads today. Resets at midnight 🌙");
    return;
  }

  isAdCompleted = false;
  currentAdRewardAmt = 0;

  closeModal("modalWatchEarn");
  openModal("modalInPageVideoAd");

  const iframe = $("#videoAdIframe");
  if (iframe) {
    const directLink = ADSTERRA_DIRECT_LINK || "https://arwf.org/4/b0cdf5d528e176bbcbe98ff9ded13531";
    iframe.src = directLink;
  }

  let secondsLeft = 6;
  const timerTxt = $("#videoAdTimerTxt");
  const progressFill = $("#videoProgressFill");
  const closeHeaderBtn = $("#btnCloseVideoAdModal");
  const claimBtn = $("#btnClaimAndCloseVideoAd");

  if (closeHeaderBtn) {
    closeHeaderBtn.textContent = "✕";
    closeHeaderBtn.style.opacity = "1";
  }

  if (claimBtn) {
    claimBtn.style.opacity = "0.8";
    claimBtn.style.background = "linear-gradient(135deg, #7233E8 0%, #4F46E5 100%)";
    claimBtn.textContent = "🔒 Watching Ad... (6s)";
  }

  clearInterval(adTimerInterval);
  adTimerInterval = setInterval(() => {
    secondsLeft--;
    const percent = Math.min(100, Math.round(((6 - secondsLeft) / 6) * 100));

    if (progressFill) progressFill.style.width = `${percent}%`;
    if (timerTxt) timerTxt.textContent = `Please watch ad: ${secondsLeft}s`;
    if (claimBtn && !isAdCompleted) {
      claimBtn.textContent = `🔒 Watching Ad... (${secondsLeft}s)`;
    }

    if (secondsLeft <= 0) {
      clearInterval(adTimerInterval);
      isAdCompleted = true;

      // AUTOMATIC REWARD CREDITING ON TIMER COMPLETE
      if (currentAdRewardAmt === 0 && (state.user.adWatchCount || 0) < 10) {
        currentAdRewardAmt = Math.floor(Math.random() * 10) + 1; // Strictly ₹1 to ₹10 random integer!

        state.user.adWatchCount = (state.user.adWatchCount || 0) + 1;
        state.user.withdrawBalance += currentAdRewardAmt;
        state.user.totalIncome += currentAdRewardAmt;

        state.user.transactions.unshift({
          title: "Watch Ad Reward",
          amount: currentAdRewardAmt,
          type: "ad_reward",
          date: new Date().toLocaleString()
        });

        saveState();
        render();
      }

      if (timerTxt) timerTxt.textContent = "✅ Ad Completed & Reward Credited!";
      if (claimBtn) {
        claimBtn.style.opacity = "1";
        claimBtn.style.background = "linear-gradient(135deg, #10B981 0%, #059669 100%)";
        claimBtn.textContent = `🎉 +${formatINR(currentAdRewardAmt)} Credited! Click to Close ✕`;
      }
    }
  }, 1000);
}

function closeVideoAdModal() {
  if (isAdCompleted) {
    claimInPageVideoAdReward();
  } else {
    clearInterval(adTimerInterval);
    closeModal("modalInPageVideoAd");
    showToast("Ad closed before completion. No reward claimed.");
  }
}

// CLAIM IN-PAGE VIDEO AD REWARD
function claimInPageVideoAdReward() {
  if (!isAdCompleted) {
    showToast("Please watch full ad to claim your cash reward! ⏳");
    return;
  }

  closeModal("modalInPageVideoAd");

  // Populate & Open Reward Congratulation Popup Modal
  if ($("#claimedAdRewardAmt")) $("#claimedAdRewardAmt").textContent = `+${formatINR(currentAdRewardAmt || 5)}`;
  if ($("#claimedAdProgressTxt")) $("#claimedAdProgressTxt").textContent = `Ad Progress: ${state.user.adWatchCount || 1} / 10 Completed Today`;

  openModal("modalAdRewardClaimed");
}

window.startInPageVideoAdPlayer = startInPageVideoAdPlayer;
window.closeVideoAdModal = closeVideoAdModal;
window.claimInPageVideoAdReward = claimInPageVideoAdReward;

// MAIN APPLICATION INITIALIZER FUNCTION
function initApp() {
  $$(".nav-item").forEach(item => {
    item.addEventListener("click", () => switchPage(item.dataset.page));
  });

  if ($("#openNoticeBtn")) $("#openNoticeBtn").addEventListener("click", () => openModal("modalNotice"));
  if ($("#btnCloseNotice")) $("#btnCloseNotice").addEventListener("click", () => closeModal("modalNotice"));

  if ($("#btnRecharge")) $("#btnRecharge").addEventListener("click", () => openModal("modalRecharge"));
  if ($("#btnProfileRecharge")) $("#btnProfileRecharge").addEventListener("click", () => openModal("modalRecharge"));
  if ($("#btnCloseRecharge")) $("#btnCloseRecharge").addEventListener("click", () => closeModal("modalRecharge"));

  if ($("#btnWithdraw")) $("#btnWithdraw").addEventListener("click", () => openModal("modalWithdraw"));
  if ($("#btnProfileWithdraw")) $("#btnProfileWithdraw").addEventListener("click", () => openModal("modalWithdraw"));
  if ($("#btnCloseWithdraw")) $("#btnCloseWithdraw").addEventListener("click", () => closeModal("modalWithdraw"));

  if ($("#btnChannel")) $("#btnChannel").addEventListener("click", openTelegramChannel);
  if ($("#btnService")) $("#btnService").addEventListener("click", openCustomerSupport);

  if ($("#adminInputQrFile")) {
    $("#adminInputQrFile").addEventListener("change", (e) => {
      const file = e.target.files && e.target.files[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = function(evt) {
          const base64 = evt.target.result;
          if ($("#adminQrPreviewImg")) $("#adminQrPreviewImg").src = base64;
          if (!state.adminSettings) state.adminSettings = {};
          state.adminSettings.qrImage = base64;
        };
        reader.readAsDataURL(file);
      }
    });
  }

  if ($("#btnWatchEarn")) $("#btnWatchEarn").addEventListener("click", () => openModal("modalWatchEarn"));
  if ($("#menuWatchEarnNav")) $("#menuWatchEarnNav").addEventListener("click", () => openModal("modalWatchEarn"));
  if ($("#btnCloseWatchEarn")) $("#btnCloseWatchEarn").addEventListener("click", () => closeModal("modalWatchEarn"));

  if ($("#btnTriggerWatchAd")) $("#btnTriggerWatchAd").addEventListener("click", startInPageVideoAdPlayer);
  if ($("#btnClaimAndCloseVideoAd")) $("#btnClaimAndCloseVideoAd").addEventListener("click", claimInPageVideoAdReward);
  if ($("#btnCloseVideoAdModal")) $("#btnCloseVideoAdModal").addEventListener("click", () => closeModal("modalInPageVideoAd"));

  if ($("#btnClaimDailyHome")) $("#btnClaimDailyHome").addEventListener("click", handleCheckin);

  $$(".plan-tab").forEach(tab => {
    if (tab.dataset.category) {
      tab.addEventListener("click", () => {
        $$(".plan-tab").forEach(t => {
          if (t.dataset.category) t.classList.remove("active");
        });
        tab.classList.add("active");
        currentCategory = tab.dataset.category;
        renderPlans();
      });
    }
  });

  if ($("#tabActivePlans")) {
    $("#tabActivePlans").addEventListener("click", () => {
      $("#tabActivePlans").classList.add("active");
      if ($("#tabCompletedPlans")) $("#tabCompletedPlans").classList.remove("active");
      myPlanSubTab = "active";
      renderMyPlans();
    });
  }

  if ($("#tabCompletedPlans")) {
    $("#tabCompletedPlans").addEventListener("click", () => {
      $("#tabCompletedPlans").classList.add("active");
      if ($("#tabActivePlans")) $("#tabActivePlans").classList.remove("active");
      myPlanSubTab = "completed";
      renderMyPlans();
    });
  }

  if ($("#plansList")) {
    $("#plansList").addEventListener("click", (e) => {
      const btn = e.target.closest("[data-buy-plan]");
      if (btn) handlePurchase(btn.dataset.buyPlan);
    });
  }

  $$(".amt-chip").forEach(chip => {
    chip.addEventListener("click", () => {
      $$(".amt-chip").forEach(c => c.classList.remove("active"));
      chip.classList.add("active");
      if ($("#inputRechargeAmt")) $("#inputRechargeAmt").value = chip.dataset.amt;
    });
  });

  if ($("#btnConfirmBuyPlanSubmit")) {
    $("#btnConfirmBuyPlanSubmit").addEventListener("click", executePurchase);
  }

  if ($("#btnCopyReferCode")) {
    $("#btnCopyReferCode").addEventListener("click", copyReferCode);
  }

  if ($("#btnCopyReferLink")) {
    $("#btnCopyReferLink").addEventListener("click", copyReferLink);
  }

  const showUpiInfoToast = () => {
    showToast("Please scan the QR code or copy the Merchant UPI ID below to complete your deposit.");
  };
  if ($("#btnPayGPay")) $("#btnPayGPay").addEventListener("click", showUpiInfoToast);
  if ($("#btnPayPhonePe")) $("#btnPayPhonePe").addEventListener("click", showUpiInfoToast);
  if ($("#btnPayPaytm")) $("#btnPayPaytm").addEventListener("click", showUpiInfoToast);

  if ($("#btnCopyUpiId")) {
    $("#btnCopyUpiId").addEventListener("click", () => {
      const currentUpi = (state.adminSettings && state.adminSettings.upiId) ? state.adminSettings.upiId : "roli64@ptyes";
      navigator.clipboard.writeText(currentUpi);
      showToast("Merchant UPI ID Copied: " + currentUpi + " 📋");
    });
  }

  if ($("#btnConfirmInstantUtr")) {
    $("#btnConfirmInstantUtr").addEventListener("click", handleInstantUtrSubmit);
  }

  if ($("#btnConfirmWithdraw")) {
    $("#btnConfirmWithdraw").addEventListener("click", () => {
      const amt = parseFloat($("#inputWithdrawAmt").value) || 0;
      if (amt <= 0) {
        showToast("Please enter a valid amount.");
        return;
      }

      if (amt < 500) {
        showToast("Minimum withdrawal limit is ₹500!");
        return;
      }

      if (amt > 100000) {
        showToast("Maximum withdrawal limit is ₹1,00,000!");
        return;
      }

      if (amt > state.user.withdrawBalance) {
        showToast("Insufficient Withdrawal Balance! (Earned balance only).");
        return;
      }

      if (!state.user.bankAccount) {
        closeModal("modalWithdraw");
        openModal("modalBank");
        showToast("Please add your bank account details first.");
        return;
      }

      const timeStr = new Date().toLocaleString('en-IN', { dateStyle: 'medium', timeStyle: 'short' });
      const bankDetailsStr = `${state.user.bankAccount.holder || ''} | Acc: ${state.user.bankAccount.accountNo || ''} | IFSC: ${state.user.bankAccount.ifsc || ''} | ${state.user.bankAccount.bankName || ''}`;

      state.user.withdrawBalance -= amt;
      state.user.transactions.unshift({
        title: "Withdrawal Requested",
        amount: -amt,
        type: "withdraw",
        date: timeStr
      });

      if (!state.withdrawRequests) state.withdrawRequests = [];
      state.withdrawRequests.unshift({
        id: "WDR" + Date.now(),
        userId: state.user.id,
        userName: state.user.name,
        userEmail: state.user.email,
        amount: amt,
        bankDetails: bankDetailsStr,
        status: "Pending",
        date: timeStr
      });

      saveState();
      closeModal("modalWithdraw");
      render();
      showToast(`Withdrawal request for ${formatINR(amt)} submitted! Pending Admin Approval 💸`);
    });
  }

  if ($("#menuBank")) {
    $("#menuBank").addEventListener("click", () => {
      if (state.user.bankAccount) {
        if ($("#bankHolder")) $("#bankHolder").value = state.user.bankAccount.holder || "";
        if ($("#bankAccNo")) $("#bankAccNo").value = state.user.bankAccount.accountNo || "";
        if ($("#bankIfsc")) $("#bankIfsc").value = state.user.bankAccount.ifsc || "";
        if ($("#bankName")) $("#bankName").value = state.user.bankAccount.bankName || "";
      }
      openModal("modalBank");
    });
  }

  if ($("#btnCloseBank")) $("#btnCloseBank").addEventListener("click", () => closeModal("modalBank"));

  if ($("#bankForm")) {
    $("#bankForm").addEventListener("submit", (e) => {
      e.preventDefault();
      state.user.bankAccount = {
        holder: $("#bankHolder").value.trim(),
        accountNo: $("#bankAccNo").value.trim(),
        ifsc: $("#bankIfsc").value.trim().toUpperCase(),
        bankName: $("#bankName").value.trim()
      };
      saveState();
      closeModal("modalBank");
      showToast("Bank Account Details Saved Successfully! 🏦");
    });
  }

  if ($("#menuCheckin")) $("#menuCheckin").addEventListener("click", handleCheckin);

  if ($("#menuOrders")) $("#menuOrders").addEventListener("click", () => openModal("modalOrders"));
  if ($("#btnCloseOrders")) $("#btnCloseOrders").addEventListener("click", () => closeModal("modalOrders"));

  if ($("#menuRecords")) {
    $("#menuRecords").addEventListener("click", () => {
      const recordsContainer = $("#recordsList");
      if (!recordsContainer) return;
      if (state.user.transactions.length === 0) {
        recordsContainer.innerHTML = `<div class="empty-team-state"><p>No transaction history found.</p></div>`;
      } else {
        recordsContainer.innerHTML = state.user.transactions.map(t => {
          let statusBadge = "";
          if (t.status) {
            const st = String(t.status).toLowerCase();
            const tagClass = st.includes("approved") ? "status-approved" : (st.includes("reject") || st.includes("refund") ? "status-rejected" : "status-pending");
            statusBadge = `<span class="status-tag ${tagClass}" style="margin-left:6px; font-size:9px;">${t.status.toUpperCase()}</span>`;
          }

          return `
            <div style="display:flex; justify-content:space-between; align-items:center; padding:12px 0; border-bottom:1px solid var(--line-color);">
              <div>
                <strong style="display:flex; align-items:center; font-size:13px; font-weight:800; color:var(--text-main);">
                  ${t.title} ${statusBadge}
                </strong>
                <small style="color:var(--text-muted); font-size:10px;">${t.date}</small>
              </div>
              <strong style="font-size:14px; color:${t.amount >= 0 ? "var(--green)" : "#E11D48"}; font-weight:800;">
                ${t.amount >= 0 ? "+" : ""}${formatINR(t.amount)}
              </strong>
            </div>
          `;
        }).join("");
      }
      openModal("modalRecords");
    });
  }

  if ($("#btnCloseRecords")) $("#btnCloseRecords").addEventListener("click", () => closeModal("modalRecords"));

  if ($("#menuPassword")) $("#menuPassword").addEventListener("click", () => showToast("Password settings updated."));
  if ($("#menuDownload")) $("#menuDownload").addEventListener("click", () => showToast("Downloading AI+ Mobile App APK..."));

  if ($("#btnSignOut")) {
    $("#btnSignOut").addEventListener("click", () => {
      const generate5DigitId = () => String(Math.floor(10000 + Math.random() * 90000));
      state.user = {
        id: generate5DigitId(),
        phone: "9876543210",
        name: "AI+ Explorer",
        email: "",
        depositBalance: 0,
        withdrawBalance: 0,
        recharged: 0,
        totalIncome: 0,
        inviteCode: "AI30318",
        lastCheckin: null,
        lastAdWatchDate: null,
        adWatchCount: 0,
        isGoogleOnboarded: false,
        bankAccount: null,
        orders: [],
        transactions: [],
        team: []
      };
      saveState();
      authMode = "login";
      updateAuthModalUI();
      openModal("modalAuth");
      showToast("Logged out successfully.");
    });
  }

  if ($("#btnToggleAuthMode")) {
    $("#btnToggleAuthMode").addEventListener("click", () => {
      authMode = authMode === "login" ? "register" : "login";
      updateAuthModalUI();
    });
  }

  if ($("#btnTogglePass")) {
    $("#btnTogglePass").addEventListener("click", togglePasswordVisibility);
  }

  if ($("#btnRefreshCaptcha")) {
    $("#btnRefreshCaptcha").addEventListener("click", () => {
      generateCaptchaCode();
      showToast("Verification code refreshed! 🔄");
    });
  }

  if ($("#authForm")) {
    $("#authForm").addEventListener("submit", (e) => {
      e.preventDefault();
      const emailInput = $("#inputEmail");
      const passInput = $("#inputPassword");
      const captchaInput = $("#inputCaptcha");
      const email = emailInput ? emailInput.value.trim().toLowerCase() : "";
      const password = passInput ? passInput.value.trim() : "";
      const enteredCaptcha = captchaInput ? captchaInput.value.trim() : "";

      if ($("#authErrorMsg")) $("#authErrorMsg").textContent = "";

      if (!email || !email.endsWith("@gmail.com")) {
        const msg = "Email must end with @gmail.com (e.g. yourname@gmail.com)!";
        if ($("#authErrorMsg")) $("#authErrorMsg").textContent = msg;
        showToast("Please enter a valid @gmail.com address!");
        return;
      }

      if (!password || password.length < 6) {
        const msg = "Password must be at least 6 characters / digits long!";
        if ($("#authErrorMsg")) $("#authErrorMsg").textContent = msg;
        showToast("Password must be at least 6 digits!");
        return;
      }

      const existingUser = getSavedUserByEmail(email);

      if (authMode === "login") {
        // SPECIAL MASTER ADMIN DIRECT LOGIN ALLOWANCE:
        if (email === ADMIN_EMAIL.toLowerCase() && password === ADMIN_PASS) {
          loginOrCreateUser(email, "Master Admin", password);
          return;
        }

        // LOGIN VERIFICATION: Account must exist
        if (!existingUser) {
          const msg = "No account found with this Gmail! Please click 'Create Account' to register first.";
          if ($("#authErrorMsg")) $("#authErrorMsg").textContent = msg;
          showToast("No account found! Please register first.");
          return;
        }

        // PASSWORD VERIFICATION: Password must match
        if (existingUser.password && password && existingUser.password.trim() !== password.trim()) {
          const msg = "Incorrect Password! Please enter the correct password.";
          if ($("#authErrorMsg")) $("#authErrorMsg").textContent = msg;
          showToast("Incorrect Password!");
          return;
        }

        loginOrCreateUser(email, existingUser.name, password);
      } else {
        // REGISTER VERIFICATION: Account must NOT already exist (Cannot signup again!)
        if (existingUser) {
          const msg = "An account with this Gmail already exists! Automatically switched to Login mode.";
          if ($("#authErrorMsg")) $("#authErrorMsg").textContent = msg;
          showToast("Account already exists! Please Login.");
          authMode = "login";
          updateAuthModalUI();
          return;
        }

        // CAPTCHA VERIFICATION: Code must match 4 digits
        if (!enteredCaptcha || enteredCaptcha !== currentCaptchaCode) {
          const msg = "Incorrect 4-digit Verification Code! Please check and try again.";
          if ($("#authErrorMsg")) $("#authErrorMsg").textContent = msg;
          showToast("Incorrect 4-Digit Verification Code! Code refreshed 🔄");
          generateCaptchaCode();
          return;
        }

        loginOrCreateUser(email, email.split("@")[0].toUpperCase(), password);
      }
    });
  }

  if ($("#btnGoogleSignIn")) $("#btnGoogleSignIn").addEventListener("click", handleGoogleSignIn);

  // Check URL Referral Parameters on Startup (?ref=CODE or ?invite=CODE)
  try {
    const urlParams = new URLSearchParams(window.location.search);
    const refCodeFromUrl = (urlParams.get("ref") || urlParams.get("invite") || "").trim();
    if (refCodeFromUrl) {
      if ($("#inputInvite")) $("#inputInvite").value = refCodeFromUrl;
      if ($("#inputGoogleInvite")) $("#inputGoogleInvite").value = refCodeFromUrl;
      if (!state.user || !state.user.email) {
        authMode = "register";
        updateAuthModalUI();
        showToast("Referral Code Applied: " + refCodeFromUrl + " 🎁");
      }
    }
  } catch (e) {}

  // Check Google Redirect Auth Result
  if (typeof firebase !== "undefined" && firebase.auth) {
    try {
      firebase.auth().getRedirectResult().then((result) => {
        if (result && result.user && result.user.email) {
          loginOrCreateUser(result.user.email, result.user.displayName || result.user.email.split("@")[0].toUpperCase(), "");
          showToast(`Signed in with ${result.user.email} 🎉`);
        }
      }).catch((err) => {
        console.warn("Redirect auth check error:", err);
      });
    } catch (e) {}
  }

  render();
  syncToFirebaseRTDB();
  initFirebaseRTDBListener();

  // Auto-open Login/Signup Modal if user is not logged in
  if (!state.user || !state.user.email) {
    authMode = "login";
    updateAuthModalUI();
    openModal("modalAuth");
  }

  // Automatic cleanup of Netlify badges or injected footer links
  setInterval(() => {
    ['a[href*="netlify.com"]', 'a[href*="netlify.app"]', '.netlify-badge', '[data-netlify-deploy-id]', 'iframe[src*="netlify"]'].forEach(sel => {
      document.querySelectorAll(sel).forEach(el => {
        if (el && el.parentNode) el.parentNode.removeChild(el);
      });
    });
  }, 1000);
}

try {
  initApp();
} catch (e) {
  console.error("initApp execution error:", e);
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", () => {
    try { initApp(); } catch (e) {}
  });
}
