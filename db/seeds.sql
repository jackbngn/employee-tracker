INSERT INTO departments(name)
VALUES ("Engineering"),
        ("Fiance"),
        ("Sales"),
        ("Legal");

INSERT INTO roles(title, salary, department_id)
VALUES ("Lead Engineer", 150000, 1),
       ("Software Engineer", 120000,1),
       ("Account Manager", 160000,2),
       ("Accountant", 125000,2),
        ("Sales Lead", 100000, 3),
       ("Salesperson",80000,3),
       ("Legal Team Lead", 250000,4),
       ("Lawyer", 190000,4);

INSERT INTO employee(first_name,last_name,role_id,manager_id)
VALUES ("John", "Doe", 1, NULL),
       ("Jack", "Nguyen", 2, 1),
       ("Stephen", "Curry", 3, NULL),
       ("Lebron", "James", 4, 3),
       ("Briana", "Chan", 5, NULL),
       ("Nathan", "Chueng", 6, 5),
       ("Kobe", "Bryant", 7, NULL),
       ("Michael", "Jordan", 8, 7);