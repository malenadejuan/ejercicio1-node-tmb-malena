const inquirer = require("inquirer");
const fetch = require("node-fetch");
const chalk = require("chalk");
const { program } = require("commander");
const preguntas = require("./preguntas");

inquirer.prompt(preguntas).then(respuestas => {
  if (respuestas.transporte === "Bus") {
    console.log(chalk.yellow("No hay información disponible sobre autobuses."));
    process.exit(0);
  }
});
