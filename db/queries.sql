SELECT roles.id,roles.title,departments.name ,roles.salary AS department
FROM roles
 JOIN departments 
ON roles.department_id = departments.id;

SELECT employee.id,employee.first_name,employee.last_name,roles.title,departments.name AS department, roles.salary, CONCAT(m.first_name," ", m.last_name )AS manager
FROM employee 
JOIN roles ON employee.role_id = roles.id
JOIN departments on roles.department_id = departments.id
LEFT JOIN employee m on employee.manager_id = m.id;
       

SELECT employee.id, employee.first_name,employee.last_name, roles.title FROM employee JOIN roles ON employee.id =roles.id;