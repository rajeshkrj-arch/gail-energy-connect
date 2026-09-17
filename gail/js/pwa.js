// =========================================================
// GAIL Energy Connect - PWA Controller
// Service Worker Registration, Install Prompt & Offline Support
// =========================================================

(function() {
  'use strict';

  let deferredInstallPrompt = null;
  const installBtn = document.getElementById('btnInstallApp');

  // Helper: Display toast notification using game's toast container
  function showToast(message, isSuccess = true) {
    const toast = document.getElementById('toastNudge');
    if (!toast) return;
    toast.textContent = message;
    toast.style.background = isSuccess ? 'rgba(0, 230, 118, 0.92)' : 'rgba(239, 68, 68, 0.92)';
    toast.style.boxShadow = isSuccess ? '0 4px 15px rgba(0, 230, 118, 0.4)' : '0 4px 15px rgba(239, 68, 68, 0.4)';
    toast.classList.add('show');

    setTimeout(() => {
      toast.classList.remove('show');
      setTimeout(() => {
        toast.style.background = '';
        toast.style.boxShadow = '';
      }, 300);
    }, 3000);
  }

  // 1. Register Service Worker with immediate update check
  if ('serviceWorker' in navigator) {
    // Purge old caches synchronously
    if ('caches' in window) {
      caches.keys().then(keys => {
        keys.forEach(k => {
          if (k !== 'gail-energy-connect-v7') {
            console.log('[PWA] Deleting old cache:', k);
            caches.delete(k);
          }
        });
      });
    }

    window.addEventListener('load', () => {
      navigator.serviceWorker.register('./sw.js?v=7')
        .then((registration) => {
          console.log('[PWA] Service Worker registered with scope:', registration.scope);
          // Force immediate check for updated sw.js on every load
          registration.update();

          // Listen for updates
          registration.addEventListener('updatefound', () => {
            const newWorker = registration.installing;
            if (newWorker) {
              newWorker.addEventListener('statechange', () => {
                if (newWorker.state === 'installed' && navigator.serviceWorker.controller) {
                  showToast('⚡ Updating to latest 3D Map & Game version...', true);
                  setTimeout(() => window.location.reload(), 800);
                }
              });
            }
          });
        })
        .catch((error) => {
          console.warn('[PWA] Service Worker registration failed:', error);
        });

      // Reload when the active service worker takes control
      let refreshing = false;
      navigator.serviceWorker.addEventListener('controllerchange', () => {
        if (!refreshing) {
          refreshing = true;
          window.location.reload();
        }
      });
    });
  }

  // 2. Handle PWA Install Prompt (beforeinstallprompt)
  window.addEventListener('beforeinstallprompt', (event) => {
    // Prevent default mini-infobar on mobile Chrome
    event.preventDefault();
    deferredInstallPrompt = event;

    // Show Install button in HUD
    if (installBtn) {
      installBtn.style.display = 'inline-flex';
      installBtn.classList.add('pulse-attention');
    }
  });

  // 3. User clicks the Install App button
  if (installBtn) {
    installBtn.addEventListener('click', async () => {
      if (!deferredInstallPrompt) {
        showToast('ℹ️ To install, tap your browser menu and choose "Add to Home Screen"');
        return;
      }

      deferredInstallPrompt.prompt();
      const choiceResult = await deferredInstallPrompt.userChoice;
      console.log('[PWA] User choice outcome:', choiceResult.outcome);

      if (choiceResult.outcome === 'accepted') {
        showToast('⚡ Installing GAIL Energy Connect...', true);
      }
      deferredInstallPrompt = null;
      installBtn.style.display = 'none';
    });
  }

  // 4. App successfully installed
  window.addEventListener('appinstalled', () => {
    console.log('[PWA] GAIL Energy Connect installed successfully');
    if (installBtn) {
      installBtn.style.display = 'none';
    }
    showToast('🎉 App installed! Launch from your Home Screen anytime.', true);
  });

  // 5. Offline / Online Status Detection
  window.addEventListener('offline', () => {
    showToast('📡 You are offline. Offline play is active!', false);
  });

  window.addEventListener('online', () => {
    showToast('⚡ Back online! Network synchronized.', true);
  });

  // 6. Standalone Mode Detection
  const isStandalone = window.matchMedia('(display-mode: standalone)').matches || window.navigator.standalone === true;
  if (isStandalone && installBtn) {
    installBtn.style.display = 'none';
  }
})();
