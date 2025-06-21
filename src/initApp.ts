async function loadConfig() {
  try {
    const response = await fetch('/config.json');
    if (!response.ok) throw new Error('Configuration Missing');
    window.APP_CONFIG = await response.json();
  } catch (e) {
    alert('Configuration Missing');
    throw e;
  }
}

(async () => {
  await loadConfig();
  const { initAPP } = await import('./main');
  initAPP();
})();
