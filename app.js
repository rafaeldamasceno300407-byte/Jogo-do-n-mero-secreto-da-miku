let listaDeNumerosSorteados =[];
let numeroLimite = 1000;
function gerarNumeroAleatorio() {
let numeroEscolhido = parseInt(Math.random() * numeroLimite) + 1;
let quantidadeDeElementosDaLista = listaDeNumerosSorteados.length;
    if (quantidadeDeElementosDaLista >= numeroLimite){
        listaDeNumerosSorteados =[];
    }
    if (listaDeNumerosSorteados.includes(numeroEscolhido)){
        return gerarNumeroAleatorio();
    } else {
        listaDeNumerosSorteados.push(numeroEscolhido);
        return numeroEscolhido;
    }
}

function limparCampo() {
    document.querySelector('input').value = "";
}

let numeroSecreto = gerarNumeroAleatorio();
let tentativas = 1;

function exibirTextoNaTela(tag, texto) {
    let campo = document.querySelector(tag);
    campo.innerHTML = texto;

    if ('speechSynthesis' in window) {
        window.speechSynthesis.cancel();

        let utterance = new SpeechSynthesisUtterance(texto);
        utterance.lang = 'pt-BR';
        utterance.rate = 1.2;

        window.speechSynthesis.speak(utterance);
    } else {
        console.log("Web Speech API não suportada neste navegador.");
    }
}

function exibirMensagemInicial() {
    exibirTextoNaTela ('h1', 'Jogo do nº secreto');
        exibirTextoNaTela('p', 'Escolha um número entre 1 e ' + numeroLimite + '!');
}
exibirMensagemInicial();


function verificarChute() {
    let chute = parseInt(document.querySelector('input').value);
    
    if (chute === numeroSecreto) {
        exibirTextoNaTela("h1", "Você acertou!");
        let palavraTentativas = tentativas == 1 ? "tentativa" : "tentativas";
        let mensagemTentativas = `você descobriu o número secreto em ${tentativas} ${palavraTentativas}!`;
        exibirTextoNaTela("p", mensagemTentativas);
        document.getElementById("reiniciar").removeAttribute("disabled");
    } else if (chute < numeroSecreto) {
        exibirTextoNaTela("h1", "nº secreto é maior que " + chute);
    } else if (chute > numeroSecreto) {
        exibirTextoNaTela("h1", "nº secreto é menor que " + chute);
    }
    tentativas++;
    limparCampo();
}
function reiniciarJogo() {
    numeroSecreto = gerarNumeroAleatorio();
    limparCampo();
    tentativas = 1;
    exibirMensagemInicial();
    document.getElementById("reiniciar").setAttribute("disabled", "true");
}
document.addEventListener("keydown", function (event) {
    if (event.key === "Enter") {
        verificarChute();
    }

    if (event.key === " " || event.code === "Space") {
        let botaoReiniciar = document.getElementById("reiniciar");

        if (!botaoReiniciar.hasAttribute("disabled")) {
            reiniciarJogo();
        }
    }
});