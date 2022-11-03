const inquirer = require('inquirer')
const mysql = require('mysql2')

var db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "Westminister69420",
    database: "tracking_db"
    }, 
    console.log('Connected to the tracking database') 
)


const questions = [
    {
        name: 'newEmpName',
        type: 'input',
        message: "What is the employee's name?",
    }
    {
        name: 'newEmpDepartment',
        type: 'input',
        message: "What is the employee's department?"
    }
]

inquirer.createPromptModule([ {
    name: 'Main Page',
    type: 'list',
    message: 'What would you like to do?',
    choices: ['View All Employees','Add Employee','Update Employee Role','View All Roles','Add Role','View All Departments','Add Department']
}])