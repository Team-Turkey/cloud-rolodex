INSERT INTO department
(name)
VALUES
('Sales'),
('Engineering'),
('Finance'),
('Legal');

INSERT INTO role
(title, department_id)
VALUES
('Sales Lead', 1),
('Lead Engineer', 2),
('Lead Accountant', 3),
('Legal Team Lead', 4),
('Salesperson', 1),
('Software Engineer', 2),
('Accountant', 3),
('Lawyer', 4);

INSERT INTO user
(username,  role_id, first_name, last_name, phone, email, password)
VALUES
('jeebs', 1, 'Jeff', 'Johnston', '555-555-5555', 'jeff@jeff.com', 'password'),
('meemore', 2, 'Mandy', 'Moore', '555-123-4567', 'mandy@mandy.com', 'password'),
('007', 3, 'James', 'Bond', '555-007-0007', "bond@jb.com", 'password'),
('Dames', 4, 'Matt', 'Damon', '555-627-5309', 'matt@damon.com', 'password');

