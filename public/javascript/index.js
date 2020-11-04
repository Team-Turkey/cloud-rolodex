const toDoQuestion = [{
    type: 'list',
    name: 'todo',
    message: 'What would you like to do?',
    choices: ['View all departments', 'View all roles', 'View all employees', 'Add a department', 'Add a role', 'Add an employee', 'Update an employee role', 'Delete an employee', 'Exit \n']
}];

const addDeptQuestions = [{
    type: 'input',
    name: 'name',
    message: 'Enter the name of the department.',
    validate: nameInput => {
        if (nameInput) {
            return true;
        } else {
            console.log("Please enter the department name!");
            return false;
        }
    }
}];

module.exports = {
    toDoQuestion,
    addDeptQuestions
};

