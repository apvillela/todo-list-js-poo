import Lista from "./lista.js";
import Tarefa from "./tarefa.js";

class Estado {
  ordem = null;
  exibir = null;
  busca = null;
  buscaGlobal = false;

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
      "select#filtro-tarefa",
    ).options[0].value;

    this.exibir = document.querySelector(
      "select#exibir-tarefa",
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

  setExibir(exibir) {
    this.exibir = exibir;
  }

  getExibir() {
    return this.exibir;
  }

  setBusca(busca) {
    this.busca = busca;
  }

  getBusca() {
    return this.busca;
  }

  setBuscaGlobal(busca) {
    this.buscaGlobal = busca;
  }

  getBuscaGlobal() {
    return this.buscaGlobal;
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

      // Botão de excluir lista
      const excluirBtn = document.createElement("button");
      excluirBtn.innerText = "X";
      excluirBtn.classList.add("excluir-tarefa");
      excluirBtn.onclick = (event) => {
        event.stopPropagation();
        lista.excluirLista();
      };

      listaDiv.appendChild(tituloP);
      listaDiv.appendChild(tarefaP);
      listaDiv.appendChild(excluirBtn);

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
        Lista.formatarIdTitulo(this.listaAtual.titulo),
      );

      this.listaAtualDOM.classList.add("selecionado");
    }

    this.renderTarefas();
  }

  renderTarefas() {
    const container = document.getElementById("well-tarefa");
    container.innerHTML = "";

    let tarefasFiltradas = [];

    if (this.busca && this.buscaGlobal) {
      // busca e filtro em todas as listas
      this.listas.forEach((lista) => {
        const tarefas = lista.tarefas
          .filter(
            (t) =>
              t.desc.toLowerCase().includes(this.busca.toLowerCase()) ||
              t.data.includes(this.busca) ||
              t.hora.includes(this.busca) ||
              `${t.data} - ${t.hora}`.includes(this.busca),
          )
          .filter((t) => {
            if (this.exibir === "pendentes") return !t.concluida;
            if (this.exibir === "concluidas") return t.concluida;
            return true; // todas
          });

        tarefasFiltradas.push(...tarefas);
      });
    } else {
      if (!this.listaAtual) return;

      this.listaAtual.ordenarTarefas(this.ordem);

      if (this.exibir === "todas") {
        tarefasFiltradas = this.listaAtual.tarefas;
      } else if (this.exibir === "pendentes") {
        tarefasFiltradas = this.listaAtual.tarefas.filter((t) => !t.concluida);
      } else if (this.exibir === "concluidas") {
        tarefasFiltradas = this.listaAtual.tarefas.filter((t) => t.concluida);
      }

      // busca só na lista atual
      if (this.busca) {
        tarefasFiltradas = tarefasFiltradas.filter(
          (t) =>
            t.desc.toLowerCase().includes(this.busca.toLowerCase()) ||
            t.data.includes(this.busca) ||
            t.hora.includes(this.busca) ||
            `${t.data} - ${t.hora}`.includes(this.busca),
        );
      }
    }

    tarefasFiltradas.forEach((tarefa) => {
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

  atualizarTarefa(
    id,
    titulo,
    desc,
    data,
    hora,
    prio,
    concluida,
    listaDestinoTitulo,
  ) {
    const tarefa = this.listaAtual.tarefas.find((t) => t.id == id);

    tarefa.titulo = titulo;
    tarefa.desc = desc;
    tarefa.data = data;
    tarefa.hora = hora;
    tarefa.prio = prio;
    tarefa.concluida = concluida;

    // troca de lista
    if (listaDestinoTitulo && this.listaAtual.titulo !== listaDestinoTitulo) {
      const listaDestino = this.listas.find(
        (lista) => lista.titulo === listaDestinoTitulo,
      );

      if (listaDestino) {
        // remove da atual
        const index = this.listaAtual.tarefas.findIndex((t) => t.id == id);
        if (index !== -1) {
          const [tarefaRemovida] = this.listaAtual.tarefas.splice(index, 1);
          // adiciona na nova
          listaDestino.adicionarTarefa(tarefaRemovida);
        }
      }
    }

    localStorage.setItem("listas", JSON.stringify(this.listas));
    this.renderListas();
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
