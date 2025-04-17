import Estado from "./estado.js";
import Lista from "./lista.js";
import Tarefa from "./tarefa.js";

(() => {
  const cancelarModalTarefa = document.getElementById("cancelar-tarefa");
  cancelarModalTarefa.addEventListener("click", () =>
    Lista.OcultarOverlayTarefa(),
  );

  const addModalTarefa = document.getElementById("add-tarefa");
  addModalTarefa.addEventListener("click", () => Lista.MostrarOverlayTarefa());

  const cancelarModalLista = document.getElementById("cancelar-lista");
  cancelarModalLista.addEventListener("click", () =>
    Lista.OcultarOverlayLista(),
  );

  const addModalLista = document.getElementById("add-lista");
  addModalLista.addEventListener("click", () => Lista.MostrarOverlayLista());
})();

const estado = new Estado();

const formF = document.getElementById("tarefa-form");
formF.addEventListener("submit", (event) => {
  event.preventDefault();

  const data = new FormData(formF);
  const tarefa = new Tarefa(...data.values());

  estado.listaAtual.adicionarTarefa(tarefa);
  estado.renderTarefas();
  Lista.OcultarOverlayTarefa();
});

const formL = document.getElementById("form-nova-lista");
formL.addEventListener("submit", (event) => {
  event.preventDefault();

  const data = new FormData(formL);
  const lista = new Lista(...data.values());

  estado.listas.push(lista);
  estado.renderListas();
});

estado.renderListas();
