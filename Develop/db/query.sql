SELECT department.id, role.id
FROM role
JOIN department ON role.department_id = department.id;

SELECT employee.role_id, role.id
FROM employee
JOIN role ON employee.role_id = role.id