INSERT INTO department (name)
VALUES ("Billing"),
        ("Human Resources"),
        ("Legal"),
        ("Research"),
        ("Marketing");

INSERT INTO role (title, salary, department_id)
VALUES ("Bootlicker", 100000.00, 2),
        ("Cowboy", 250000.00, 3),
        ("Depressed", 30000.00, 1),
        ("Bored", 80000.00, 4),
        ("Caffenated", 50000.00, 5);

INSERT INTO employees (first_name, last_name, role_id, manager_id)
VALUES ("Vash", "Moru", 4, 3),
        ("Ginny", "Oua", 4, 3),
        ("Ain", "Kirash", 4, 3),
        ("Sleep", "Now", 4, 3),
        ("Ree", "Ack", 2, 7),
        ("Heart", "Sua", 2, 7),
        ("Kando", "Sin", 2, 7),
        ("Beth", "Rella", 3, 8),
        ("Jare", "Flin", 3, 8),
        ("Mac", "Suave", 1, 10),
        ("Kelly", "Cira", 1, 10),
        ("Buubs", "McGee", 1, 10),
        ("Mii", "Slep", 5, 13),
        ("Gresh", "Sunn", 5, 13);