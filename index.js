const fs = require("fs");
const axios = require("axios");
const inquirer = require("inquirer");
const util = require("util");
const pdf = require("html-pdf");

// fix to where it only shows color of choice chosen
var colorOps = ["Red"]; 

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
    .then(function ({ username }) {
        const queryUrl = `https://api.github.com/users/${username}`;
        

        axios.get(queryUrl).then(function (res) {
            const name = res.data.name;
            console.log(name);
            console.log(res.data.name);
            console.log(res.data.avatar_url);
            console.log(res.data.html_url);
            console.log(res.data.location);
            console.log(res.data.bio);
            console.log(res.data.public_repos);
            console.log(res.data.followers);
            console.log(res.data.following);

            fs.writeFileSync("index.html", `<!DOCTYPE html>
            <html lang="en">
               <head>
                  <meta charset="UTF-8" />
                  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
                  <meta http-equiv="X-UA-Compatible" content="ie=edge" />
                  <title>Profile Generator</title>
                  <body>
                  <h1> <span style="color:`+ colorOps + `">` + name + `</span></h1>
                  <hr>
                  <img src="`+ res.data.avatar_url + `" alt="pic" width="265px" height="300px>
                  <br>
                  <p>User Name : ` + name + `
                  <br>
                  Repo URL: <a href="`+ res.data.html_url + `">` + username + `</a>
                  <br>
                  </p>Location: `+ res.data.location + `
                  <br>
                  <p>User Bio: ` + res.data.bio + `
                  <br>
                  Public Repos:`+ res.data.public_repos + ` 
                  <br>
                  Followers: `+ res.data.followers + `
                  <br>
                  Following: `+ res.data.following + `
                  </body>
                  </html>`);
        });
    });

