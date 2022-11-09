INSERT INTO departments (name)
VALUES ('Service'),
        ('People'),
        ('Hr');

INSERT INTO roles (title, salary, department_id)
VALUES ('Engineer', 200.00, 1),
        ('Customer Service', 300.00, 2),
        ('Manager', 500.00, 3);

INSERT INTO employees (first_name, last_name, role_id, manager_id)
VALUES ('Alex', 'Hsieh', 1, NULL),
        ('Daniel', 'Hsieh', 2,1),
        ('An', 'Tran', 3,1);