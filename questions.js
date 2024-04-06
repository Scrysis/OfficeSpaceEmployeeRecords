const inquirer = require("inquirer");

/* https://stackoverflow.com/questions/74075310/how-to-properly-nest-inquirer-prompts */

inquirer.registerPrompt("search-list", require("inquirer-search-list"));

module.exports = () => {
  return {
    menuQuestion: () => {
      const viewDep = "View all departments";
      const viewRol = "View all roles";
      const viewEmp = "View all employees";
      const addDep = "Add a department";
      const addRole = "Add a role"
      const addEmp = "Add an employee";
      const upEmp = "Update an employee";
      
      
      const question = [
        {
          name: "menuSelect",
          type: "list",
          message: "Please select a menu option:",
          choices: [viewDep, viewRol, viewEmp, addDep, addRole, addEmp, upEmp],
        },
      ];
      return inquirer.prompt(question);
    },
    addDepartmentQuestion: () => {
        const question = [
            {
                name: "departmentName",
                type: "input",
                message: "Please enter the name of the department you wish to add:",
            },
        ];
        return inquirer.prompt(question);
    },
    addEmployeeQuestion: () => {
        const question = [
            {
                name: "employeeFirstName",
                type: "input",
                message: "Please enter the first name of the Employee you wish to add:",
            },
            {
                name: "employeeLastName",
                type: "input",
                message: "Please enter the last name of the Employee you wish to add:",
            },
            {
                name: "roleId",
                type: "input",
                message: "Please enter the ID number for the employee's role:",
            },
            {
                name: "managerID",
                type: "input",
                message: "Please enter the ID number for the employee's manager:",
            },
        ];
        return inquirer.prompt(question);
    },
    addRoleQuestion: () => {
        const question = [
            {
                name: "roleTitle",
                type: "input",
                message: "Please enter the title of the role you are adding:",
            },
            {
                name: "roleSalary",
                type: "input",
                message: "Please enter the salary for this role:",
            },
            {
                name: "departmentID",
                type: "input",
                message: "Please enter the department ID for this role:",
            },
        ];
        return inquirer.prompt(question);
    },
    updateEmployeeQuestion: () => {
        const question = [
            {
                name: "employeeID",
                type: "input",
                message: "Please enter in the ID of the employee to modify:",
            },
            {
                name: "employeeFirstName",
                type: "input",
                message: "Please enter in the new first name of the employee:",
            },
            {
                name: "employeeLastName",
                type: "input",
                message: "Please enter in the new last name of the employee:",
            },
            {
                name: "roleID",
                type: "input",
                message: "Please enter in the new role ID for the employee:",
            },
            {
                name: "managerID",
                type: "input",
                message: "Please enter in the new manager ID for the employee:",
            },
        ];
        return inquirer.prompt(question);
    },
  };
};
