import Lista from "./lista.js";
import Tarefa from "./tarefa.js";

class Estado {
  ordem = null;

  constructor() {
    const listas = localStorage.getItem("listas");

    if (listas) {
      this.listas = JSON.parse(listas).map(Lista.fromJSON);
    } else {
      fetch("/json/listas.json")
        .then((res) => res.json())
        .then((dados) => {
          localStorage.setItem("listas", JSON.stringify(dados));

          // n consigo dar bind this.listas assincrono, ent reload e deixa o primeiro branch do if funcionar
          location.reload();
        });
    }

    this.ordem = document.querySelector(
      "select#filtro-tarefa"
    ).options[0].value;
    this.listaAtual = null;
    this.listaAtualDOM = null;
  }

  setOrdem(ordem) {
    this.ordem = ordem;
  }

  getOrdem() {
    return this.ordem;
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

        this.renderTarefas();
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
      this.listaAtualDOM = document.getElementById(
        Lista.formatarIdTitulo(this.listaAtual.titulo)
      );

      this.listaAtualDOM.classList.add("selecionado");
    }

    this.renderTarefas();
  }

  renderTarefas() {
    const container = document.getElementById("well-tarefa");
    container.innerHTML = "";

    if (!this.listaAtual) return;

    this.listaAtual.ordenarTarefas(this.ordem);

    this.listaAtual.tarefas.forEach((tarefa) => {
      tarefa.inserirTarefa();
    });
  }

  addTarefaToListaAtual(tarefa) {
    this.listaAtual.adicionarTarefa(tarefa);
    localStorage.setItem("listas", JSON.stringify(this.listas));
    this.renderTarefas();
  }

  addNewListaToListas(lista) {
    this.listas.push(lista);
    localStorage.setItem("listas", JSON.stringify(this.listas));
    this.renderListas();
  }

  criarLista(titulo) {
    const nomeJaExiste = this.listas.some((lista) => lista.titulo === titulo);

    if (nomeJaExiste) {
      alert("Uma lista com esse nome já existe!");
      return;
    }

    const nova = new Lista(titulo);
    return nova;
  }

  criarTarefa(_titulo, _desc, _data, _hora, _prio) {
    let titulo = _titulo;
    let desc = _desc;
    let data = Estado.formatarDataBrasileira(_data);
    let hora = Estado.formatarHoraBrasileira(_hora);
    let prio = _prio;

    const nova = new Tarefa(titulo, desc, data, hora, prio);
    return nova;
  }

  atualizarTarefa(id, titulo, desc, data, hora, prio, concluida) {
    const tarefa = this.listaAtual.tarefas.find((t) => t.id == id);

    tarefa.titulo = titulo;
    tarefa.desc = desc;
    tarefa.data = data;
    tarefa.hora = hora;
    tarefa.prio = prio;
    tarefa.concluida = concluida;

    localStorage.setItem("listas", JSON.stringify(this.listas));
    this.renderTarefas();
  }

  static formatarDataBrasileira(data) {
    const [ano, mes, dia] = data.split("-");
    return `${dia}/${mes}/${ano}`;
  }

  static formatarHoraBrasileira(_hora) {
    const [hora, minuto] = _hora.split(":");
    return `${hora.padStart(2, "0")}:${minuto.padStart(2, "0")}`;
  }
}

export default Estado;
