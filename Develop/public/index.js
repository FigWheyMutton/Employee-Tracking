const inquirer = require('inquirer')
const mysql = require('mysql2')
const employees = []
const roles = []
const departments = []


var db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "1234",
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
    db.query(`SELECT emp.id, emp.first_name, emp.last_name, title, salary, CONCAT(mgr.first_name, ' ', mgr.last_name) AS manager
        FROM employees emp
        LEFT JOIN employees mgr ON mgr.id = emp.manager_id
        LEFT JOIN roles ON emp.role_id = roles.id
        LEFT JOIN departments ON roles.department_id = departments.id;`, function(err, results) {
        if (err) {
            console.log(err)
            return
        }else {
            console.log('This is all of the employees currently in the database')
            console.table(results)
            employees.push(results)
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
            choices: employees
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

    
//     async function updateEmpRole() {
//         let employees = viewEmp();
//         let roles = viewRoles();
//     inquirer.prompt([
//         {
//             name: 'updateEmpName',
//             type: 'list',
//             choices: employees,
//             message: 'Which Employee do you want to update?'
//         },
//         {
//             name: 'updateEmpRole',
//             type: 'list',
//             message: 'What role should be assigned to this employee?',
//             choices: roles,
//         }
//     ]).then((answers) => {
//         db.query(`UPDATE employees SET role_id = '${answers.updateEmpRole}' WHERE id = '${updateEmpName}'`,function(err,response) {
//             if (err) {
//                 console.log(err)
//             }else {
//                 console.log('Employee role updated!')
//             }
//         })
//     })
// }

// function viewRoles() {
//     db.query('SELECT * FROM roles', function(err, results) {
//         if (err) {
//             console.log('error fulfilling')
//             return
//         }else {
//             console.log(`This is all of the roles currently available`)
//             console.table(results)
//             runPrgm()
//         }})
// }

// function loadDepartments() {
//     return db.promise().query('SELECT * FROM departments');
// }

// async function addRole() {
//     const [rows] = await loadDepartments();
//     // const departments = await loadDepartments();

//     // console.log("ugly", departments)
//     console.log("clean", rows)
//     const organizedArr = [];
//     for(i=0; i<rows.length; i++) {
//         const newObj = {
//             name: rows[i].name,
//             value: rows[i].id
//         }
//         organizedArr.push(newObj)
//     }
//     console.log("organized", organizedArr)

//     inquirer.prompt([
//         {
//             name: 'newRoleName',
//             type: 'input',
//             message: 'What is the new role called?',          
//         },
//         {
//             name: 'roleSalary',
//             type: 'input',
//             message: 'What is the salary for this job?',
//         },
//         {
//             name: 'roleDepartment',
//             type: 'list',
//             message: 'What department does this role fall under?',
//             choices: organizedArr
//         }
//     ]).then((answers) => {
//         db.query(`INSERT INTO roles  (title, salary, department_id)
//         VALUES (?,?,?)`, [answers.newRoleName, answers.roleSalary, answers.roleDepartment],function (err, response) {
//             if (err) {
//                 console.log(err)
//                 return
//             }else {
//                 // roles.push(answers)
//                 console.log(`Added new role into roles`)
//                 runPrgm() 
//             }
//         })
//     })
// }

// function viewDep() {
//     db.query('SELECT * FROM departments', function (err,results) {
//         if (err) {
//             console.log(err)
//             return
//         }else {
//             console.log(`This is all of the departments currently available`)
//             console.table(results)
//             runPrgm()
//         }
//     })
// }

// function addDep() {
//     inquirer.prompt([
//         {
//             name: 'newDep',
//             type: 'input',
//             message: 'What is the name of the Department to be added?'
//         }
//     ]).then((answers) => {
//         db.query(`INSERT INTO departments (name) 
//         VALUES (?)`,[answers.newDep] ,function(err, response) {
//             if (err) {
//                 console.log(err)
//                 return
//             }else {
//                 // departments.push(answers.newDep)
//                 // console.log(departments)
//                 console.log(`Addeda new Department to database`)
//                 runPrgm()
//             }
//         })
//     })
// }


runPrgm()