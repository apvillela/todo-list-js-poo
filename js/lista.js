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
    tarefa.inserirTarefa();
  }

  static MostrarOverlayTarefa() {
    const overlay = document.getElementById("overlay-tarefa");
    overlay.classList.remove("hidden");
  }

  static OcultarOverlayTarefa() {
    const overlay = document.getElementById("overlay-tarefa");
    overlay.classList.add("hidden");
  }
}

export default Lista;
