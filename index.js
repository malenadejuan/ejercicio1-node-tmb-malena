const inquirer = require("inquirer");
const fetch = require("node-fetch");
const chalk = require("chalk");
const { program } = require("commander");
const preguntas = require("./preguntas");
let linea;
let texto;
const url = "https://api.tmb.cat/v1/transit/linies/metro/?app_id=23f83909&app_key=09c9602ce5c6bb10b89b5c5c6f6849da";
const urlParadas = "https://api.tmb.cat/v1/transit/linies/metro/101/estacions/?app_id=23f83909&app_key=09c9602ce5c6bb10b89b5c5c6f6849da"
const lineasMetro = require("./lineasMetro.json");
const paradas = require("./paradas.json");

inquirer.prompt(preguntas).then(respuestas => {
  if (respuestas.transporte === "Bus") {
    console.log(chalk.yellow("No hay información disponible sobre autobuses."));
    process.exit(0);
  } else {
    if (respuestas.errores === true) {
      texto = chalk.red.bold("La línea no existe");
    } else {
      process.exit(0);
    }
    if (respuestas.linea) {
      const lineaElegida = lineasMetro.features.find(linia => linia.properties.NOM_LINIA === respuestas.linea);
      if (lineaElegida) {
        let colorTexto;
        if (color) {
          colorTexto = color;
        } else {
          colorTexto = "#" + lineaElegida.properties.COLOR_LINIA;
        }
        console.log(chalk.hex(colorTexto)(`Línea ${lineaElegida.properties.NOM_LINIA}. ${lineaElegida.properties.DESC_LINIA}`))
        /* Pedir todas las paradas de la linea */
      } else {
        console.log(texto);
        process.exit(0);
      }
    }
  }
});

program
  .option("-c, --color <color>", "Para introducir un color en hexadecimal")
  .option("-a, --abrev", "¿Quieres abreviature?", false);

program.parse(process.argv);

const options = program.opts();
const { color, abrev } = options;
