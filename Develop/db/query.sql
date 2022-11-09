SELECT departments.id, roles.id
FROM roles
JOIN departments ON roles.department_id = departments.id;

SELECT employees.role_id, roles.id
FROM employees
JOIN roles ON employees.role_id = roles.id