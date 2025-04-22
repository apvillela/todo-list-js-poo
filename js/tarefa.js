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

  isVencida() {
    const [dia, mes, ano] = this.data.split("/").map(Number);
    const [hora, minuto] = this.hora.split(":").map(Number);
    const dataTarefa = new Date(ano, mes - 1, dia, hora, minuto);
    return dataTarefa < new Date();
  }

  aplicarEstilo(elemento) {
    // se estiver vencida aplique o vencida, porém se estiver conluida cancela o vencida
    if (this.isVencida()) {
      elemento.classList.add("vencida");
    }
    if (this.concluida) {
      elemento.classList.add("concluida");
    }
    if (this.isVencida() && this.concluida) {
      elemento.classList.remove("vencida");
    }
  }

  inserirTarefa() {
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

      const w3cFixPlaceholderOption = document.createElement("option");
      w3cFixPlaceholderOption.value = "";
      w3cFixPlaceholderOption.disabled = true;
      w3cFixPlaceholderOption.selected = true;
      w3cFixPlaceholderOption.textContent = "Selecione uma lista";
      listaSelect.appendChild(w3cFixPlaceholderOption);

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
    titulo.style.marginBottom = "1px";

    const descricao = document.createElement("p");
    descricao.innerText = `Descrição: ${this.desc.slice(0, 48)}${
      this.desc.length > 48 ? "..." : ""
    }`;
    descricao.style.marginBottom = "1px";
    //Gera a data final dentro do carrd
    const data = document.createElement("p");
    data.innerText = `Data Final: ${this.data} - ${this.hora}`;
    data.style.marginBottom = "1px";

    //Gerando status vencida e outros no car
    const status = document.createElement("p");
    if (this.concluida) {
      status.innerText = "Status: Concluída";
    } else if (this.isVencida()) {
      status.innerText = "Status: Vencida";
    } else {
      status.innerText = "Status: Pendente";
    }

    // Botão de excluir tarefa
    const excluirBtn = document.createElement("button");
    excluirBtn.innerText = "X";
    excluirBtn.classList.add("excluir-tarefa");
    excluirBtn.onclick = (event) => {
      event.preventDefault();
      this.excluirTarefa();
    };

    tarefa.appendChild(titulo);
    tarefa.appendChild(descricao);
    tarefa.appendChild(data);
    tarefa.appendChild(status);
    tarefa.appendChild(excluirBtn);

    tarefa.classList.add("lista", "tarefa");

    this.aplicarEstilo(tarefa);

    well.append(tarefa);
  }

  excluirTarefa() {
    const confirmacao = confirm(
      "Tens certeza de que deseja excluir esta tarefa?"
    );
    if (!confirmacao) return;

    const listas = JSON.parse(localStorage.getItem("listas"));
    const listaAtual = listas.find((lista) =>
      lista.tarefas.some((tarefa) => tarefa.titulo === this.titulo)
    );

    if (listaAtual) {
      listaAtual.tarefas = listaAtual.tarefas.filter(
        (tarefa) => tarefa.titulo !== this.titulo
      );
      localStorage.setItem("listas", JSON.stringify(listas));
      location.reload(); // tentei sem mas vai assim por enquanto
    }
  }

  static fromJSON(obj) {
    return new Tarefa(obj.titulo, obj.desc, obj.data, obj.hora, obj.prio);
  }
}

export default Tarefa;
