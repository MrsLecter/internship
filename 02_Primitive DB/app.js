import inquirer from "inquirer";
import * as access from "./src/data_access.js";
import * as utils from "./src/utils.js";

let data = [];

const questions = [
  {
    type: "input",
    name: "name",
    message: "Enter the user's name. To cancel press only Enter: ",
  },
  {
    type: "list",
    name: "gender",
    message: "Choose your gender: ",
    choices: ["male", "feemale"],
    when(answers) {
      return answers.name;
    },
  },
  {
    type: "input",
    name: "age",
    message: "Enter your age: ",
    when(answers) {
      return answers.name;
    },
    validate(value) {
      const pass = value.match(/^(1[89]|[2-9]\d)$/s);
      if (pass) {
        return true;
      }

      return "Please enter a valid age (between 18, 99)";
    },
  },
  {
    type: "confirm",
    name: "findondb",
    message: "Do you want to find a user by name in the database?",
    when(answers) {
      return !answers.name;
    },
  },
  {
    type: "input",
    name: "username",
    message: "Enter users name to find in database: ",
    when(answers) {
      return !answers.name && answers.findondb;
    },
  },
];

function ask() {
  inquirer.prompt(questions).then((answers) => {
    data.push(answers);
    
    if (answers.findondb) {
      console.log("Your database: " + access.toReadFile() + "\n");
      console.log(utils.toFindPerson(answers.username));
    } else if (!answers.findondb && !answers.name) {
      utils.toAddData(data);
      console.log("End");
    } else {
      utils.toAddData(data);
      ask();
    }
  });
}

ask();
