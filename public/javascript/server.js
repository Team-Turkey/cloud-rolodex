// DEPENDENCIES
const mysql = require('mysql2');
const inquirer = require('inquirer');
const cTable = require('console.table');
const Table = require('easy-table');
const {
    toDoQuestion,
    addDeptQuestions,
} = require('./public/lib/index.js');
const chalk = require('chalk');

// create the connection to database
// const connection = mysql.createConnection({
//     host: 'localhost',
//     port: 3306,
//     user: 'root',
//     password: 'class1234',
//     database: 'company_db'
// });

// connection.connect(err => {
//     if (err) throw err;
//     console.log('connected as id ' + connection.threadId + '\n');
//     console.log(chalk.bold.blue('Employee') + ' ' + chalk.bold.red('Manager!'));
//     mainMenu();
// });

function mainMenu() {
    inquirer.prompt(toDoQuestion)
        .then(response => {

            switch (response.todo) {
                case ('View all departments'):
                    viewAllDepts();
                    break;
                case ('View all roles'):
                    viewAllRoles();
                    break;
                case ('View all employees'):
                    viewAllEmployees();
                    break;
                case ('Add a department'):
                    addDept();
                    break;
                case ('Add a role'):
                    addRole();
                    break;
                case ('Add an employee'):
                    addEmployee();
                    break;
                case ('Update an employee role'):
                    updateEmployeeRole();
                    break;
                case ('Delete an employee'):
                    deleteEmployee();
                    break;
                case ('Exit \n'):
                    connection.end();
            }
        })
};

function viewAllDepts() {
    connection.query('SELECT department.id, department.name AS `Department` FROM department', (err, res) => {
        if (err) throw err;
        console.table(res);
        mainMenu();
    });

};

function viewAllRoles() {
    connection.query('SELECT role.id, role.title AS `Job Title`, department.name AS `Department`, role.salary AS `Salary` FROM role INNER JOIN department ON department.id = role.department_id', (err, res) => {
        if (err) throw err;
        console.table(res);
        mainMenu();
    });

};

function viewAllEmployees() {
    connection.query('SELECT employee.id, employee.first_name AS `First Name`, employee.last_name AS `Last Name`, role.title AS `Job Title`, department.name AS Department, role.salary AS Salary, IFNULL(CONCAT(manager.first_name," ", manager.last_name), "N/A ") AS `Manager` FROM employee LEFT JOIN employee manager ON manager.id = employee.manager_id INNER JOIN role ON employee.role_id=role.id INNER JOIN department ON department.id = role.department_id', (err, res) => {
        if (err) throw err;
        console.table(res);
        mainMenu();
    });

};

function addDept() {

    inquirer.prompt(addDeptQuestions)
        .then(answers => {

            connection.query('INSERT INTO department SET ?', {
                    name: answers.name

                },
                (err, res) => {
                    if (err) throw err;
                    console.log(chalk.bold.yellow("Department added!"))
                    mainMenu();
                });
        })
};

function addRole() {
    connection.query('SELECT * FROM department', (err, res) => {
        if (err) throw err;

        var deptArray = [];
        res.forEach(item => {
            var {
                id,
                name
            } = item;
            var item = {
                value: id,
                name
            };
            deptArray.push(item)
            var {
                value,
                name
            } = item;
            var item = {
                id: value,
                name
            };

        })

        inquirer.prompt([{
                    type: 'input',
                    name: 'role',
                    message: 'Enter the role name.',
                    validate: nameInput => {
                        if (nameInput) {
                            return true;
                        } else {
                            console.log("Please enter the role name!");
                            return false;
                        }
                    }
                },
                {
                    type: 'input',
                    name: 'salary',
                    message: 'Enter the salary paid for this role.',
                    validate: nameInput => {
                        if (nameInput) {
                            return true;
                        } else {
                            console.log("Please enter the salary paid for the role you are creating!");
                            return false;
                        }
                    }
                }, {
                    type: 'list',
                    name: 'department',
                    message: 'What department does this role belong to?',
                    choices: deptArray
                }
            ])
            .then(answers => {
                connection.query('INSERT INTO role SET ?', {
                        title: answers.role,
                        salary: answers.salary,
                        department_id: answers.department
                    },

                    (err, res) => {
                        if (err) throw err;
                        console.log(chalk.bold.yellow("Role added!"))
                        mainMenu();
                    })
            })
    })
};

