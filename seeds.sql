-- Adds base data in as examples for how the database works
INSERT INTO department (name)
VALUES  
('Sales'),
('Engineering'),
('Finance'),
('Legal');

INSERT INTO role (title, salary, department_id)
VALUES
('Salesperson', 75000, 1),
('Software Engineer', 90000, 2),
('Account Manager', 100000, 3),
('Lawyer', 120000, 4);

INSERT INTO employee(first_name, last_name, role_id, manager_id)
VALUES
('John', 'Smith', 1, NULL),
('Evan', 'Hatley', 2, 2),
('Jessica', 'Teegarden', 4, 3),
('Mac', 'Hatley', 3, NULL);
