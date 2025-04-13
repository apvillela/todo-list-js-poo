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

console.log();
