class Estado {
  constructor(listas) {
    this.listas = listas || [];
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

      container.appendChild(listaDiv);
    });
  }

  renderTarefas() {
    const container = document.getElementById("well-tarefa");
    container.innerHTML = "";

    if (!this.listaAtual) return;

    this.listaAtual.tarefas.forEach((tarefa) => {
      tarefa.inserirTarefa();
    });
  }
}

export default Estado;
