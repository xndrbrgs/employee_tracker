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
            name: "choice",
            type: 'list',
            message: "MAIN MENU",
            choices: [
                "View all departments",
                "View all roles",
                "View all employees",
                "Add a department",
                "Add a role",
                "Add an employee",
                "Update an employee's role"
            ]
        }
    ])
    .then((answer) => {
        if (answer === "View all departments") {
            returnDepartments();
        }
        
        if (answer === "View all roles") {
            returnRoles();
        }

        if (answer === "View all employees") {
            returnEmployees();
        }

        if (answer === "Add a department") {
            returnNewDepartment();
        }

        if (answer === "Add a role") {
            returnNewRole();
        }

        if (answer === "Add an employee") {
            returnNewEmployee();
        }

        if (answer === "Update an employee's role") {
            updateEmpRole();
        }

        if (answer === "No Action") {
            db.end();
        };
    });
};

// Function to return departments 

returnDepartments = () => {
    db.query("SELECT employees.first_name, employees.last_name, department.name AS Department FROM employees JOIN role ON employees.role_id = role.id JOIN department ON role.department_id = department.id ORDER BY employees.id;", 
    (err, res) => {
        if (err) throw err;
        console.table(res);
        mainMenu();
    })
};

// Function to return roles 

returnRoles = () => {
    db.query("SELECT employees.first_name, employees.last_name, role.title AS Title FROM employees JOIN role ON employees.role_id = role.id", (err, res) => {
        if (err) throw err;
        console.table(res);
        mainMenu();
    })
};

// Function to return all employees 




