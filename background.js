chrome.runtime.onInstalled.addListener(() => {
    console.log("Extensão instalada.");
});
  
chrome.webNavigation.onCompleted.addListener(async (details) => {
    console.log(details.url.includes("web.whatsapp.com"));
    if (details.url.includes("web.whatsapp.com")) {
      await chrome.scripting.executeScript({
        target: { tabId: details.tabId },
        files: ["assets/wppconnect-wa.js", "index.js"]
      });
      console.log("Scripts injetados no WhatsApp Web.");
    }
}, { url: [{ hostContains: "web.whatsapp.com" }] });
  
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.command === "sendMessageToAPI") {
        const { user, message: msg, messageServiceId } = message.payload;

        console.log("Recebido no service worker:", user, msg, messageServiceId);

        fetch('https://api.dai.tec.br/v1/chats', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'x-api-key': 'OrTbQhIWA94L36qgaYOxCBUqHzGnsMgZPKmprRa4u3m6NbO8XlYYWg0JNSyNwDJe'
            },
            body: JSON.stringify({
                user,
                message: msg,
                messageServiceId
            })
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error(`Erro na chamada da API: ${response.statusText}`);
                }
                return response.json();
            })
            .then(data => {
                console.log("Resposta da API recebida no service worker:", data);
                sendResponse({ success: true, data });
            })
            .catch(error => {
                console.error("Erro ao chamar a API no service worker:", error);
                sendResponse({ success: false, error: error.message });
            });

        return true;
    }
});