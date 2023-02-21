require("colors");

const completion = (openai, opt) =>
  new Promise(async (resolve) => {
    console.clear();
    if (opt === "0") process.exit();
    const response = await openai.createCompletion({
      model: "text-davinci-003",
      prompt: `${opt}\n`,
      temperature: Math.random() * 0.9,
      max_tokens: 4000,
      top_p: 1,
      frequency_penalty: 0.0,
      presence_penalty: 0.0,
      // stop: ["\n"],
    });
    resolve(response.data.choices[0].text);
  });

const completionJSON = (openai, opt) =>
  new Promise(async (resolve) => {
    console.clear();
    if (opt === "0") process.exit();
    const response = await openai.createCompletion({
      model: "text-davinci-003",
      prompt: `${opt}\n`,
      temperature: Math.random() * 0.9,
      max_tokens: 4000,
      top_p: 1,
      frequency_penalty: 0.0,
      presence_penalty: 0.0,
      // stop: ["\n"],
    });
    resolve(JSON.parse(response.data.choices[0].text));
  });

//create a loop to get the array with the questions (if the loop says 3 times, then we should request the openai api 3 times)
// push questions to an existing array
// remove duplicated questions using sets
// we should have an option call "quiz", it should be able to use arrows key to navigate throught the questions using inquire and when you select one of those questions the cli should retrieve you the answer
// then you should be able to go back and in the "quiz" option see all the questions generated again
// generate a quiz for a reactjs senior interview in a json array using this format [""]
// convert the flat array into [value: string, name: string] so we can use it in inquire
// ${question} give me the answer with 3 multiple choices in a json format {question: string, choices: [{choice: string, isCorrect: boolean}] }

module.exports = { completion, completionJSON };
