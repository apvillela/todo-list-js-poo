<!-- [![Review Assignment Due Date](https://classroom.github.com/assets/deadline-readme-button-22041afd0340ce965d47ae6ef1cefeee28c7c493a6346c4f15d667ab976d596c.svg)](https://classroom.github.com/a/nItz-X-a) -->

# Gerenciador de Tarefas - To Do List

## Descrição

Este projeto é um aplicativo de gerenciamento de tarefas e listas. O famoso to-do list. Ele permite que os usuários criem listas personalizadas, adicionem tarefas de forma detalhadas (como título, descrição, data, hora e prioridade) e organizem suas atividades de forma eficiente. As listas e tarefas são salvas localmente no navegador utilizando o **localStorage**.

## Equipe

- **Alexandre Pereira Villela**
- **Leonardo Diettrich de Martini**
- **Lucas Barbieri Catarina**

## Paradigma de Programação

O projeto segue o paradigma de **Programação Orientada a Objetos**, utilizando classes para modelar as entidades principais, como **Tarefa**, **Lista** e **Estado**. A interação com o DOM e o gerenciamento de estado são realizados de forma modular e organizada.

## Exemplos de Conceitos na Prática

**Classes** utilizadas no JavaScript: class Tarefa, class Lista

**Método construtor:**

Método construtor da classe tarefa:
 ```constructor(titulo, desc, data, hora, prio) {
    this.#id = ++Tarefa.ultimoId;

    this.titulo = titulo;
    this.desc = desc;
    this.data = data;
    this.hora = hora;
    this.prio = prio;

    this.concluida = false;
  }
  ```

**Polimorfismo:** 

O método *ordenarTarefas* utiliza diferentes critérios de ordenação (como data, título, descrição, prioridade, etc.) dependendo do valor do parâmetro.

**Getters e Setters:**

O código está repleto de getters e setters para que os atributos das classes não consigam ser acessados livremente, apenas pelos métodos, promovendo mais segurança.

**Encapsulamento:**

Na classe tarefa o id é um atributo privado e só pode ser acessado ou modificado pelo método Getter. Encapsulando e protegendo o atributo contra modificações externas indesejadas.