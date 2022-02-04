// Require functions 

const inquirer = require("inquirer");
const mysql = require("mysql2");
const cTable = require('console.table');

require('dotenv').config()

// Connection to the MySQL database 

const db = mysql.createConnection(
  {
    host: 'localhost',
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: 'employees_db',
  }
);

// Check to see if SQL connection is occuring 

db.connect((err, res) => {
    if (err) throw err;
    console.log(`

    Connected to the employees_db database.
    
    `);
    mainMenu();
})

// This function displays the main menu in Node

function mainMenu() {
    inquirer
    .prompt([
        {
            name: "choices",
            type: 'list',
            message: "MAIN MENU",
            choices: [
                "View all departments",
                "View all roles",
                "View all employees",
                "Add a department",
                "Add a role",
                "Add an employee",
                "Update an employee's role",
                "No Action"
            ]
        }
    ])
    .then((answers) => {
        const {choices} = answers;
        
        if (choices === "View all departments") {
            returnDepartments();
        }
        
        if (choices === "View all roles") {
            returnRoles();
        }

        if (choices === "View all employees") {
            returnEmployees();
        }

        if (choices === "Add a department") {
            returnNewDepartment();
        }

        if (choices === "Add a role") {
            returnNewRole();
        }

        if (choices === "Add an employee") {
            returnNewEmployee();
        }

        if (choices === "Update an employee's role") {
            updateEmpRole();
        }

        if (choices === "No Action") {
            db.end();
        };
    });
};

// Function to return departments 

returnDepartments = () => {
    db.query("SELECT * FROM department", 
    (err, res) => {
        if (err) throw err;
        console.log("All Departments", res);
        // console.table(res);
        mainMenu();
    })
};

// Function to return roles 

returnRoles = () => {
    db.query("SELECT * FROM roles", 
    (err, res) => {
        if (err) throw err;
        console.table(res);
        mainMenu();
    })
};

// Function to return all employees 

returnEmployees = () => {
    db.query("SELECT * FROM employees",
    (err, res) => {
        if (err) throw err;
        console.table(res);
        mainMenu();
    })
}

// Function to add a new department 

returnNewDepartment = () => {
    inquirer
    .prompt([
        {
            name: "newDepartment",
            type: "input",
            message: "What new department did you want to add?"
        }
    ]).then((answer) => {
        db.query("INSERT INTO department SET ?", 
        {
            name: answer.newDepartment
        })

        db.query("SELECT * FROM department", 
        (err, res) => {
            if (err) throw err;
            console.log(`
            
            New department has beed added!
            
            `)
            console.table(res);
            mainMenu();
        })
    })
};

// Function to add a new employee

returnNewEmployee = () => {
    inquirer
    .prompt([
        {
            name: "first_name",
            type: "input",
            message: "Enter employee's first name"
        },
        
        {
            name: "last_name",
            type: "input",
            message: "Enter employee's last name"
        },
        {
            name: "role",
            type: "list",
            message: "Enter employee's role",
            choices: selectNewRole()
        },
        {
            name: "manager",
            type: "rawlist",
            message: "Who is this employee's manager?",
            choices: selectEmployeeManager()
        },
    ]).then((answer) => {
        let newRoleID = selectNewRole().indexOf(answer.role) + 1;
        let newManagerID = selectEmployeeManager().indexOf(answer.manager) + 1;
        db.query("INSERT INTO employees SET ?", {
            first_name: answer.first_name,
            last_name: answer.last_name,
            manager_id: newManagerID,
            roles_id: newRoleID
        }, (err, res) => {
            if (err) throw err;
            console.table(answer);
            mainMenu();
        })
    })
}

selectNewRole = () => {
    const newRolesArr = [];

    db.query("SELECT * FROM roles", (err, res) => {
        if (err) throw err;
        for (var i = 0; i < res.length; i++) {
            var specificRole = res[i];
            newRolesArr.push(specificRole.title);
        }
    })

    return newRolesArr;
}

selectEmployeeManager = () => {
    const newManagerArr = [];

    db.query("SELECT first_name, last_name FROM employees WHERE manager_id IS NULL", 
    (err, res) => {
        if (err) throw err;
        for (var i = 0; i < res.length; i++) {
            var specificManager = res[i];
            newManagerArr.push(specificManager.first_name);
        }
    })

    return newManagerArr;
}


// Function to add a new role

returnNewRole = () => {
    db.query("SELECT * FROM department", (err, res) => {
        if (err) throw err;

        inquirer
        .prompt([
            {
                name: "newRole",
                type: "input",
                message: "What role do you want to add?"
            },
            {
                name: "salary",
                type: "input",
                message: "What salary is earned in this role?"
            },
            {
                name: "Department",
                type: "input",
                choices: () => {
                    var departmentArr = [];

                    for (var i = 0; i < res.length; i++) {
                        departmentArr.push(res[i].name);
                    }

                    return departmentArr;
                }
            }
        ]).then((answer) => {
            let department_id;

            for (var i = 0; i < res.length; i++) {
                if(res[i].name == answer.Department) {
                    department_id = res[i].id;
                }
            }

            db.query("INSERT INTO roles SET ?",
                {
                    title: answer.newRole,
                    salary: answer.salary,
                    department_id: department_id
                }, 
            
            (err, res) => {
                if (err) throw err;
                console.log(`
                
                Your new role has been created!
                
                `);
                console.table(answer);
                mainMenu();
            })
        })
    })
}

// Function to update employer role

updateEmpRole = () => {
    db.query("SELECT employees.last_name, roles.title FROM employees JOIN roles ON employees.roles_id = roles.id;", 
    (err, res) => {
        if (err) throw err;
        
        inquirer
        .prompt([
            {
                name: "lName",
                type: "rawlist",
                message: "What is this employee's last name?",
                choices: () => {
                    var checkLastName = [];
                    
                    for (var i =0; i < res.length; i++) {
                        checkLastName.push(res[i].last_name);
                    }

                    return checkLastName;
                }
            },
            {
                name: "empRole",
                type: "rawlist",
                message: "What is this employee's role?",
                choices: selectNewRole()
            }
        ]).then((answer) => {
            var newEmpRole = selectNewRole().indexOf(answer.empRole) + 1;
            db.query("UPDATE employees SET WHERE ?", 
            {
                last_name: answer.checkLastName
            },

            {
                role_id: newEmpRole
            },

            (err, res) => {
                if (err) throw err;
                console.table(answer);
                mainMenu();
            })
        })
    })
};