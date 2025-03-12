const btnAdicionarTarefa = document.querySelector('.app__button--add-task');
const formAdicionarTarefa = document.querySelector('.app__form-add-task');
const textarea = document.querySelector('.app__form-textarea');
const btnCancelar = document.querySelector('.app__form-footer__button--cancel');
const ulTarefas = document.querySelector('.app__section-task-list');
const paragrafoTarefaEmAndamento = document.querySelector('.app__section-active-task-description');
const tarefas = JSON.parse(localStorage.getItem('tarefas')) || [];

let tarefaEmAndamento = null;
let liTarefaEmAndamento = null;

btnAdicionarTarefa.addEventListener('click', () => {
   formAdicionarTarefa.classList.toggle('hidden');
})

function criarElementoTarefa(tarefa) {
   const li = document.createElement('li');
   li.classList.add('app__section-task-list-item');

   const svg = document.createElement('svg');
   svg.innerHTML = `
      <svg class="app__section-task-icon-status" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
         <circle cx="12" cy="12" r="12" fill="#FFF"></circle>
         <path d="M9 16.1719L19.5938 5.57812L21 6.98438L9 18.9844L3.42188 13.4062L4.82812 12L9 16.1719Z" fill="#01080E"></path>
      </svg>
   `;

   const paragrafo = document.createElement('p');
   paragrafo.classList.add('app__section-task-list-item-description');
   paragrafo.textContent = tarefa.descricao;

   const botao = document.createElement('button');
   botao.classList.add('app_button-edit');
   botao.innerHTML = `<img src="./imagens/edit.png">`;
   botao.onclick = () => {
      const novaDescricao = prompt('Qual o novo nome da tarefa?');
      if (novaDescricao){
         paragrafo.textContent = novaDescricao;
         tarefa.descricao = novaDescricao;
         atualizarLocalStorage();
      }
   }

   li.append(svg);
   li.append(paragrafo);
   li.append(botao);

   li.onclick = () => {
      document.querySelectorAll('.app__section-task-list-item-active')
         .forEach(elemento => {
            elemento.classList.remove('app__section-task-list-item-active');
         });

      if (tarefaEmAndamento == tarefa) {
         paragrafoTarefaEmAndamento.textContent = '';
         tarefaEmAndamento = null;
         liTarefaEmAndamento = null;
         return
      }

      tarefaEmAndamento = tarefa;
      liTarefaEmAndamento = li;
      paragrafoTarefaEmAndamento.textContent = tarefa.descricao;
      li.classList.add('app__section-task-list-item-active');
   }

   return li;
}

function atualizarLocalStorage() {
   localStorage.setItem('tarefas', JSON.stringify(tarefas));
}

function fecharFormulario() {
   textarea.value = '';
   formAdicionarTarefa.classList.add('hidden');
}

tarefas.forEach(tarefa => {
   const elementoTarefa = criarElementoTarefa(tarefa);
   ulTarefas.append(elementoTarefa);
});

formAdicionarTarefa.addEventListener('submit', (evento) => {
   evento.preventDefault();

   const tarefa = {
      descricao: textarea.value
   }

   tarefas.push(tarefa);

   atualizarLocalStorage();

   fecharFormulario();
   
   elementoTarefa = criarElementoTarefa(tarefa);
   ulTarefas.append(elementoTarefa);
})

btnCancelar.addEventListener('click', () => {
   fecharFormulario();
})

document.addEventListener('FocoFinalizado', () => {
   if (tarefaEmAndamento && liTarefaEmAndamento){
      liTarefaEmAndamento.classList.add('app__section-task-list-item-complete');
      liTarefaEmAndamento.classList.remove('app__section-task-list-item-active');
      liTarefaEmAndamento.querySelector('button').setAttribute('disabled', 'disabled');

      tarefaEmAndamento = null;
      liTarefaEmAndamento = null;
      paragrafoTarefaEmAndamento.textContent = '';
   }
})
