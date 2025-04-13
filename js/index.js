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

  const titulo = data.get("titulo");
  const descricao = data.get("descrição");
  const dataSelecionada = data.get("data");
  const hora = data.get("hora");
  const prioridade = data.get("prioridade");

  const tarefa = new Tarefa(
    titulo,
    descricao,
    dataSelecionada,
    hora,
    prioridade,
  );

  lista.adicionarTarefa(tarefa);
  Lista.OcultarOverlayTarefa();
});

console.log(lista);
