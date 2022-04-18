let nome;
let variavel = [];

// Menu lateral

function toggleSidebar() {
    document.getElementById("sidebar").classList.toggle("active");
  }


// Receber o username do usuário

function criarUsuario(){
    let name = prompt("Digite seu name:")

    nome = {name: name}
    const promise = axios.post("https://mock-api.driven.com.br/api/v6/uol/participants", nome);


    promise.then(login);

    promise.catch(() => {
        alert("name indisponível");
        criarUsuario();
        window.location.reload();
    });
}
criarUsuario()

function login(){
    entrarSala()
    recarregarChat();
    setInterval(recarregarChat, 3000);
    listaParticipantes();
    setInterval(listaParticipantes, 5000);
    console.log("login");
}

function status(){
    const refresh = axios.post("https://mock-api.driven.com.br/api/v6/uol/status", nome); 
    refresh.then(confirmacaoStatus);  
    refresh.then(console.log("Status atualizado"));
}

function confirmacaoStatus(){
    statusCode = resposta.status;
    console.log(statusCode);
}

function recarregarChat() {
    const refreshMensagem = axios.get("https://mock-api.driven.com.br/api/v6/uol/messages");

        refreshMensagem .then(sucessoMensagem);
        refreshMensagem .catch(erroMensagem);
  }

function sucessoMensagem(mensagem) {
  console.log("Mensagens atualizadas");
  mensagem.data.forEach(entrarSala);
}

function erroMensagem() {
  console.log("Erro carregar mensagens");
}

// Informar que o  usuário entrou na sala

function entrarSala(mensagens){
    /*carregarMensagens()
    carregarParticipantes()*/
    
    let chat = document.querySelector(".caixa-mensagens")

      chat.innerHTML = "";
      
      for(i=0; i<mensagens.length; i++){
  
          if(mensagens[i].type=="login"){
            chat.innerHTML += ` 
            <div class="login">
                <h1>(${mensagens[i].time})</h1>
                <h2><strong>${mensagens[i].from}</strong>&nbsentrou</h2>    
            </div>
            `  
          }
          if(mensagens[i].type=="message"){
              chat.innerHTML += `
              <div class="mensagem-publica">
                 <h1>(${mensagens[i].time})</h1>
                  <h2><strong>${mensagens[i].from}</strong>&nbsp;para&nbsp;<strong>${mensagem.to}:</strong></h2> 
                 <h6>${mensagens[i].text}}</h6>       
             </div>
          `  
          }    
      }
}

function send(){
  
    const texto = document.querySelector("input").value
    const mensagens = {
        from: nome.name,
        to: "Todos",
        text: texto,
        type: "message"
   }
   let envioMensagem = axios.post("https://mock-api.driven.com.br/api/v6/uol/messages", mensagens);

      envioMensagem.then(sucessoEnvioMensagem);
      envioMensagem.catch(erroEnvioMensagem);
}


function sucessoEnvioMensagem() {
    console.log("Mensagem enviada");
    recarregarChat();
  }

function erroEnvioMensagem() {
    window.location.reload();
  }

document.addEventListener("keyup", function (sendClick) {
  if (sendClick.key === "Enter") {
    document.getElementById("send").click();
  }
});

function listaParticipantes() {
    const requestParticipantes = axios.get(
      "https://mock-api.driven.com.br/api/v6/uol/participants"
    );
    requestParticipantes.then(participantes);
  }
  
  function participantes(resposta) {
    listaParticipantes = resposta.data;
    console.log("Lista de participantes");
  }