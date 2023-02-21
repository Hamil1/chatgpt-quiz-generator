require("colors");
require("dotenv").config();
const { Configuration, OpenAIApi } = require("openai");
const {
  inquirerMenu,
  pause,
  leerInput,
  listadoTareasBorrar,
  confirmar,
  mostrarListadoChecklist,
  ChatGPTQuestionsMenu,
  leerDB,
  completion,
  completionJSON,
  removeSimilarStrings,
} = require("./helpers");
const Tareas = require("./models/tareas");

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

let questions = [];

const main = async () => {
  let opt = "";

  const tareas = new Tareas();

  const tareasDB = leerDB();

  if (tareasDB) {
    tareas.cargarTareasFromArray(tareasDB);
  }

  do {
    //imprimir el menu
    opt = await inquirerMenu();
    switch (opt) {
      case "1":
        console.clear();
        // const opt = await leerInput(
        //   `How can I ${"help".green} you? (If you want to ${
        //     "exit".red
        //   } press 0): \n`
        // );
        const opt =
          'generate a quiz for a reactjs senior interview in a json array using this format [""]';
        await Promise.all([
          completionJSON(openai, opt),
          completionJSON(openai, opt),
          completionJSON(openai, opt),
        ])
          .then(async (response) => {
            console.clear();
            const flatArray = removeSimilarStrings(response.flat());
            //resetting questions array
            questions = [];
            flatArray.forEach((item, index) => {
              questions.push({
                value: item,
                name: `${index + 1} ${item}`,
              });
            });
            if (questions.length > 0) {
              console.log(`Quiz ${"generated".blue}!`);
            }
          })
          .catch((error) => console.error(error));

        break;

      case "2":
        //providing inquirer type list object a default value in case questions array is empty
        const quiz = [
          {
            type: "list",
            name: "question",
            message: `Please select the question to see it's ${
              "answer".green
            }\n`,
            choices: questions,
          },
        ];
        const question = await ChatGPTQuestionsMenu(quiz);
        const answer = await completion(openai, question);
        console.log(answer);
        break;
    }

    await pause();
  } while (opt !== "0");
};

main();
