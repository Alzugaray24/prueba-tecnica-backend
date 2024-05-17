import { Command } from "commander";

const program = new Command();

program
  .option("-d", "Variable para debug", false)
  .option("-p <port>", "Puerto del servidor", 5000)
  .option("--mode <mode>", "Modo de trabajo", /^(dev|prod|test)$/, "dev")
  .requiredOption(
    "-u <user>",
    "Usuario que va a utilizar el aplicativo.",
    "No se ha declarado un usuario."
  );

program.parse();

export default program;
