// Variable Definitions & Dependencies
const inquirer = require('inquirer');
const db = require('./db/connection');

// Start server after DB connection
db.connect(err => {
    if (err) throw err;
    console.log('Database connected.');
    employee_tracker();
});

var employee_tracker = function () {
    inquirer.prompt([{
        // Begin Command Line
        type: 'list',
        name: 'prompt',
        message: 'What would you like to do?',
        choices: ['View All Department', 'View All Roles', 'View All Employees', 'Add A Department', 'Add A Role', 'Add An Employee', 'Update An Employee Role', 'Log Out']
    }]).then((answers) => {
        // Views the Department Table in the Database
        if (answers.prompt === 'View All Department') {
            db.query(`SELECT * FROM department`, (err, result) => {
                if (err) throw err;
                console.log("Viewing All Departments: ");
                console.table(result);
                employee_tracker();
            });
        } else if (answers.prompt === 'View All Roles') {
            db.query(`SELECT * FROM role`, (err, result) => {
                if (err) throw err;
                console.log("Viewing All Roles: ");
                console.table(result);
                employee_tracker();
            });
        } else if (answers.prompt === 'View All Employees') {
            db.query(`SELECT * FROM employee`, (err, result) => {
                if (err) throw err;
                console.log("Viewing All Employees: ");
                console.table(result);
                employee_tracker();
            });
        } else if (answers.prompt === 'Add A Department') {
            inquirer.prompt([{
                // Adding a Department
                type: 'input',
                name: 'department',
                message: 'What is the name of the dpeartment?',
                validate: departmentInput => {
                    if (departmentInput) {
                        return true;
                    } else {
                        console.log('Please Add A Department!');
                        return false;
                    }
                }
            }]).then((answers) => {
                db.query(`INSERT INTO department (name) VALUES (?)`, [answers.department], (err, result) => {
                    if (err) throw err;
                    console.log(`Added ${answers.department} to the database.`)
                    employee_tracker();
                });
            })
        } else if (answers.prompt === 'Add A Role') {
            inquirer.prompt([
                {
                    // Adding A Role
                    type: 'input',
                    name: 'role',
                    message: 'What is the name of the role?',
                    validate: roleInput => {
                        if (roleInput) {
                            return true;
                        } else {
                            console.log('Please Add A Role!');
                            return false;
                        }
                    }
                },
                {
                    // Adding the Salary
                    type: 'input',
                    name: 'salary',
                    message: 'What is the salary of the role?',
                    validate: salaryInput => {
                        if (salaryInput) {
                            return true;
                        } else {
                            console.log('Please Add A Salary!');
                            return false;
                        }
                    }
                },
                {
                    // Department
                    type: 'input',
                    name: 'department',
                    message: 'Which department does the role belong to?',
                    validate: departmentInput => {
                        if (departmentInput) {
                            return true;
                        } else {
                            console.log('Please Add The Department!');
                            return false;
                        }
                    }
                }
            ]).then((answers) => {
                db.query(`INSERT INTO role (title, salary, department) VALUES (?, ?, ?)`, [answers.role, answers.salary, answers.department], (err, result) => {
                    if (err) throw err;
                    console.log(`Added ${answers.role} to the database.`)
                    employee_tracker();
                });
            })
        } else if (answers.prompt === 'Add An Employee') {
            inquirer.prompt([
                {
                    // Adding Employee First Name
                    type: 'input',
                    name: 'firstName',
                    message: 'What is the employees first name?',
                    validate: firstNameInput => {
                        if (firstNameInput) {
                            return true;
                        } else {
                            console.log('Please Add A First Name!');
                            return false;
                        }
                    }
                },
                {
                    // Adding Employee Last Name
                    type: 'input',
                    name: 'lastName',
                    message: 'What is the employees last name?',
                    validate: lastNameInput => {
                        if (lastNameInput) {
                            return true;
                        } else {
                            console.log('Please Add A Salary!');
                            return false;
                        }
                    }
                },
                {
                    // Adding Employee Role
                    type: 'input',
                    name: 'role',
                    message: 'What is the employees role?',
                    validate: roleInput => {
                        if (roleInput) {
                            return true;
                        } else {
                            console.log('Please Add The Department!');
                            return false;
                        }
                    }
                },
                {
                    // Adding Employee Manager
                    type: 'input',
                    name: 'manager',
                    message: 'Who is the employees manager?',
                    validate: managerInput => {
                        if (managerInput) {
                            return true;
                        } else {
                            console.log('Please Add A Manager!');
                            return false;
                        }
                    }
                }
            ]).then((answers) => {
                db.query(`INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES (?, ?, ?, ?)`, [answers.firstName, answers.lastName, answers.role, answers.manager], (err, result) => {
                    if (err) throw err;
                    console.log(`Added ${answers.role} to the database.`)
                    employee_tracker();
                });
            })
        } else if (answers.prompt === 'Update An Employee Role') {
            inquirer.prompt([
                {
                    // Choose an Employee to Update
                    type: 'input',
                    name: 'employee',
                    message: 'Which employees role do you want to update?',
                    validate: employeeInput => {
                        if (employeeInput) {
                            return true;
                        } else {
                            console.log('Please Add A Department!');
                            return false;
                        }
                    }
                },
                {
                    // Updating the New Role
                    type: 'input',
                    name: 'role',
                    message: 'What is their new role?',
                    validate: roleInput => {
                        if (roleInput) {
                            return true;
                        } else {
                            console.log('Please Add A Role!');
                            return false;
                        }
                    }
                }
            ]).then((answers) => {
                db.query(`UPDATE employee SET role_id = ? WHERE last_name = ?`, [answers.role, answers.lastName], (err, result) => {
                    if (err) throw err;
                    console.log(`Updated ${answers.lastName} role to the database.`)
                    employee_tracker();
                });
            })
        } else if (answers.prompt === 'Log Out') {
            db.end();
            console.log("Good-Bye!");
        }
    })
};