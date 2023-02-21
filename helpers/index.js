const inquirer = require("./inquirer");
const guardarArchivo = require("./guardarArchivo");
const completion = require("./openai/completion");
const removeSimilarStrings = require("./removeSimilarString");

module.exports = {
  ...inquirer,
  ...guardarArchivo,
  ...completion,
  removeSimilarStrings,
};
