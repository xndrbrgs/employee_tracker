-- This seed separates the departments 

INSERT INTO department (name)
VALUES ("Sales"),
("HR"),
("IT"),
("Finances");

-- This seed separates the roles within the company 

INSERT INTO roles (title, salary, department_id)
VALUES ("Store Manager", 80000, 1),
("Assistant Manager", 65000, 1),
("Cashier", 42000, 1),
("HR Director", 90000, 2),
("Staffing Coordinator", 50000, 2),
("Hardware Technician", 70000, 3),
("IT Director", 95000, 3),
("IT Director", 95000, 3),
("Financial Advisor", 100000, 4),
("Accountant", 110000, 4);

-- This seed separates the employees within the company 

INSERT INTO employees (first_name, last_name, roles_id, manager_id)
VALUES ("John", "Sales", 1, null),
("Pedro", "Santos", 2, null),
("Martin", "Consuela", 3, null),
("Sally", "Shaffer", 2, null),
("Margot", "Anderson", 7, 6),
("Justin", "Thomas", 9, 5),
("Rory", "McIlroy", 5, 8),
("Tiger", "Woods", 10, 7),
("Dustin", "Johnson", 4, 9),
("Lee", "Trevino", 6, 10);