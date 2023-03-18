const inquirer = require("inquirer");
const mysql = require("mysql2");
const cTable = require("console.table");

const db = mysql.createConnection(
	{
		host: "localhost",
		user: "root",
		password: "jackbao1",
		database: "work_db",
	},
	console.log(`Connected to the work_db database.`)
);

function promptMenu() {
	inquirer
		.prompt([
			{
				type: "list",
				name: "action",
				choices: [
					"View all departments",
					"View all roles",
					"View all employees",
					"Add a department",
					"Add a role",
					"Add an employee",
					"Update an employee role",
				],
			},
		])
		.then((answer) => {
			switch (answer.action) {
				case "View all departments":
					db.query("SELECT * FROM departments", (err, result) => {
						if (err) {
							console.log(err);
						}
						console.table(result);
						promptMenu();
					});
					break;
				case "View all roles":
					db.query(
						"SELECT roles.id, roles.title, departments.name AS department, roles.salary  FROM roles JOIN departments on roles.department_id = departments.id",
						(err, result) => {
							if (err) {
								console.log(err);
							}
							console.table(result);
							promptMenu();
						}
					);
					break;
				case "View all employees":
					db.query(
						`SELECT employee.id,employee.first_name,employee.last_name,roles.title,departments.name AS department, roles.salary, CONCAT(m.first_name," ", m.last_name) AS manger
            FROM employee 
            JOIN roles ON employee.role_id = roles.id
            JOIN departments on roles.department_id = departments.id
            LEFT JOIN employee m on employee.manager_id = m.id;`,
						(err, result) => {
							if (err) {
								console.log(err);
							}
							console.table(result);
							promptMenu();
						}
					);
					break;
				case "Add a department":
					inquirer
						.prompt([
							{
								name: "department",
								type: "input",
								message: "What is the name of the department you want to add?",
							},
						])
						.then((answer) => {
							db.query(
								"INSERT INTO departments SET ?",
								{
									name: answer.department,
								},
								(err) => {
									if (err) {
										console.log(err);
									}
									console.log("Department Added!");
									promptMenu();
								}
							);
						});
					break;
				case "Add a role":
					db.query("SELECT id, name FROM departments", (err, results) => {
						if (err) {
							console.log(err);
						}
						const departments = results.map((result) => {
							return {
								value: result.id,
								name: result.name,
							};
						});
						// console.table(results);
						inquirer
							.prompt([
								{
									type: "input",
									name: "title",
									message: "What is the role you want to add?",
								},
								{
									type: "input",
									name: "salary",
									message: "What is the salary for this role?",
									validate: function (value) {
										var valid = !isNaN(parseFloat(value));
										return valid || "Please enter a number";
									},
								},
								{
									type: "list",
									name: "department",
									message: "What department does this role belong to?",
									choices: departments,
								},
							])
							.then((answer) => {
								db.query(
									"INSERT INTO roles SET ?",
									{
										title: answer.title,
										salary: answer.salary,
										department_id: answer.department,
									},
									(err) => {
										if (err) {
											console.log(err);
										}
										console.log("Role has been added!");
										promptMenu();
									}
								);
							});
					});
					break;
				case "Add an employee":
					db.query(
						"SELECT employee.id, employee.first_name, employee.last_name, roles.title AS role FROM employee LEFT JOIN roles ON employee.role_id = roles.id",
						function (err, res) {
							if (err) throw err;
							const roles = res.map((role) => ({
								name: role.role,
								value: role.id,
							}));
							const managers = res.map((manager) => ({
								name: `${manager.first_name} ${manager.last_name}`,
								value: manager.id,
							}));
							inquirer
								.prompt([
									{
										type: "input",
										name: "firstName",
										message:
											"What is the first name of the employee you would like to add?",
									},
									{
										type: "input",
										name: "lastName",
										message:
											"What is the last name of the employee you would like to add?",
									},
									{
										type: "list",
										name: "roleID",
										message: "What is the role ID for this employee",
										choices: roles,
									},
									{
										type: "confirm",
										name: "haveMangerID",
										message: "Does this employee have a manager ID?",
									},
									{
										type: "list",
										name: "managerID",
										message: "What is the manager ID?",
										choices: managers,
									},
								])
								.then((answer) => {
									db.query(
										"INSERT INTO employee(first_name, last_name, role_id, manager_id) VALUES (?,?,?,?)",

										[
											answer.firstName,
											answer.lastName,
											answer.roleID,
											answer.managerID,
										],

										(err) => {
											if (err) {
												console.log(err);
											}
											console.log("Employee has been added!");
											promptMenu();
										}
									);
								});
						}
					);
					break;
				case "Update an employee role":
					break;
			}
		})
		.catch((err) => {
			console.log(err);
		});
}

module.exports = promptMenu;
