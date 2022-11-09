const inquirer = require('inquirer')
const mysql = require('mysql2')
const employees = ['Alex Hsieh', 'An Tran', 'Hoonigan Lee', 'Duncan Gonzalez']
const roles = ['Customer Service', 'Engineer', 'Manager', 'HR', 'FireFighter']
const departments = ['Engineering', 'Finance', 'Legal', 'Sales']
runPrgm()

var db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "Westminister69420",
    database: "tracking_db"
    }, 
    console.log('Connected to the tracking database') 
);

function runPrgm() {
    inquirer.prompt({
        name: 'main_page',
        type: 'list',
        message: 'What would you like to do?',
        choices: ['View All Employees','Add Employee','Update Employee Role','View All Roles','Add Role','View All Departments','Add Department']
    })
    .then((answers) => {
        if (answers.main_page === 'View All Employees') {
            console.log('These are all of the current employees!')
            viewEmp()
        }
        if (answers.main_page === 'Add Employee') {
            addEmp()
        }
        if (answers.main_page === 'Update Employee Role') {
            updateEmpRole()
        }
        if (answers.main_page === 'View All Roles') {
           viewRoles()
        }
        if (answers.main_page === 'Add Role') {
            addRole()
        }
        if (answers.main_page === 'View All Departments') {
            viewDep()
        }
        if (answers.main_page === 'Add Department'){
            addDep()
        }
    }) 
}


function viewEmp() {
    db.query(`SELECT emp.id, emp.first_name, emp.last_name, title, salary, CONCAT(mgr.first_name, '', mgr.last_name) AS manager
        FROM employee emp
        LEFT JOIN employee mgr ON mgr.id = emp.manager_id
        LEFT JOIN role ON emp.role_id = role.id
        LEFT JOIN department ON role.department_id = department.id;`, function(err, results) {
        if (err) {
            console.log(err)
            return
        }else {
            console.log('This is all of the employees currently in the database')
            console.table(results)
            runPrgm()
        }})
    }
    
function addEmp() {
    inquirer.prompt([
        {
            name: 'newEmpFirstName',
            type: 'input',
            message: "What is the employee's first name?",
        },
        {
            name: 'newEmpLastName',
            type: 'input',
            message: "What is the employee's last name?",
        },
        {
            name: 'newEmpRole',
            type: 'list',
            message: "What is the employee's role?",
            choices: roles
        },
        {
            name: 'empBoss',
            type: 'list',
            message: "Who is this employee's boss",
            choices: 'none' + employees
        }
    ]).then((answers) => {
        console.log(employees)
        db.query(`INSERT INTO employees (first_name, last_name,role_id, manager_id) VALUE ('${answers.newEmpFirstName}', '${answers.newEmpLastName}', '${answers.newEmpRole}', '${answers.empBoss}')`, 
        function (err,response) {
            if (err) {
                console.log(err)
            }else {
                console.log('Added employee to database!')
                employees.push(answers)
                runPrgm()
            }
        })
    })}

function updateEmpRole() {
    inquirer.prompt([
        {
            name: 'updateEmpName',
            type: 'list',
            choices: employees,
            message: 'Which Employee do you want to update?'
        },
        {
            name: 'updateEmpRole',
            type: 'list',
            message: 'What role should be assigned to this employee?',
            choices: roles
        }
    ]).then((answers) => {
        db.query(`UPDATE employees SET role_id = '${answers.updateEmpRole}' WHERE id = '${updateEmpName}'`,function(err,response) {
            if (err) {
                console.log(err)
            }else {
                console.log('Employee role updated!')
            }
        })
    })
}

function viewRoles() {
    db.query('SELECT * FROM roles', function(err, results) {
        if (err) {
            console.log('error fulfilling')
            return
        }else {
            console.log(`This is all of the roles currently available`)
            console.table(results)
            runPrgm()
        }})
}

function addRole() {
    inquirer.prompt([
        {
            name: 'newRoleName',
            type: 'input',
            message: 'What is the new role called?',          
        },
        {
            name: 'roleSalary',
            type: 'input',
            message: 'What is the salary for this job?',
        },
        {
            name: 'roleDepartment',
            type: 'list',
            message: 'What department does this role fall under?',
            choices: departments
        }
    ]).then((answers) => {
        db.query(`INSERT INTO roles  (title, salary, department_id)
        VALUES ('${answers.newRoleName})', (${answers.newRoleName}), (${answers.newRoleName})`, function (err, response) {
            if (err) {
                console.log(err)
                return
            }else {
                roles.push(answers)
                console.log(`Added ${newRoleName} into roles`)
                runPrgm() 
            }
        })
    })
}

function viewDep() {
    db.query('SELECT * FROM departments', function (err,results) {
        if (err) {
            console.log(err)
            return
        }else {
            console.log(`This is all of the departments currently available`)
            console.table(results)
            runPrgm()
        }
    })
}

function addDep() {
    inquirer.prompt([
        {
            name: 'newDep',
            type: 'input',
            message: 'What is the name of the Department to be added?'
        }
    ]).then((answers) => {
        db.query(`INSERT INTO departments (name) 
        VALUES (${answers.newDep})`, function(err, response) {
            if (err) {
                console.log(err)
                return
            }else {
                departments.push(answers.newDep)
                console.log(departments)
                console.log(`Added ${answers.newDep} to Departments database`)
            }
        })
    })
}


