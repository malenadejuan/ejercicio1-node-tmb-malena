const inquirer = require("inquirer");
const fetch = require("node-fetch");
const chalk = require("chalk");
require("dotenv").config();
const { program } = require("commander");
const preguntas = require("./preguntas");
let linea;
/* const url = "https://api.tmb.cat/v1/transit/linies/metro/?app_id=23f83909&app_key=09c9602ce5c6bb10b89b5c5c6f6849da"; */
const urlParadas = "https://api.tmb.cat/v1/transit/linies/metro/101/estacions/?app_id=23f83909&app_key=09c9602ce5c6bb10b89b5c5c6f6849da";


const paradas = require("./paradas.json");

inquirer.prompt(preguntas).then(respuestas => {
  if (respuestas.transporte === "Bus") {
    console.log(chalk.yellow("No hay información disponible sobre autobuses."));
    process.exit(0);
  } else {
    if (respuestas.linea) {
      fetch(`${process.env.API_URL_LINEA}/?app_id=${process.env.API_ID}&app_key=${process.env.API_KEY}`)
        .then(resp => resp.json())
        .then(datos => {
          const lineaElegida = datos.features.find(linia => linia.properties.NOM_LINIA === respuestas.linea);
          if (lineaElegida) {
            let texto = "";
            let colorTexto;
            let informacionLinea = paradas.features.map(parada => ({
              nombre: abrev ? parada.properties.NOM_ESTACIO.slice(0, 3) + "." : parada.properties.NOM_ESTACIO,
              coordenadas: parada.geometry.coordinates,
              fecha: parada.properties.DATA_INAUGURACIO
            }
            ));
            if (color) {
              colorTexto = color;
            } else {
              colorTexto = "#" + lineaElegida.properties.COLOR_LINIA;
            }
            informacionLinea.forEach(parada => {
              texto = texto + " " + JSON.stringify(parada.nombre);
              if (respuestas.informacion.includes("Coordenadas")) {
                texto = texto + " " + JSON.stringify(parada.coordenadas);
              }
              if (respuestas.informacion.includes("Fecha de inauguración")) {
                texto = texto + " " + JSON.stringify(parada.fecha);
              }
            });
            console.log(chalk.hex(colorTexto)("Línea " + lineaElegida.properties.NOM_LINIA + ". " + lineaElegida.properties.DESC_LINIA + texto));
          } else {
            if (respuestas.errores === true) {
              console.log(chalk.red.bold("La línea no existe"));
            }
            process.exit(0);
          }
        });
    }
  }
});

program
  .option("-c, --color <color>", "Para introducir un color en hexadecimal")
  .option("-a, --abrev", "¿Quieres abreviature?", false);

program.parse(process.argv);

const options = program.opts();
const { color, abrev } = options;
