class Tarefa {
  static ultimoId = 0;

  #id;

  constructor(titulo, desc, data, hora, prio) {
    this.#id = ++Tarefa.ultimoId;

    this.titulo = titulo;
    this.desc = desc;
    this.data = data;
    this.hora = hora;
    this.prio = prio;

    this.concluida = false;
  }

  get id() {
    return this.#id;
  }

  toJSON() {
    return {
      id: this.id,
      titulo: this.titulo,
      desc: this.desc,
      data: this.data,
      hora: this.hora,
      prio: this.prio,
      concluida: this.concluida,
    };
  }

  concluirTarefa() {
    this.concluida = true;
  }

  inserirTarefa() {
    // exemplo tarefa:
    /*
            <div class="lista tarefa">
     //         <p>TituloDaNota</p>
              <p>DataDaNota</p>
            </div>
    */

    const well = document.getElementById("well-tarefa");

    const tarefa = document.createElement("div");
    const titulo = document.createElement("p");
    titulo.innerText = this.titulo;

    const data = document.createElement("p");
    data.innerText = this.data;

    tarefa.appendChild(titulo);
    tarefa.appendChild(data);

    tarefa.classList.add("lista", "tarefa");

    well.append(tarefa);
  }
}

export default Tarefa;