function addEmployee() {
    connection.query('SELECT * FROM role', (err, res) => {
        if (err) throw err;

        var roleArray = [];
        res.forEach(item => {
            var {
                id,
                title,
            } = item;
            var item = {
                value: id,
                name: title,
            };
            roleArray.push(item)
            var {
                value,
                name,
            } = item;
            var item = {
                id: value,
                title: name,
            };
        })
        connection.query('SELECT * FROM manager', (err, res) => {
            if (err) throw err;

            var managerArray = [];
            res.forEach(item => {
                var {
                    id,
                    first_name,
                } = item;
                var item = {
                    value: id,
                    name: first_name,
                };

                managerArray.push(item)
                var {
                    value,
                    name,
                } = item;
                var item = {
                    id: value,
                    first_name: name,
                };
            })
            inquirer.prompt([{
                        type: 'input',
                        name: 'firstName',
                        message: "Enter the employee's first name.",
                        validate: nameInput => {
                            if (nameInput) {
                                return true;
                            } else {
                                console.log("Please enter the employee's first name!");
                                return false;
                            }
                        }
                    },
                    {
                        type: 'input',
                        name: 'lastName',
                        message: "Enter the employee's last name.",
                        validate: nameInput => {
                            if (nameInput) {
                                return true;
                            } else {
                                console.log("Please enter the employee's last name!");
                                return false;
                            }
                        }
                    },
                    {
                        type: 'list',
                        name: 'role',
                        message: "Enter the employee's role.",
                        choices: roleArray
                    },
                    {
                        type: 'list',
                        name: 'manager',
                        message: "Who is the employee's manager?",
                        choices: managerArray
                    }
                ])
                .then(answers => {

                    connection.query('INSERT INTO employee SET ?', {
                            first_name: answers.firstName,
                            last_name: answers.lastName,
                            role_id: answers.role,
                            manager_id: answers.manager
                        },

                        (err, res) => {
                            if (err) throw err;
                            console.log(chalk.bold.green("Employee added!"))
                            
                            mainMenu();
                        })
                        
                })
        });
    })
}

function updateEmployeeRole() {
    connection.query('SELECT * FROM role', (err, res) => {
        if (err) throw err;

        var roleArray = [];
        res.forEach(item => {
            var {
                id,
                title,
            } = item;
            var item = {
                value: id,
                name: title,
            };
            roleArray.push(item)
            var {
                value,
                name,
            } = item;
            var item = {
                id: value,
                title: name,
            };
        })
        connection.query('SELECT * FROM employee', (err, res) => {
            if (err) throw err;
            var t = new Table;
            res.forEach(employee => {
                t.cell('Employee ID', employee.id)
                t.cell('Name', employee.first_name + " " + employee.last_name)
                t.newRow()
            })
            console.log(t.toString())

            inquirer.prompt([{
                        type: 'input',
                        name: 'employeeId',
                        message: 'Enter ID number of employee to update:'
                    },
                    {
                        type: 'list',
                        name: 'role',
                        message: 'Choose new employee role.',
                        choices: roleArray
                    }
                ])
                .then(answers => {

                    connection.query('UPDATE employee SET role_id = ? WHERE id = ?',
                        [answers.role, answers.employeeId],

                        (err, res) => {
                            if (err) throw err;
                            console.log(chalk.bold.blue("Employee updated!"))
                            mainMenu();
                        }
                    )
                })
        })
    });
}

function deleteEmployee() {
    connection.query('SELECT * FROM employee', (err, res) => {
        if (err) throw err;
        var t = new Table;
        res.forEach(employee => {
            t.cell('Employee ID', employee.id)
            t.cell('Name', employee.first_name + " " + employee.last_name)
            t.newRow()
        })
        console.log(t.toString())

        inquirer.prompt([{
                    type: 'input',
                    name: 'employeeId',
                    message: 'Enter ID number of employee to delete:'
                },
            ])
            .then(answers => {

                connection.query('DELETE FROM employee WHERE id = ?',
                    [answers.employeeId],

                    (err, res) => {
                        if (err) throw err;
                        console.log(chalk.bold.red("Employee deleted!"))
                        mainMenu();
                    }
                )
            })
    })
};
