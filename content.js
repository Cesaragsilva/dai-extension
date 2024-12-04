(() => {
  const injectScript = (filePath) => {
    const script = document.createElement('script');
    script.src = chrome.runtime.getURL(filePath);
    script.type = 'text/javascript';
    script.async = true;

    script.onload = () => {
      console.log(`Script ${filePath} carregado com sucesso.`);
    };

    script.onerror = (error) => {
      console.error(`Erro ao carregar o script ${filePath}:`, error);
    };

    document.documentElement.appendChild(script);
  };

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
      injectScript('assets/wppconnect-wa.js');
      injectScript('assets/initializer.js');
    });
  } else {
    injectScript('assets/wppconnect-wa.js');
    injectScript('assets/initializer.js');
  }
  
})();



window.addEventListener("message", (event) => {
  if (event.source !== window || event.data.source !== "whatsapp_web") {
      return;
  }

  const { command, payload } = event.data;

  if (command === "sendMessageToAPI") {
      console.log("Mensagem recebida do WhatsApp Web, redirecionando para o service worker...");

      chrome.runtime.sendMessage({ command, payload }, (response) => {
          if (chrome.runtime.lastError) {
              console.error("Erro ao comunicar com o service worker:", chrome.runtime.lastError.message);
              window.postMessage(
                  {
                      source: "service_worker_response",
                      payload: { success: false, error: chrome.runtime.lastError.message }
                  },
                  "*"
              );
          } else {
              window.postMessage(
                  {
                      source: "service_worker_response",
                      payload: response
                  },
                  "*"
              );
          }
      });
  }
});