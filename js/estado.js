import Lista from "./lista.js";

class Estado {
  constructor() {
    const listas = localStorage.getItem("listas");

    if (listas) {
      this.listas = JSON.parse(listas).map(Lista.fromJSON);
    } else {
      this.listas = [];
    }

    this.listaAtual = null;
    this.listaAtualDOM = null;
  }

  renderListas() {
    const container = document.getElementById("well-lista");

    container.innerHTML = "";

    this.listas.forEach((lista) => {
      const listaDiv = document.createElement("div");
      listaDiv.className = "lista";
      listaDiv.onclick = () => {
        if (this.listaAtualDOM) {
          this.listaAtualDOM.classList.remove("selecionado");
        }

        listaDiv.classList.add("selecionado");

        this.listaAtual = lista;
        this.listaAtualDOM = listaDiv;

        renderTarefas();
      };

      const tituloP = document.createElement("p");
      tituloP.textContent = lista.titulo;

      const tarefaP = document.createElement("p");
      tarefaP.textContent = `${lista.tarefas.length} Tarefas`;

      listaDiv.appendChild(tituloP);
      listaDiv.appendChild(tarefaP);

      listaDiv.id = Lista.formatarIdTitulo(lista.titulo);

      container.appendChild(listaDiv);
    });

    if (
      this.listaAtual == null &&
      this.listaAtualDOM == null &&
      this.listas.length > 0
    ) {
      this.listaAtual = this.listas[0];
      document
        .getElementById(Lista.formatarIdTitulo(this.listaAtual.titulo))
        .classList.add("selecionado");
    }
  }

  renderTarefas() {
    const container = document.getElementById("well-tarefa");
    container.innerHTML = "";

    if (!this.listaAtual) return;

    this.listaAtual.tarefas.forEach((tarefa) => {
      tarefa.inserirTarefa();
    });
  }

  addTarefaToListaAtual(tarefa) {
    this.listaAtual.adicionarTarefa(tarefa);
    localStorage.setItem("listas", JSON.stringify(this.listas));
  }

  addNewListaToListas(lista) {
    this.listas.push(lista);
    localStorage.setItem("listas", JSON.stringify(this.listas));
  }
}

export default Estado;
