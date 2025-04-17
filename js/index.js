import Estado from "./estado.js";
import Lista from "./lista.js";
import Tarefa from "./tarefa.js";

(() => {
  const cancelarModal = document.getElementById("cancelar-tarefa");
  cancelarModal.addEventListener("click", () => Lista.OcultarOverlayTarefa());

  const addModal = document.getElementById("add-tarefa");
  addModal.addEventListener("click", () => Lista.MostrarOverlayTarefa());
})();

const lista = new Lista("titulo daora");
const form = document.getElementById("tarefa-form");

form.addEventListener("submit", (event) => {
  event.preventDefault();

  const data = new FormData(form);
  const tarefa = new Tarefa(...data.values());

  lista.adicionarTarefa(tarefa);
  Lista.OcultarOverlayTarefa();
});

const listas = [lista];

const estado = new Estado(listas);

estado.renderListas();
