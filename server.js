// Require functions 

const inquirer = require("inquirer");
const mysql = require("mysql2");
const consoleTable = require('console.table');
require('dotenv').config()

// Connection to the MySQL database 

const db = mysql.createConnection(
  {
    host: "localhost",
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: "employees_db",
  },
  console.log(`Connected to the employees_db database.`)
);

// This function displays the main menu in Node

function mainMenu() {
    inquirer
    .prompt([
        {
            type: 'list',
            name: "action",
            message: "MAIN MENU",
            choices: [
                "View all departments",
                "View all roles",
                "View all employees",
                "Add a department",
                "Add a role",
                "Add an emplotte",
                "Update an employee's role"
            ]
        }
    ])
    .then((answer) => {

    })
}