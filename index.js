const inquirer = require("inquirer");
const fetch = require("node-fetch");
const chalk = require("chalk");
const { program } = require("commander");
const preguntas = require("./preguntas");
let linea;
let texto;

inquirer.prompt(preguntas).then(respuestas => {
  if (respuestas.transporte === "Bus") {
    console.log(chalk.yellow("No hay información disponible sobre autobuses."));
    process.exit(0);
  }
  if (respuestas.errores === true) {
    texto = chalk.red.bold("La línea no existe");
  }
  if (respuestas.linea) {
    if (color) {
      console.log(chalk.hex(color)(`Línea ${respuestas.linea}.`))
    } else {
      /* que sea del color de la linea de metro */
    }
  } else {
    console.log(texto);
    process.exit(0);
  }
})

program
  .option("-c, --color <color>", "Para introducir un color en hexadecimal")
  .option("-a, --abrev", "¿Quieres abreviature?", false);

program.parse(process.argv);

const options = program.opts();
const { color, abrev } = options;
