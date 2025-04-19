import Estado from "./estado.js";
import Lista from "./lista.js";
import Tarefa from "./tarefa.js";

const estado = new Estado();

(() => {
  const cancelarModalTarefa = document.getElementById("cancelar-tarefa");
  cancelarModalTarefa.addEventListener("click", () =>
    Lista.OcultarOverlayTarefa()
  );

  const addModalTarefa = document.getElementById("add-tarefa");
  addModalTarefa.addEventListener("click", () => Lista.MostrarOverlayTarefa());

  const cancelarModalLista = document.getElementById("cancelar-lista");
  cancelarModalLista.addEventListener("click", () =>
    Lista.OcultarOverlayLista()
  );

  const addModalLista = document.getElementById("add-lista");
  addModalLista.addEventListener("click", () => Lista.MostrarOverlayLista());

  const cancelarModalEditTarefa = document.getElementById(
    "cancelar-edit-tarefa"
  );
  cancelarModalEditTarefa.addEventListener("click", () =>
    Lista.OcultarOverlayEditTarefa()
  );
})();

document.getElementById("tarefa-form").addEventListener("submit", (event) => {
  event.preventDefault();

  const data = new FormData(event.target);
  const tarefa = estado.criarTarefa(...data.values());
  if (tarefa != null) {
    estado.addTarefaToListaAtual(tarefa);
    Lista.OcultarOverlayTarefa();
    event.target.reset();
  }
});

document
  .getElementById("form-nova-lista")
  .addEventListener("submit", (event) => {
    event.preventDefault();

    const data = new FormData(event.target);

    const lista = estado.criarLista(...data.values());
    if (lista != null) {
      estado.addNewListaToListas(lista);

      Lista.OcultarOverlayLista();
      event.target.reset();
    }
  });

document
  .getElementById("tarefa-edit-form")
  .addEventListener("submit", function (event) {
    event.preventDefault();
    const form = event.target;

    const titulo = form.titulo.value;
    const desc = form.descrição.value;
    const data = Estado.formatarDataBrasileira(form.data.value);
    const hora = Estado.formatarHoraBrasileira(form.hora.value);
    const prio = form.prioridade.value;
    const concluida = form.concluida.checked;

    const idTarefa = form.dataset.tarefaID;

    if (idTarefa) {
      estado.atualizarTarefa(
        idTarefa,
        titulo,
        desc,
        data,
        hora,
        prio,
        concluida
      );
    }

    form.reset();
    Lista.OcultarOverlayEditTarefa();
  });

document.getElementById("filtro-tarefa").addEventListener("change", (event) => {
  estado.setOrdem(event.target.value);
  estado.renderTarefas();
});

document.getElementById("exibir-tarefa").addEventListener("change", (event) => {
  estado.setExibir(event.target.value);
  estado.renderTarefas();
});

estado.renderListas();
