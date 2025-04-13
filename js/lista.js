class Lista {
  #tarefas;

  constructor(titulo) {
    this.titulo = titulo;
    this.#tarefas = [];
  }

  get qtdTarefas() {
    return this.#tarefas;
  }

  adicionarTarefa(tarefa) {
    this.#tarefas.push(tarefa);
    console.log(tarefa);
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
