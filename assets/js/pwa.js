// ============================================
// Shree Radhe Krishna Enterprises — pwa.js
// Client-side PWA Registrations & Installer
// ============================================

let deferredPrompt;

// 1. Service Worker Registration
if ("serviceWorker" in navigator) {
  window.addEventListener("load", () => {
    // Pages are in the '/pages' folder, sw.js is in the root parent folder
    navigator.serviceWorker.register("../sw.js")
      .then((reg) => {
        console.log("[PWA] Service Worker registered with scope:", reg.scope);

        // Detect service worker updates
        reg.addEventListener("updatefound", () => {
          const newWorker = reg.installing;
          newWorker.addEventListener("statechange", () => {
            if (newWorker.state === "installed" && navigator.serviceWorker.controller) {
              // New service worker version is waiting
              showUpdateToast(reg);
            }
          });
        });

        // If a worker is already waiting to be activated, show toast
        if (reg.waiting) {
          showUpdateToast(reg);
        }
      })
      .catch((err) => {
        console.error("[PWA] Service Worker registration failed:", err);
      });
  });

  // Reload client pages when the active controller changes
  let refreshing = false;
  navigator.serviceWorker.addEventListener("controllerchange", () => {
    if (!refreshing) {
      refreshing = true;
      window.location.reload();
    }
  });
}

// 2. Custom Update Notification Toast
function showUpdateToast(reg) {
  if (window.showToast) {
    window.showToast("New version available. Refresh to update.", "🔄");
    
    // Add custom click event to the newly generated toast to trigger SW upgrade
    setTimeout(() => {
      const toasts = document.querySelectorAll("#toast-container .toast");
      if (toasts.length > 0) {
        const lastToast = toasts[toasts.length - 1];
        lastToast.style.cursor = "pointer";
        lastToast.title = "Click to refresh and update app";
        lastToast.addEventListener("click", () => {
          if (reg.waiting) {
            reg.waiting.postMessage({ type: "SKIP_WAITING" });
          }
        });
      }
    }, 200);
  }
}

// 3. Dynamic Install Prompt Hooks
window.addEventListener("beforeinstallprompt", (e) => {
  // Prevent browser's automatic install banner
  e.preventDefault();
  // Store the event so we can trigger it later
  deferredPrompt = e;

  // Reveal the install buttons in UI
  const installLi = document.getElementById("install-app-li");
  const installMobile = document.getElementById("install-app-mobile");

  if (installLi) installLi.classList.remove("hidden");
  if (installMobile) installMobile.classList.remove("hidden");
});

document.addEventListener("DOMContentLoaded", () => {
  const installBtn = document.getElementById("install-app-btn");
  const installMobile = document.getElementById("install-app-mobile");

  const triggerInstall = (e) => {
    if (e) e.preventDefault();
    if (!deferredPrompt) return;

    // Show the installation prompt
    deferredPrompt.prompt();

    // Reset prompt state based on user choice
    deferredPrompt.userChoice.then((choiceResult) => {
      if (choiceResult.outcome === "accepted") {
        console.log("[PWA] User accepted the installation prompt");
        
        // Hide install controls
        const installLi = document.getElementById("install-app-li");
        const installMobileBtn = document.getElementById("install-app-mobile");
        if (installLi) installLi.classList.add("hidden");
        if (installMobileBtn) installMobileBtn.classList.add("hidden");
      }
      deferredPrompt = null;
    });
  };

  if (installBtn) installBtn.addEventListener("click", triggerInstall);
  if (installMobile) installMobile.addEventListener("click", triggerInstall);
});

// 4. Handle Post-Installation Event
window.addEventListener("appinstalled", (evt) => {
  console.log("[PWA] App was successfully installed");
  
  // Hide all install options
  const installLi = document.getElementById("install-app-li");
  const installMobile = document.getElementById("install-app-mobile");
  if (installLi) installLi.classList.add("hidden");
  if (installMobile) installMobile.classList.add("hidden");

  if (window.showToast) {
    window.showToast("App installed successfully! Welcome!", "🎉");
  }
});
