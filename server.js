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

const updateEmployee = [
    {
        type: 'list',
        name: 'employeeId',
        message: 'Which employee do you want to update?',
        choices: employeeChoices
    },
    {
        type: 'list',
        name: 'roleId',
        message: 'What is this employees new role?',
        choices: roleChoices
    }
]

// Using switch case functions for inquirer selections. Would love to learn how to switch between options after running one function without closing out an instance of bash or mysql in the terminal
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

    // Able to copy/paste the select all functions for departments, roles, and employees here. Just needed to switch out function/table names
function viewAllDepartments() {
    db.query('SELECT * FROM department', (err, results) => {
        if (err) {
            console.error('Error fetching departments', err);
            return;
        }
        console.table(results);
    });
};

function viewAllRoles() {
    db.query('SELECT * FROM role', (err, results) => {
        if (err) {
            console.error('Error fetching roles', err);
            return;
        }
    console.table(results);
    });
};

function viewAllEmployees() {
    db.query('SELECT * FROM employee', (err, results) => {
        if (err) {
            console.error('Error fetching employees', err);
                return;
            }
    console.table(results);
    });
};

// 
function addDepartment() {
    inquirer.prompt(departmentQuestions)
        .then((answers) => {
            const query = `INSERT INTO department (name) VALUE (?)`;
            db.query(query, [answers.deptName])
        })
}

function addRole() {
    inquirer.prompt(roleQuestions)
        .then((answers) => {
            const query = `INSERT INTO role (title, salary, department_id) VALUES (?, ?, ?)`;
            db.query(query, [answers.role, answers.salary, answers.departmentId]);
        })
}

function addEmployee() {
    inquirer.prompt(employeeQuestions)
        .then((answers) => {
            const query = `INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES (?, ?, ?, ?)`;
            db.query(query, [answers.first_name, answers.last_name, answers.role_id, answers.manager_id]); 
        })
}

function updateEmployeeRole() {
    db.query('SELECT id, title FROM role')
    
}

