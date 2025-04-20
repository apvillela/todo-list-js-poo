import Lista from "./lista.js";

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

    tarefa.onclick = () => {
      Lista.MostrarOverlayEditTarefa();

      const form = document.getElementById("tarefa-edit-form");

      form.titulo.value = this.titulo;
      form.descrição.value = this.desc;

      const [dia, mes, ano] = this.data.split("/");
      form.data.value = `${ano}-${mes}-${dia}`;

      form.hora.value = this.hora;
      form.prioridade.value = this.prio;
      form.concluida.checked = this.concluida;

      const listaSelect = form.listaDestino;
      listaSelect.innerHTML = ""; // limpa opcoes

      const listas = JSON.parse(localStorage.getItem("listas"));

      listas.forEach((lista) => {
        const option = document.createElement("option");
        option.value = lista.titulo;
        option.textContent = lista.titulo;

        const tarefaPertence = lista.tarefas.some(
          (tarefa) => tarefa.titulo === this.titulo
        );
        if (tarefaPertence) {
          option.selected = true;
        }

        listaSelect.appendChild(option);
      });

      form.dataset.tarefaID = this.#id;
    };

    const titulo = document.createElement("p");
    titulo.innerText = this.titulo;

    const data = document.createElement("p");
    data.innerText = `${this.data} - ${this.hora}`;

    tarefa.appendChild(titulo);
    tarefa.appendChild(data);

    tarefa.classList.add("lista", "tarefa");

    well.append(tarefa);
  }

  static fromJSON(obj) {
    return new Tarefa(obj.titulo, obj.desc, obj.data, obj.hora, obj.prio);
  }
}

export default Tarefa;
