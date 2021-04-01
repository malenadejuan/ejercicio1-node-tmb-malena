const preguntas = [
  {
    type: "list",
    message: "¿Qué tipo de transporte quiere consultar?",
    name: "transporte",
    choices: [
      {
        name: "Metro",
        value: "metro"
      },
      {
        name: "Bus",
        value: "bus"
      }
    ],
  },
  {
    type: "checkbox",
    message: "¿Qué información extra quiere obtener de cada parada?",
    name: "informacion",
    choices: [
      {
        name: "Coordenadas",
        value: "Coordenadas"
      },
      {
        name: "Fecha de inauguración",
        value: "fecha-inauguracion"
      }
    ],
    when: respuestas => respuestas.transporte === "metro"
  },
  {
    type: "confirm",
    message: "¿Quiere que le informemos de los errores?",
    name: "errores",
    when: respuestas => respuestas.transporte === "metro"
  },
  {
    type: "input",
    message: " ¿Qué línea quiere consultar?",
    name: "linea",
    when: respuestas => respuestas.transporte === "metro"
  }
];

module.exports = preguntas;
