// Adding dependencies and setting up a connection to the schema
const inquirer = require("inquirer");
const mysql = require("mysql2");

const PORT = process.env.PORT || 3000;

const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "Mac+Ellie2023",
    database: "employee_tracker_db"
},
console.log('Connected to Employee_Tracker database.')
);

// Creating all of the inquirer prompts that I can use within later functions
// I realized far too late I should have included the inquirer prompts within the local scope, rather than the global. This is making it way tougher to get the data needed in later functions
const questions = [
    {
        type: 'list',
        message: 'What would you like to do?',
        name: 'choices',
        choices: [
            'View All Departments',
            'View All Roles',
            'View All Employees',
            'Add a Department',
            'Add a Role',
            'Add an Employee',
            'Update an Employee Role',
        ]
    }
];

const departmentQuestions = [
    {
        type: 'input',
        message: 'What would you like to call this department?',
        name: 'deptName',
    }]

const roleQuestions = [
    {
        type: 'input',
        message: 'What is the title of the role?',
        name: 'role',
    },
    {
        type: 'input',
        message: 'What is the salary for the role?',
        name: 'salary',
    },
    {
        type: 'input',
        message: 'What department does this role belong in?',
        name: 'department',
    }]

const employeeQuestions = [
    {
        type: 'input',
        message: "What is the employee's first name?",
        name: 'firstName',
    },
    {
        type: 'input',
        message: "What is the employee's last name?",
        name: 'lastName',
    },
    {
        type: 'input',
        message: "What is the employee's role?",
        name: 'employeeRole',
    },
    {
        type: 'input',
        message: "Who is the employee's manager?",
        name: 'manager',
    }
]

// const updateEmployee = [
//     {
//         type: 'list',
//         name: 'employeeId',
//         message: 'Which employee do you want to update?',
//         choices: employeeChoices
//     },
//     {
//         type: 'list',
//         name: 'roleId',
//         message: 'What is this employees new role?',
//         choices: roleChoices
//     }
// ]

// Using switch case functions for inquirer selections within `promptUser` to continue the inquirer prompts after a user makes a selection. 
function promptUser () {
inquirer.prompt(questions)
    .then((response) => {
        switch (response.choices) {
            case 'View All Departments':
                viewAllDepartments();
                break;

            case 'View All Roles':
                viewAllRoles();
                break;

            case 'View All Employees':
                viewAllEmployees();
                break;

            case 'Add a Department':
                addDepartment();
                break;

            case 'Add a Role':
                addRole();
                break;

            case 'Add an Employee':
                addEmployee();
                break;

            case 'Update an Employee Role':
                updateEmployeeRole();
                break;
        }
    });
}

    // Able to copy/paste the select * functions for departments, roles, and employees here. Just needed to switch out function/table names
function viewAllDepartments() {
    db.query('SELECT * FROM department', (err, results) => {
        if (err) {
            console.error('Error fetching departments', err);
            return;
        }
        console.table(results);
        promptUser();
    });
};

function viewAllRoles() {
    db.query('SELECT * FROM role', (err, results) => {
        if (err) {
            console.error('Error fetching roles', err);
            return;
        }
    console.table(results);
    promptUser();
    });
};

function viewAllEmployees() {
    db.query('SELECT * FROM employee', (err, results) => {
        if (err) {
            console.error('Error fetching employees', err);
                return;
            }
    console.table(results);
    promptUser();
    });
};

// 
function addDepartment() {
    inquirer.prompt(departmentQuestions)
        .then((answers) => {
            const query = `INSERT INTO department (name) VALUE (?)`;
            db.query(query, [answers.deptName])
            promptUser();
        })
}

function addRole() {
    inquirer.prompt(roleQuestions)
        .then((answers) => {
            const deptQuery = 'SELECT id FROM department WHERE name = ?';
            db.query(deptQuery, [answers.department]);
            let department_id = answers.department;
            const query = `INSERT INTO role (title, salary, department_id) VALUES (?, ?, ?)`;
            db.query(query, [answers.role, answers.salary, department_id]);
            promptUser();
        })
}
// Struggling to add a manager_id to this function. Everything is coming back null and not adding to the database
function addEmployee() {
    inquirer.prompt(employeeQuestions)
        .then((answers) => {
            const roleQuery = 'SELECT manager_id from role WHERE name = ?';
            db.query(roleQuery, [answers.role]);
            let manager_id = answers.role;
            const query = `INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES (?, ?, ?, ?)`;
            db.query(query, [answers.first_name, answers.last_name, answers.role_id, manager_id]); 
            promptUser();
        })
}

function updateEmployeeRole() {
    db.query('UPDATE id, title FROM role')
    
}

promptUser();