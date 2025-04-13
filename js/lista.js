class Lista {
  #qtdTarefas;

  constructor(titulo) {
    this.titulo = titulo;
    this.#qtdTarefas = 0;
  }

  get qtdTarefas() {
    return this.#qtdTarefas;
  }

  adicionarTarefa() {}
}
