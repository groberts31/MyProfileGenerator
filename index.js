const fs = require("fs");
const axios = require("axios");
const inquirer = require("inquirer");
const util = require("util");
var pdf = require("html-pdf");
var html = fs.readFileSync('index.html', 'utf8');
var options = { format: 'Letter' };


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
    .then(function ({ username, colorOps }) {
        const queryUrl = `https://api.github.com/users/${username}`;

        console.log(colorOps);
        axios.get(queryUrl).then(function (res) {
            const name = res.data.name;
            console.log("Name: " + name);
            console.log("Username: " + res.data.name);
            console.log(res.data.avatar_url);
            console.log("Github URL: " + res.data.html_url);
            console.log("Location: " + res.data.location);
            console.log("Bio: " + res.data.bio);
            console.log("Public Repos: " + res.data.public_repos);
            console.log("Followers: " + res.data.followers);
            console.log("Following: " + res.data.following);

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
                  <img src="`+ res.data.avatar_url + `" alt="pic" width="30%" height="34%">
                  <br>
                  <p>User Name : ` + name + `
                  <br>
                  Github URL: <a href="`+ res.data.html_url + `">` + username + `</a>
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
                  </html>`
                );
        });
    });
pdf.create(html, options).toFile('./businesscard.pdf', function (err, res) {
    if (err) return console.log(err);
    console.log(res);
})
