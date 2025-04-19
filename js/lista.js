import Tarefa from "./tarefa.js";

class Lista {
  #tarefas;

  constructor(titulo) {
    this.titulo = titulo;
    this.#tarefas = [];
  }

  get tarefas() {
    return this.#tarefas;
  }

  adicionarTarefa(tarefa) {
    this.#tarefas.push(tarefa);
  }

  ordenarTarefas(ordem) {
    function parseBRDate(dataStr) {
      const [dia, mes, ano] = dataStr.split("/").map(Number);
      return new Date(ano, mes - 1, dia).getTime();
    }

    if (ordem === "data") {
      this.#tarefas.sort((a, b) => {
        return parseBRDate(a.data) - parseBRDate(b.data);
      });
    } else if (ordem === "prioridade") {
      const prioridadeMap = { importante: 1, normal: 2 };
      this.#tarefas.sort((a, b) => {
        return prioridadeMap[a.prio] - prioridadeMap[b.prio];
      });
    }
  }

  toJSON() {
    return {
      titulo: this.titulo,
      tarefas: this.#tarefas,
    };
  }

  static MostrarOverlayTarefa() {
    const overlay = document.getElementById("overlay-tarefa");
    overlay.classList.remove("hidden");

    const tarefaF = document.getElementById("tarefa-form");
    tarefaF.classList.remove("hidden");
  }

  static OcultarOverlayTarefa() {
    const overlay = document.getElementById("overlay-tarefa");
    overlay.classList.add("hidden");

    const tarefaF = document.getElementById("tarefa-form");
    tarefaF.classList.add("hidden");
  }

  static MostrarOverlayLista() {
    const overlay = document.getElementById("overlay-tarefa");
    overlay.classList.remove("hidden");

    const listaF = document.getElementById("form-nova-lista");
    listaF.classList.remove("hidden");
  }

  static OcultarOverlayLista() {
    const overlay = document.getElementById("overlay-tarefa");
    overlay.classList.add("hidden");

    const listaF = document.getElementById("form-nova-lista");
    listaF.classList.add("hidden");
  }

  static OcultarOverlayEditTarefa() {
    const overlay = document.getElementById("overlay-tarefa");
    overlay.classList.add("hidden");

    const tarefaF = document.getElementById("tarefa-edit-form");
    tarefaF.classList.add("hidden");
  }

  static MostrarOverlayEditTarefa() {
    const overlay = document.getElementById("overlay-tarefa");
    overlay.classList.remove("hidden");

    const tarefaF = document.getElementById("tarefa-edit-form");
    tarefaF.classList.remove("hidden");
  }

  static fromJSON(obj) {
    const lista = new Lista(obj.titulo);
    obj.tarefas.forEach((t) => lista.adicionarTarefa(Tarefa.fromJSON(t)));
    return lista;
  }

  static formatarIdTitulo(string) {
    return string.replace(/\s+/g, "_").toLowerCase();
  }
}

export default Lista;
