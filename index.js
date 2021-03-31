const inquirer = require("inquirer");
const fetch = require("node-fetch");
const chalk = require("chalk");
const { program } = require("commander");
const preguntas = require("./preguntas");
let linea;
let texto;
const url = "https://api.tmb.cat/v1/transit/linies/metro/?app_id=23f83909&app_key=09c9602ce5c6bb10b89b5c5c6f6849da"
const lineasMetro = require("./lineasMetro.json");

inquirer.prompt(preguntas).then(respuestas => {
  if (respuestas.transporte === "Bus") {
    console.log(chalk.yellow("No hay información disponible sobre autobuses."));
    process.exit(0);
  } else {
    if (respuestas.errores === true) {
      texto = chalk.red.bold("La línea no existe");
    }
    if (respuestas.linea) {
      const lineaElegida = lineasMetro.features.find(linia => linia.properties.NOM_LINIA === respuestas.linea);
      if (lineaElegida) {
        if (color) {
          console.log(chalk.hex(color)(`Línea ${respuestas.linea}.`))
        } else {
          let colorLinea = "#" + lineaElegida.properties.COLOR_LINIA;
          console.log(chalk.hex(colorLinea)(lineaElegida.properties.NOM_LINIA));
        }
      }
    } else {
      console.log(texto);
      process.exit(0);
    }
  }
});

program
  .option("-c, --color <color>", "Para introducir un color en hexadecimal")
  .option("-a, --abrev", "¿Quieres abreviature?", false);

program.parse(process.argv);

const options = program.opts();
const { color, abrev } = options;
