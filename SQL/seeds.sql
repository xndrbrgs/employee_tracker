USE employees_db

-- This seed separates the departments 

INSERT INTO department (id, name)
VALUES (1, "Sales"),
       (2, "HR"),
       (3, "IT"),
       (4, "Finances");

-- This seed separates the roles within the company 

INSERT INTO role (id, title, salary, department_id)
VALUES (1, "Store Manager", 80000, 1),
       (2, "Assistant Manager", 65000, 1),
       (3, "Cashier", 42000, 1),
       (4, "HR Director", 90000, 2),
       (5, "Staffing Coordinator", 50000, 2),
       (6, "Hardware Technician", 70000, 3),
       (7, "IT Director", 95000, 3),
       (8, "IT Director", 95000, 3),
       (9, "Financial Advisor", 100000, 4),
       (10, "Accountant", 110000, 4);

-- This seed separates the employees within the company 

INSERT INTO employees (id, first_name, last_name, role_id, manager_id)
VALUES (1, "John", "Sales", 1, null),
       (2, "Pedro", "Santos", 2, null),
       (3, "Martin", "Consuela", 3, null),
       (4, "Sally", "Shaffer", 2, null),
       (5, "Margot", "Anderson", 7, 6),
       (6, "Justin", "Thomas", 9, 5),
       (7, "Rory", "McIlroy", 5, 8),
       (8, "Tiger", "Woods", 10, 7),
       (9, "Dustin", "Johnson", 4, 9),
       (10, "Lee", "Trevino", 6, 10),