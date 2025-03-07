const hmtl = document.querySelector('html');
const focoBtn = document.querySelector('.app__card-button--foco');
const curtoBtn = document.querySelector('.app__card-button--curto');
const longoBtn = document.querySelector('.app__card-button--longo');
const timerBtn = document.getElementById('start-pause');

const banner = document.querySelector('.app__image');
const texto = document.querySelector('.app__title');
const timerBtnTexto = document.querySelector('#start-pause span');
const timerBtnIcone = document.querySelector('#start-pause img');
const timer = document.getElementById('timer');

const musicaInput = document.getElementById('alternar-musica');
const musica = new Audio('./sons/luna-rise-part-one.mp3');
const somPlay = new Audio('./sons/play.wav');
const somPause = new Audio('./sons/pause.mp3');
const somFim = new Audio('./sons/beep.mp3');
musica.loop = true;

let tempoEmSegundos = 1500; //Padrão (Tempo de foco 1500 seg)

focoBtn.addEventListener('click', () => {
   tempoEmSegundos = 1500;
   alterarContexto('foco');
   focoBtn.classList.add('active');
   mostrarTempo();
})

curtoBtn.addEventListener('click', () => {
   tempoEmSegundos = 300;
   alterarContexto('descanso-curto');
   curtoBtn.classList.add('active');
   mostrarTempo();
})

longoBtn.addEventListener('click', () => {
   tempoEmSegundos = 900;
   alterarContexto('descanso-longo');
   longoBtn.classList.add('active');
   mostrarTempo();
})

function alterarContexto(contexto) {

   if (contagemRegressiva) { //Se ao navegar para outro contexto, a contagem estiver rodando interrompe a contagem.
      pararContagem();
   }

   hmtl.setAttribute('data-contexto', contexto);
   banner.setAttribute('src', `./imagens/${contexto}.png`)
   
   focoBtn.classList.remove('active');
   curtoBtn.classList.remove('active');
   longoBtn.classList.remove('active');

   switch (contexto) {
      case 'foco':
         texto.innerHTML = `
         Otimize sua produtividade,<br>
         <strong class="app__title-strong">mergulhe no que importa.</strong>
         `
         break;

      case 'descanso-curto':
         texto.innerHTML = `
         Que tal dar uma respirada?<br>
         <strong class="app__title-strong">Faça uma pausa curta!</strong>
         `
         break;
   
      case 'descanso-longo':
         texto.innerHTML = `
         Hora de voltar à superfície.<br>
         <strong class="app__title-strong">Faça uma pausa longa.</strong>
         `
         break;
   
      default:
         break;
   }
} // Alterna background, título e estilo dos botões de navegação

musicaInput.addEventListener('change', () => {
   if (musica.paused) {
      musica.play();
   } else {
      musica.pause();
   }
})

timerBtn.addEventListener('click', iniciarOuPausar);

let contagemRegressiva;

function iniciarOuPausar() {
   if (contagemRegressiva) {
      pararContagem();
      somPause.play();
      return;
   }

   somPlay.play();
   contagemRegressiva = setInterval(() => {
      if (tempoEmSegundos == 0) {
         pararContagem();
         somFim.play();
         alert('Tempo finalizado');
         return;
      }
      tempoEmSegundos--;
      mostrarTempo();
   }, 1000);

   timerBtnTexto.textContent = 'Pausar';
   timerBtnIcone.setAttribute('src', './imagens/pause.png');
}

function pararContagem() {
   clearInterval(contagemRegressiva);
   contagemRegressiva = null;
   timerBtnTexto.textContent = 'Começar';
   timerBtnIcone.setAttribute('src', './imagens/play_arrow.png');
}

function mostrarTempo() {
   let tempo = new Date(tempoEmSegundos * 1000);
   tempo = tempo.toLocaleTimeString('pt-Br', {minute: '2-digit', second: '2-digit'});
   timer.innerHTML = tempo;
}

mostrarTempo();
