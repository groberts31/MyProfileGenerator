const fs = require("fs");
const axios = require("axios");
const inquirer = require("inquirer");
const util = require("util");
var pdf = require("pdf-creator-node");

const readFileAsync = util.promisify(fs.readFile);



inquirer
    .prompt([
        {
            message: "Enter your GitHub username:",
            name: "username"
        },
        {
            message: "What is your favorite color from options below?",
            type: "list",
            name: "colorOps",
            choices: ["Red", "Blue", "Green", "Yellow", "Orange"]
        }])
    .then(function({ username }) {
        const queryUrl = `https://api.github.com/users/${username}`;

        axios.get(queryUrl).then(function(res) {
            const name = res.data.name;
            console.log(name);
            fs.appendFileSync('profile.pdf', name);
            fs.appendFileSync('index.html', name);
            console.log(res.data.name);
      
        });
    });
