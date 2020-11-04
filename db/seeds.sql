INSERT INTO department
(name)
VALUES
('Sales'),
('Engineering'),
('Finance'),
('Legal');

INSERT INTO role
(title, salary, department_id)
VALUES
('Sales Lead', 100000, 1),
('Lead Engineer', 150000, 2),
('Lead Accountant', 175000, 3),
('Legal Team Lead', 250000, 4),
('Salesperson', 80000, 1),
('Software Engineer', 120000, 2),
('Accountant', 125000, 3),
('Lawyer', 190000, 4);

INSERT INTO employee
(first_name, last_name, role_id, manager_id)
VALUES
('Jeff', 'Johnston', 1, null),
('Mandy', 'Moore', 2, null),
('James', 'Bond', 3, null),
('Matt', 'Damon', 4, null);

INSERT INTO manager
(first_name, last_name, role_id, department_id)
VALUES
('Jeff', 'Johnston', 1, 1),
('Mandy', 'Moore', 2, 2),
('James', 'Bond', 3, 3),
('Matt', 'Damon', 4, 4);