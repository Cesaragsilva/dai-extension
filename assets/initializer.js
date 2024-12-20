(async () => {
    if (typeof WPP === 'undefined') {
      return;
    }
  
    console.log('WA-JS carregado com sucesso! Inicializando...');
  
    try {
      if(WPP)
      {
        console.log('WA-JS está pronto para uso!');
        var interval;
        interval = setInterval(() => {
            if (window?.WPP?.webpack?.isFullReady) {
                clearInterval(interval);
                window.WPP.on('chat.new_message',onNewMessageReceive);
                // WPP.on('chat.new_message', (message) => {
                //     console.log('Nova mensagem recebida:', message);
                // });
            }
        }, 1000);
      }
    } catch (error) {
      console.error('Erro ao inicializar o WA-JS:', error);
    }
  })();

  async function onNewMessageReceive(msg) {
    // console.log(msg.__x_from.user, msg.__x_body);
    let user = msg.__x_from._serialized;
    let message = msg.__x_body;
    
    // return;

    if (user.includes('99133')) {
      console.log('Tenta enviar mensagem via API...');
      const response = await new Promise((resolve, reject) => {
        const listener = (event) => {
            if (event.source === window && event.data.source === "service_worker_response") {
                window.removeEventListener("message", listener);
                resolve(event.data.payload);
            }
        };

        window.addEventListener("message", listener);

        window.postMessage(
            {
                source: "whatsapp_web",
                command: "sendMessageToAPI",
                payload: {
                    user: user,
                    message: message,
                    messageServiceId: "QA_aaa"
                }
            },
            "*"
        );

        setTimeout(() => {
            window.removeEventListener("message", listener);
            reject(new Error("Timeout ao esperar resposta do content script"));
        }, 20000);
    });

    console.log("Resposta recebida do service worker:", response);
    window.WPP.chat.sendTextMessage(user, response.data.response);
    }
}


