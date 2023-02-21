const inquirer = require("inquirer");
require("colors");

const preguntas = [
  {
    type: "list",
    name: "opcion",
    message: "How can I help you? ",
    choices: [
      {
        value: "1",
        name: `${"1.".green} ${"ChatGPT:".yellow} Generate a new Quiz 🆕`,
      },
      {
        value: "2",
        name: `${"2.".green} See current Quiz 📝`,
      },
      {
        value: "0",
        name: `${"0.".green} Exit 👋`,
      },
    ],
  },
];

const inquirerMenu = async () => {
  console.clear();
  console.log("===================================".green);
  console.log("Hi! I'm your AI Assistant 🤖".white);
  console.log("===================================\n".green);

  const { opcion } = await inquirer.prompt(preguntas);

  return opcion;
};

const ChatGPTQuestionsMenu = async (questions) => {
  console.clear();
  console.log("===================================".green);
  console.log("Select one question to see it's answer:".white);
  console.log("===================================\n".green);

  const { question } = await inquirer.prompt(questions);
  return question;
};

const pause = async () => {
  const options = [
    {
      type: "input",
      name: "enter",
      message: `\nPress ${"ENTER".green} ENTER to continue\n`,
    },
  ];

  await inquirer.prompt(options);
};

const leerInput = async (message) => {
  const question = [
    {
      type: "input",
      name: "desc",
      message,
      validate(value) {
        if (value.length === 0) {
          return "Por favor ingrese un valor";
        }

        return true;
      },
    },
  ];
  const { desc } = await inquirer.prompt(question);
  return desc;
};

const listadoTareasBorrar = async (tareas = []) => {
  const choices = tareas?.map((tarea, i) => {
    const idx = `${i + 1}`.green;
    return {
      value: tarea.id,
      name: `${idx} ${tarea.desc}`,
    };
  });

  const preguntas = [
    {
      type: "list",
      name: "id",
      message: "Borrar",
      choices,
    },
  ];

  const { id } = await inquirer.prompt(preguntas);
  return id;
};

const confirmar = async (message) => {
  const preguntas = [
    {
      type: "confirm",
      name: "ok",
      message,
    },
  ];

  const { ok } = await inquirer.prompt(preguntas);
  return ok;
};

const mostrarListadoChecklist = async (tareas = []) => {
  const choices = tareas.map((tarea, i) => {
    const idx = `${i + 1}.`.green;

    return {
      value: tarea.id,
      name: `${idx} ${tarea.desc}`,
      checked: tarea.completadoEn ? true : false,
    };
  });

  const pregunta = [
    {
      type: "checkbox",
      name: "ids",
      message: "Selecciones",
      choices,
    },
  ];

  const { ids } = await inquirer.prompt(pregunta);
  return ids;
};

module.exports = {
  inquirerMenu,
  pause,
  leerInput,
  listadoTareasBorrar,
  confirmar,
  mostrarListadoChecklist,
  ChatGPTQuestionsMenu,
};
