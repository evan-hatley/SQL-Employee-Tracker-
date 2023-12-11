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
            'Update an Employee Role'
        ]
    }
];

const departmentQuestions = [
    {
        type: 'input',
        message: 'What would you like to call this department?',
        name: 'deptName'
    }]

const roleQuestions = [
    {
        type: 'input',
        message: 'What is the title of the role?',
        name: 'role'
    },
    {
        type: 'input',
        message: 'What is the salary for the role?',
        name: 'salary'
    },
    {
        type: 'list',
        message: 'What department does this role belong in?',
        // Stand-in choices until I figure out how to access the department table
        choices: ['1', '2', '3']
    }]

const employeeQuestions = [
    {
        type: 'input',
        message: "What is the employee's first name?",
        name: 'firstName'
    },
    {
        type: 'input',
        message: "What is the employee's last name?",
        name: 'lastName'
    },
    {
        type: 'input',
        message: "What is the employee's role?",
        name: 'employeeRole'
    },
    
]

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

function addDepartment() {
    inquirer.prompt(departmentQuestions)
    
}

function addRole() {
    inquirer.prompt(roleQuestions)
}

function addEmployee() {
    inquirer.prompt(employeeQuestions)
}

function updateEmployeeRole() {


}
